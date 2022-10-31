# employeeTraker


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL

## Table of Contents
- [Technology](#technology)
- [Installation](#installation)
- [Usage](#usage)
- [Demonstration](#demonstration)
- [Questions](#questions)

## Technology
[MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to your MySQL database and perform queries, the [Inquirer package](https://www.npmjs.com/package/inquirer/v/8.2.4) to interact with the user via the command line, the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console, and the [util.promisify](https://www.npmjs.com/package/util.promisify) to make queries asynchronous.

## Installation
Install npm package that it need by using the following command:
```bash
npm install
```
Check package.json to see what has been installed
```
   "dependencies": {
    "console.table": "^0.10.0",
    "express": "^4.18.2",
    "inquirer": "^8.2.4",
    "mysql2": "^2.3.3",
    "util.promisify": "^1.1.1"
  }
```

## Usage

Firstly, Create database tables by using the following command.
```zsh
mysql -u root -p  
source db/schema.sql
source db/seed.sql
quit
```
Start the application by using the following command.
```zsh
node server.js
```
Application Flow
```
WHEN I start the application
THEN I am presented with the following options: 'View All Department','View All Role','View All Employees','View Total Utilized Budget By Department','Add Department','Remove Department','Add Role','Remove Role','Add Employee','Remove Employee','Update Employee Role', 'Quit'.
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
WHEN I choose to remove employee, department or role
THEN I am prompted to select the choices to remove and it is deleted from the database
WHEN I choose View Total Utilized Budget By Department
THEN I am presented with a formatted table showing the combined salaries of all employees in each department
```


## Demonstration
[ViewDemoVideo](https://watch.screencastify.com/v/rXGVlGsQZfoBYtM3qBbB)

## Questions
if you have more question, reach me out below.
* Github repository : https://github.com/rogseo
* email : rogseo@gmail.com
