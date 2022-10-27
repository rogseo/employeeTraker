SELECT employee.id,employee.first_name,employee.last_name, role.title, department.name, role.salary, CONCAT(employee.first_name+" "+employee.last_name) AS manager
FROM ((employee 
INNER JOIN role ON employee.role_id=role.id)
INNER JOIN department ON department.id=role.department_id);


