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
        type: 'input',
        message: `What is the name of role`,
        name: 'role_title',
        choice : employees.manager,
        when() {
            return toDo === 'Add Employee'
        }
      },
      {
        type: 'input',
        message: `What is the salary of the role`,
        name: 'role_salary',
        choice : employees.manager,
        when() {
            return toDo === 'Add Employee'
        }
      },
      {
        type: 'list',
        message: `What is the department`,
        name: 'role_department',
        choice : employees.manager,
        when() {
            return toDo === 'Add Employee'
        }
      }
    ]

}




module.exports=promptQuestion;

