-- USE organization_db;
-- SELECT employee.id,employee.first_name,employee.last_name, role.title, department.name, role.salary, CONCAT(employee.first_name," ",employee.last_name) AS manager
-- FROM ((employee 
-- INNER JOIN role ON employee.role_id=role.id)
-- INNER JOIN department ON department.id=role.department_id);
USE organization_db;
SELECT SUM(role.salary) AS total budget
FROM ((((employee E1 INNER JOIN role ON E1.role_id=role.id)
INNER JOIN department ON department.id=role.department_id))
LEFT JOIN employee E2 ON E1.manager_id = E2.id)
GROUP BY department.id;




-- SELECT CONCAT(employee.first_name," ",employee.last_name) as manager
-- FROM employee
-- JOIN employee ON employee.id=employee.manager_id;

--  SELECT EMPID,EMPNAME,DESIGNATION, 
--  case 
--  when 'MANAGERID' <> NULL then EMPNAME else null
--  then 
--  end as manager FROM employee

SELECT *
FROM employee E1
LEFT JOIN employee E2 ON E1.manager_id = E2.id;

SELECT *
FROM employee E1
RIGHT JOIN employee E2 ON E1.manager_id = E2.id;

SELECT CONCAT(E2.first_name," ",E2.last_name) AS manager
FROM employee E1
LEFT JOIN employee E2 ON E1.manager_id = E2.id;



SELECT *
FROM role
JOIN department ON role.department_id=department.id;

SELECT *
FROM role
INNER JOIN department ON role.department_id=department.id;

