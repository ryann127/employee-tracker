USE employee_db;

INSERT INTO department (dept_name)
VALUES ("Executive"), ("Finance"), ("IT"), ("Human Resources"), ("Research");

INSERT INTO empRole (title,salary,dept_id)
VALUES ("CEO", 250000, 1),
("President", 150000, 1),
("VP", 100000, 1),
("Accountant", 80000, 2),
("HR Manager", 140000, 4),
("Scientist", 90000, 5),
("Software Engineer", 90000, 3);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Ryann", "Goldberg", 3, 1),
("Olivia", "Huneycutt", 4, 2),
("Maddy", "Dotson", 5, 3),
("Orson","Welles", 1, NULL), 
("Oscar", "Martinez", 2, NULL),
("Kelly", "Kapoor", 4, null);

SELECT * FROM department;
SELECT * FROM empRole;
SELECT * FROM employee;