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
const getUpdatedEmployee = async ()=>{
  var getEmployeeInfoQuery=`SELECT E1.id, E1.first_name, E1.last_name, role.title AS role, role.salary, department.name AS department, CONCAT(E2.first_name," ",E2.last_name) AS manager
  FROM (((employee E1 INNER JOIN role ON E1.role_id=role.id)
  INNER JOIN department ON department.id=role.department_id))
  LEFT JOIN employee E2 ON E1.manager_id = E2.id;
  `;
  db.query(getEmployeeInfoQuery, (err, result) => {
    if (err) {console.log(err);}
    var employees=result;
    // console.log(employees);
    var role_list=employees.map(e=>e.role);
    var department_list=employees.map(e=>e.department);
    var employee_list=employees.map(e=>e.first_name+e.last_name);
    var manager_list=employees.filter(e=>(e.manager===null)?false : true);

    var result={
               department_list : department_list,
               role_list : role_list,
               employee_list : employee_list,
               manager_list : manager_list
              };
              console.log(result);
    return result;
  });
}

var getEmployeeInfoQuery=`SELECT E1.id, E1.first_name, E1.last_name, role.title AS role, role.salary, department.name AS department, CONCAT(E2.first_name," ",E2.last_name) AS manager
  FROM (((employee E1 INNER JOIN role ON E1.role_id=role.id)
  INNER JOIN department ON department.id=role.department_id))
  LEFT JOIN employee E2 ON E1.manager_id = E2.id;
  `;
db.query(getEmployeeInfoQuery, (err, result) => {
  if (err) {console.log(err);}
  var employees=result;
  // console.log(employees);
  var role_list=employees.map(e=>e.role);
  var department_list=employees.map(e=>e.department);
  var employee_list=employees.map(e=>e.first_name+" "+e.last_name);
  var manager_list=employees.map(e=>e.manager).filter(e=>(e===null)?false : true);
  var info={
            department_list : department_list,
            role_list : role_list,
            employee_list : employee_list,
            manager_list : manager_list
            };
      console.log(info.department_list,info.role_list,info.employee_list,info.manager_list);
  
});


// This function handles the action chosen by the user in the main loop
const performAction = async (data,toDo) => {

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
        db.query(`INSERT INTO role(title,salary,manager_id) VALUES (${response.role_title},${response.role_salary},${response.department_id};`,(err,result)=>{
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
    var employees=await getUpdatedEmployee();
    // console.log(employees);
    //// Get their choice by awaiting a prompt
    response =await inquirer.prompt(promptQuestion(info,toDo)); 
    //Make query depending on user's choice
    await performAction(employees,toDo);
    //delay next question so that you can see the result, Async issue
    await timer(3000);
    ///Seperate next question
    console.log("                          ");
    console.log("                          ");
    console.log("                          ");
 
  }
  console.log("finish loop");
}

//init();

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



    
  