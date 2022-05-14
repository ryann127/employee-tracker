const mysql = require('mysql2');
const consoleTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql127!',
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
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit'],
        }
    )
        .then((response) => {
            console.log(response)
            switch (response.option) {
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
                    roleAdd();
                    break;
                case 'Add an Employee':
                    employeeAdd();
                    break;
                case 'Update an Employee Role':

                    break;
                case 'Quit':
                    connection.end();
                    break;

            }
        })
}

function deptView() {
    connection.query('SELECT department.id, department.dept_name FROM department', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        init();
    })
}

function roleView() {
    connection.query('SELECT empRole.id, empRole.title, empRole.salary, empRole.dept_id FROM empRole', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        init();
    })
}

function empView() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        init();
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
            connection.query(`INSERT INTO department (dept_name) VALUES (?)`, response.dept, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Department Added!')
                    consoleTable(result)
                }
                init();
            })
        })
}

function roleAdd(){
    inquirer.prompt (
        [{
            type: 'input',
            name: 'roleTitle',
            message: 'What is the title of the new role?'
        },
        {
            type: 'input', 
            name: 'roleSalary',
            message: 'Please enter a Salary for the new role:'
        },
        {
            type: 'input',
            name: 'roleDid',
            message: 'What is the deparment ID for the new role?'
        }
    ]
    )
    .then((response) => {
        connection.query("INSERT INTO empRole SET ?", {
            title: response.roleTitle,
            salary: response.roleSalary,
            dept_id: response.roleDid
        }, (err, response) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Role Added!')
                console.table(response)
            }
            init();
        })
    })
}

// function employeeAdd(){
//     inquirer.prompt (
//         [{
//             type: 'input',
//             name: 'empFirst',
//             message: 'What is the title of the new role?'
//         },
//         {
//             type: 'input', 
//             name: 'empLast',
//             message: 'Please enter a Salary for the new role:'
//         },
//         {
//             type: 'input',
//             name: 'empRoleId',
//             message: 'What is the deparment ID for the new role?'
//         },
//         {
//             type: 'input',
//             name: 'empManId',
//             message: "Please enter the employee's Manager's ID"

//         }
//     ]
//     )
//     .then((response) => {
         
//       let roleId;
      
//       db.query(`SELECT (id) FROM roles WHERE title=(?)`, response.employeeRole, (err, results) => {
//         if (err) {
//           console.error(err);
//         } else {
//           roleId = results[0].id;
//         }

//         let managerId;
//         let employeesManager = response.employeeManager.split(' ');
//         db.query(`SELECT (id) FROM employees WHERE firstName = "${employeesManager[0]}" AND lastName = "${employeesManager[1]}"`, employeesManager, (err, results) => {
//           if (err) {
//             console.error(err);
//           } else {
//             managerId = results[0].id;
//           }
         
//           db.query(`INSERT INTO employees (firstName, lastName, roleId, managerId) VALUES (?, ?, ?, ?)`, [response.firstName, response.lastName, roleId, managerId], (err, results) => {
//             if (err) {
//               console.error(err)
//             } else {
//               console.log('\x1b[36m Employee successfully added!');
//             }
//           })
//         })
//       })
//       init();
//     })
// };
        
init()