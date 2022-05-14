USE employee_db;

INSERT INTO department (dept_name)
VALUES ("Executive"), ("Finance"), ("IT"), ("Human Resources"), ("Research");

INSERT INTO empRole (title,salary,dept_id)
VALUES ("CEO", 250000, 1),
("President", 150000, 1),
("VP", 100000, 1),
("Accountant", 80000, 2),
("HR Manager", 140000, 4),
("Scientist", 90000, 5);
("Software Engineer", 90000, 3)

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Ryann", "Goldberg", 3, 001),
("Olivia", "Huneycutt", 4, 002),
("Maddy", "Dotson", 5, 003),
("Orson","Welles", 1, 004), 
("Oscar", "Martinez", 2, 005),
("Kelly", "Kapoor",4, 006);

SELECT * FROM department;
SELECT * FROM empRole;
SELECT * FROM employee;