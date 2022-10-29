const mysql=require("mysql2");
const express=require("express");
const inquirer=require("inquirer");
const promptQuestion=require("./index");

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
  let queryResult;
  console.log("performAction");
  switch (toDo) {
      case "View All Department":
        db.query(`SELECT *FROM department;`,(err,result)=>{
          queryResult= result;
        });
        break;
      // case "Add an Employee":
      //     let employeeData = await prompt(employeeQuestions); // Grab the employee data by awaiting prompt
      //     console.log(employeeData); // Console out the data
      //     break;
      default:
          break;
  }
}

// Main logic flow
const init = async () => {
  let toDo;

  // While the user has not chosen to exit...
  while (toDo != "Quit") {
    console.log("while loop");
    toDo = (await inquirer.prompt(promptQuestion(employees,toDo))).toDo; // Get their choice by awaiting a prompt
    console.log(toDo);
    console.log(await performAction(employees,toDo));
      ///perforAction function async issue
 
    
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



    
  