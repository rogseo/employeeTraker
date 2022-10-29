const inquirer=require('inquirer');
// const Intern=require("./lib/Intern");
// const Manager=require("./lib/Manager");
// const Engineer=require("./lib/Engineer");



const promptQuestion = (employees, toDo)=>{
    return [
      ///ADD department question
      {
        type: 'input',
        message: `What is name of the department?`,
        name: 'department_name',
        when() {
            return toDo === 'Add Department'
        }
      },
      //question for add role
      {
        type: 'input',
        message: `What is the name of the role?`,
        name: 'role_name',
        when() {
            return toDo === 'Add Role'
        }
      },
      {
        type: 'input',
        message: `What is the salary of the role?`,
        name: 'role_salary',
        when() {
            return toDo === 'Add Role'
        }
      },
      {
        type: 'input',
        message: `What department does the role belong to?`,
        name: 'role_department',
        when() {
            return toDo === 'Add Role'
        }
      },
      //question for add employee
      {
        type: 'input',
        message: `What is your employee's first name`,
        name: 'first_name',
        when() {
            return toDo==='Add Employee'
        }
      },
      {
        type: 'input',
        message: `What is your employee's last name`,
        name: 'last_name',
        when() {
            return toDo==='Add Employee'
        }
      },
      {
        type: 'list',
        message: `What is the employee's role`,
        name: 'employee_role',
        choice: employees.role,
        when() {
            return toDo==='Add Employee'
        }
      },
      {
        type: 'list',
        message: `What is the employee's manager`,
        name: 'employee_manager',
        choice : employees.manager,
        when() {
            return toDo === 'Add Employee'
        }
      },
      {
        type: 'list',
        message: `What would you like to do?`,
        name: 'toDo',
        choices:['View All Department','View All Role','View All Employees','View Total Utilized Budget By Department','Add Department','Remove Department','Add Role',`Add Employee`,`Update Employee Role`, `Quit`],
      }]

}


// async function init(employees) {

//   var responses = await inquirer.prompt(promptQuestion(employees));
// }



// const employee=[]; // array of employee
// async function init() {  
//     // Prompt Inquirer questions
//     var responses = await inquirer.prompt(promptQuestion('manager'));
//     //responses.name.charAt(0).toUpperCase() + responses.name.slice(1) -> to make first letter uppercase
//     employee.push(new Manager(responses.name.charAt(0).toUpperCase() + responses.name.slice(1),responses.id,responses.email,responses.officeNum));
  
//     //Keep asking questions until user choose 'I don't want to add anymore'
//     while(responses.type!==`I don't want to add anymore`){
//         if(responses.type==='Engineer'){
//             responses =await inquirer.prompt(promptQuestion('engineer'));
//             employee.push(new Engineer(responses.name.charAt(0).toUpperCase() + responses.name.slice(1),responses.id,responses.email,responses.github));
//         }
//         else{//if Intern
//             responses =await inquirer.prompt(promptQuestion('intern'));
//             employee.push(new Intern(responses.name.charAt(0).toUpperCase() + responses.name.slice(1),responses.id,responses.email,responses.school));
//         }

//     }
    
//   }
  
//   // Function call to initialize app
//   init();
  
module.exports=promptQuestion;