const mysql=require("mysql2");
const inquirer=require("inquirer");
const promptQuestion=require("./index");
const util = require('util');
//to show db table in console.
const ctable=require('console.table');


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
//to solve async issue
const query = util.promisify(db.query).bind(db);
//After db connected, do PromptEmployee().
db.connect(()=>{
  promptEmployee();
})
//Show existing data
const getUpdatedEmployee = async ()=>{
  var getEmployeeInfoQuery=`SELECT E1.id, E1.first_name, E1.last_name, role.title AS role, role.salary, department.name AS department, CONCAT(E2.first_name," ",E2.last_name) AS manager
  FROM (((employee E1 INNER JOIN role ON E1.role_id=role.id)
  INNER JOIN department ON department.id=role.department_id))
  LEFT JOIN employee E2 ON E1.manager_id = E2.id;
  `;
  const data=await query(getEmployeeInfoQuery)
    // if (data) {console.log(data);}
    var employees=data;
    // console.log(employees);
    var role_list=employees.map(e=>e.role);
    var department_list=employees.map(e=>e.department);
    var employee_list=employees.map(e=>e.first_name+e.last_name);
    var manager_list=employees.filter(e=>(e.manager===null)?false : true);

    var result={
               department_list : department_list,
               role_list : role_list,
               employee_list : employee_list,
               manager_list : manager_list,        
              };
  return result;
}



// This function handles the action chosen by the user in the main loop
const performAction = async (data,response) => {
  let result; //Save query result
  switch (response.toDo) {
      case "View All Department":
        result=await query(`SELECT *FROM department;`);
        console.table(result);
        promptEmployee();
        break;
      case "View All Role":
        result=await query(`SELECT *FROM role;`);
        console.table(result);
        promptEmployee();
        break;
      case "View All Employees":
        result=await query(`SELECT *FROM employee;`);
        console.table(result);
        promptEmployee();
        break;
      case "Add Department":
        result=await query(`INSERT INTO department(name) VALUES ("${response.department_name}");`);
        console.log('successfully added');
        promptEmployee();
        break;
      case "Add Role":
        result=await query(`INSERT INTO role(title,salary,manager_id) VALUES ("${response.role_name}",${response.role_salary},"${response.role_department}");`);
        console.log('successfully added');
        promptEmployee();
        break;
      case "Quit":
        console.log("finish");
        process.exit(0);   
      default:
          break;

      
  }
}

// Main logic flow
const promptEmployee = async () => {
  let toDo;
  //get updated information from DB
  var info=await getUpdatedEmployee();
  // Get their choice by awaiting a prompt
  response =await inquirer.prompt(promptQuestion(info,toDo)); 
  console.log(response);
  //Make query depending on user's choice
  await performAction(info,response);
}

