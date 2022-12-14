const mysql=require("mysql2");
const inquirer=require("inquirer");
const promptQuestion=require("./index");
const util = require('util.promisify');
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
const query = util(db.query).bind(db);
//After db connected, do PromptEmployee().
db.connect(()=>{
  promptEmployee();
})
//Show existing data
const getUpdatedEmployee = async ()=>{

  const role=await query("SELECT id, title,department_id FROM role;");
  const department=await query("SELECT *FROM department;");
  const employee=await query(`SELECT E1.id AS id, CONCAT(E1.first_name," ", E1.last_name) AS name, role.title AS role, role.salary, department.name AS department, CONCAT(E2.first_name," ",E2.last_name) AS manager
  FROM (((employee E1 INNER JOIN role ON E1.role_id=role.id)
  INNER JOIN department ON department.id=role.department_id))
  LEFT JOIN employee E2 ON E1.manager_id = E2.id;
  `);

   
  var role_list=role.map(e=>e.title);
  var department_list=department.map(e=>e.name);
  var employee_list=employee.map(e=>e.name);
  var manager_list=employee.filter(e=>(e.manager===null)?false : true);

  var result={
              department : {
                info:department,
                name_list:department_list},
              role : {
                name_list : role_list,
                info: role },
              employee_list : employee_list,
              employee:employee,
              manager : {
                info : manager_list,
                name_list : manager_list.map(e=>e.manager)}     
            }

  return result;
}



// This function handles the action chosen by the user in the main loop
const performAction = async (info,response) => {
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
        result=await query(`SELECT E1.id, E1.first_name, E1.last_name, role.title AS role, role.salary, department.name AS department, CONCAT(E2.first_name," ",E2.last_name) AS manager
        FROM (((employee E1 INNER JOIN role ON E1.role_id=role.id)
        INNER JOIN department ON department.id=role.department_id))
        LEFT JOIN employee E2 ON E1.manager_id = E2.id;
        `);
        console.table(result);
        promptEmployee();
        break;
      case "Add Department":
        result=await query(`INSERT INTO department(name) VALUES ("${response.department_name}");`);
        console.log('successfully added');
        promptEmployee();
        break;
      case "Add Role":
        var department_id=info.department.info.filter(e=>e.name==response.role_department).map(e=>e.id);
        result=await query(`INSERT INTO role(title,salary,department_id) VALUES ("${response.role_name}",${response.role_salary},${department_id[0]});`);
        console.log('successfully added');
        promptEmployee();
        break;
      case `Remove Role`:
        result=await query(`DELETE FROM role WHERE title="${response.remove_role}";`);
        console.log('successfully added');
        promptEmployee();
        break;
      case 'View Total Utilized Budget By Department':
        result=await query(`SELECT department.name,SUM(role.salary) AS totalbudget
        FROM ((((employee E1 INNER JOIN role ON E1.role_id=role.id)
        INNER JOIN department ON department.id=role.department_id))
        LEFT JOIN employee E2 ON E1.manager_id = E2.id)
        GROUP BY department.id;`);
        console.table(result);
        promptEmployee();
        break;
      case 'Remove Department':
        result=await query(`DELETE FROM department where name="${response.remove_department}";`);
        console.log('successfully deleted');
        promptEmployee();
        break;
      case 'Add Employee':
        var role_id=info.role.info.filter(e=>e.title===response.employee_role).map(e=>e.id)
        var manager_id=await query(`SELECT id FROM employee WHERE first_name="${response.employee_manager.split(" ")[0]}";`);
        result=await query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${response.first_name}","${response.last_name}",${role_id[0]},${manager_id[0].id});`);
        console.log('successfully added');
        promptEmployee();
        break;
      case 'Remove Employee':
        result=await query(`DELETE FROM employee WHERE first_name="${response.remove_employee.split(" ")[0]}";`);
        console.log('successfully deleted');
        promptEmployee();
        break;
      case `Update Employee Role`:
        var id=await query(`SELECT id FROM employee where first_name="${response.update_employee_name.split(" ")[0]}";`)
        var role_id=await query(`SELECT id FROM role where title="${response.update_employee_role}";`)
        result=await query(`UPDATE employee SET role_id=${role_id[0].id} where id=${id[0].id};`);

        console.log('successfully added');
        promptEmployee();
        break;
      case "Quit":
        console.log("Good Bye");
        process.exit(0);   
      default:
          break;

  }
}

// Main logic flow
const promptEmployee = async () => {
  //get updated information from DB
  var info=await getUpdatedEmployee();
  // Get their choice by awaiting a prompt
  response =await inquirer.prompt(promptQuestion(info)); 
  //Make query depending on user's choice
  await performAction(info,response);
}

