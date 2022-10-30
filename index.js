const inquirer=require('inquirer');

const promptQuestion = (employees)=>{
    return [
      {
        type: 'list',
        message: `What would you like to do?`,
        name: 'toDo',
        choices:['View All Department','View All Role','View All Employees','View Total Utilized Budget By Department','Add Department','Remove Department','Add Role','Remove Role',`Add Employee`,'Remove Employee',`Update Employee Role`, `Quit`],
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
        choices: employees.department.name_list,
        when(answers) {
            return answers.toDo === 'Add Role'
        }
      },
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
        name: 'employee_department',
        choices: employees.department_list,
        when(answers) {
            return answers.toDo === 'Add Employee'
        }
      },
      {
        type: 'list',
        message: `What is the employee's role`,
        name: 'employee_role',
        choices: employees.role.name_list,
        when(answers) {
            return answers.toDo==='Add Employee'
        }
      },
      {
        type: 'list',
        message: `What is the employee's manager`,
        name: 'employee_manager',
        choices: employees.manager.name_list,
        when(answers) {
            return answers.toDo === 'Add Employee'
        }
      },
      {
        type: 'list',
        message: `Select the department you want to delete`,
        name: 'remove_department',
        choices: employees.department.name_list,
        when(answers) {
            return answers.toDo === 'Remove Department'
        }
      }
    ]

}



module.exports=promptQuestion;

