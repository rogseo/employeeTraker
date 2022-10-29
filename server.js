const mysql=require("mysql2");
const express=require("express");
const inquirer=require("inquirer");
const promptQuestion=require("./index");
const { response } = require("express");

const PORT= process.env.PORT || 3001;
const app=express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Connect to database
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'organization_db'
    },
    console.log("connected to the organization_db database")
);
//Show existing data
var employees=[];
db.query(`SELECT E1.id, E1.first_name, E1.last_name, role.title, role.salary, department.name, CONCAT(E2.first_name," ",E2.last_name) AS manager
FROM (((employee E1 INNER JOIN role ON E1.role_id=role.id)
INNER JOIN department ON department.id=role.department_id))
LEFT JOIN employee E2 ON E1.manager_id = E2.id;
`, (err, result) => {
    if (err) {
      console.log(err);
    }
    // console.table(result);
    employees=result;
    // console.table(employees)
});





// This function handles the action chosen by the user in the main loop
const performAction = async (data,toDo) => {
  console.log("performAction");
  switch (toDo) {
      case "View All Department":
        db.query(`SELECT *FROM department;`,(err,result)=>{
          console.table(result);
        });
        break;
      case "View All Role":
        db.query(`SELECT *FROM role;`,(err,result)=>{
          console.table(result);
        });
        break;
      case "View All Employees":
        db.query(`SELECT *FROM employees;`,(err,result)=>{
          console.table(result);
        });
        break;
      case "Add Department":
        db.query(`INSERT INTO department(name) VALUES ${response.department_name};`,(err,result)=>{
        console.log('successfully added');
        });
        break;

      case "Add Role":
        db.query(`INSERT INTO role(title,salary,manager_id) VALUES (${response.role_title},${response.role_salary,response.department_id};`,(err,result)=>{
        console.log('successfully added');
        });
        break;
      default:
          break;
  }
}

// Main logic flow
const init = async () => {
  let toDo;
  const timer = ms => new Promise(res => setTimeout(res, ms))  //timer to delay each question so that you can see result

  // While the user has not chosen to exit...
  while (toDo != "Quit") {
    console.log("while loop");
    var response=await inquirer.prompt(
        {
          type: 'list',
          message: `What would you like to do?`,
          name: 'toDo',
          choices:['View All Department','View All Role','View All Employees','View Total Utilized Budget By Department','Add Department','Remove Department','Add Role',`Add Employee`,`Update Employee Role`, `Quit`],
        }
    );
    toDo=response.toDo;
    console.log(toDo);

    response =await inquirer.prompt(promptQuestion(employees,toDo)); // Get their choice by awaiting a prompt

    await performAction(employees,toDo);

    await timer(3000);//delay next question so that you can see the result
      ///perforAction function async issue
    console.log("                          ");
    console.log("                          ");
    console.log("                          ");
 
  }
  console.log("finish loop");
}

init();

// inquirer.prompt(promptQuestion(employees,toDo))
// .then((data)=>{console.log(data);
//   toDo=data.toDo;
  
//   while(toDo!="Quit"){
//     console.log("while loop");

//     inquirer.prompt(promptQuestion(employees,toDo))
//     .then((result)=>{
//       console.log(result);
//       employees=result;
//       toDo="Quit";
//     })

//     // switch(result.toDo){
//     //   case "View All Department":
//     //     db.query(`SELECT *FROM department;`,(err,result)=>{
//     //       console.table(result);});
//     //     break;
//     // }
//     // })

//   }
  
// })







// //Inquirer question
// async function init(){
//   // var toDo="";


//   // while(!(toDo==='Quit')){
//     var responses = await inquirer.prompt(promptQuestion(employees));
//     console.log(`responses:${responses}`);
  
//     // switch(responses.toDo){
//     //   case "View All Department":
//     //     db.query(`SELECT *FROM department;`,(err,result)=>{
//     //       if(err){console.log(err);}
//     //       console.table(result);})
//     // }
      
  
//   //}

// }



    
  