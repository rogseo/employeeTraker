const inquirer=require('inquirer');
// const Intern=require("./lib/Intern");
// const Manager=require("./lib/Manager");
// const Engineer=require("./lib/Engineer");



const promptQuestion = (employees, toDo)=>{
    return [
      {
        type: 'list',
        message: `What would you like to do?`,
        name: 'toDo',
        choices:['View All Department','View All Role','View All Employees','View Total Utilized Budget By Department','Add Department','Remove Department','Add Role',`Add Employee`,`Update Employee Role`, `Quit`],
      },
      ///ADD department question
      {
        type: 'input',
        message: `What is name of the department?`,
        name: 'department_name',
        when(answers) {
            return answers.toDo === 'Add Department'
        }
      },
      //question for add role
      {
        type: 'input',
        message: `What is the name of the role?`,
        name: 'role_name',
        when(answers) {
            return answers.toDo === 'Add Role'
        }
      },
      {
        type: 'input',
        message: `What is the salary of the role?`,
        name: 'role_salary',
        when(answers) {
            return answers.toDo === 'Add Role'
        }
      },
      {
        type: 'list',
        message: `What department does the role belong to?`,
        name: 'role_department',
        choice: employees.department_list,
        when(answers) {
            return answers.toDo === 'Add Role'
        }
      },
      //question for add employee
      {
        type: 'input',
        message: `What is your employee's first name`,
        name: 'first_name',
        when(answers) {
            return answers.toDo==='Add Employee'
        }
      },
      {
        type: 'input',
        message: `What is your employee's last name`,
        name: 'last_name',
        when(answers) {
            return answers.toDo==='Add Employee'
        }
      },
      {
        type: 'list',
        message: `What is the department`,
        name: 'role_department',
        choice : employees.manager,
        when(answers) {
            return answers.toDo === 'Add Employee'
        }
      },
      {
        type: 'list',
        message: `What is the employee's role`,
        name: 'employee_role',
        choice: employees.role_list,
        when(answers) {
            return answers.toDo==='Add Employee'
        }
      },
      {
        type: 'list',
        message: `What is the employee's manager`,
        name: 'employee_manager',
        choice : employees.manager,
        when(answers) {
            return answers.toDo === 'Add Employee'
        }
      },
      {
        type: 'input',
        message: `What is the name of role`,
        name: 'role_title',
        choice : employees.manager,
        when(answers) {
            return answers.toDo === 'Add Employee'
        }
      },
      {
        type: 'input',
        message: `What is the salary of the role`,
        name: 'role_salary',
        when(answers) {
            return answers.toDo === 'Add Employee'
        }
      },
      {
        type: 'list',
        message: `What is the department`,
        name: 'role_department',
        choice : employees.manager,
        when(answers) {
            return answers.toDo === 'Add Employee'
        }
      }
    ]

}




module.exports=promptQuestion;

