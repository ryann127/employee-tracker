const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
},
console.log(`Connected to employees_db database.`)
)

const inquirer = require('inquirer');

function init() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'option',
            message: 'Where would you like to begin?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
        }
    )
    .then((response) => {
        console.log(response)
        switch(response.option) {
            case 'View All Departments':
                deptView();
            break;
            case 'View All Roles':
                roleView();
            break;
            case 'View All Employees':
                empView();
            break;
            case 'Add a Department':
                deptAdd();
            break;
            case 'Add a Role':

            break;
            case 'Add an Employee':
                
            break;
            case 'Update an Employee Role':

            break;

        }
    })
}

function deptView() {
    connection.query('SELECT department.id, department.dept_name FROM department', function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
}

function roleView() {
    connection.query('SELECT empRole.id, empRole.title, empRole.salary, empRole.dept_id FROM empRole', function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
}

function empView() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee', function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
}

function deptAdd() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'dept',
            message: 'What would you like to name the new Department?'
        }
    )
    .then((response) => {
        connection.query('INSERT INTO department SET ?', response.dept)
    })
    
}

init()