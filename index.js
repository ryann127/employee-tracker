const mysql = require('mysql2');
const inquirer = require('inquirer')
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql127!',
    database: 'employee_db'
},
    console.log(`Connected to employees_db database.`)
)

const employeeList = [];
connection.query(`SELECT * FROM employee`, (err, response) => {
    if (err) {
        console.log(err);
    }
    for (let emp of response) {
        employeeList.push(`${emp.first_name} ${emp.last_name}`);
    }
});

const departmentList = [];
connection.query(`SELECT * FROM department`, (err, response) => {
    if (err) {
        console.log(err);
    }
    for (let dept of response) {
        departmentList.push(dept.dept_name);
    }
});

const roleList = [];
connection.query(`SELECT * FROM empRole`, (err, response) => {
    if (err) {
        console.log(err);
    }
    for (let role of response) {
        roleList.push(role.title);
    }
});


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
    connection.query(`SELECT department.id AS ID, department.dept_name AS Department FROM department;`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            console.table(result);
        }
        init();
    })
}

function roleView() {
    connection.query('SELECT empRole.id, empRole.title, empRole.salary, empRole.dept_id FROM empRole', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.table(result);
        }
        init();
    })
}

function empView() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.table(result);
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
                    console.table(result)
                }
                init();
            })
        })
}

function roleAdd() {
    inquirer.prompt(
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

function employeeAdd() {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'empFirst',
                message: "Please enter employee's first name:"
            },
            {
                type: 'input',
                name: 'empLast',
                message: "Please enter employee's last name:"
            },
            {
                type: 'list',
                name: 'empRoleId',
                choices: roleList,
                message: "What roles does the new Employee have?"
            },

            {
                type: 'input',
                name: 'empLast',
                message: 'Please enter a Salary for the new role:'
            },

            {
                type: 'list',
                name: 'empManId',
                choices: employeeList,
                message: "Who is the new employee's Manager?"

            }
        ]
    )
        .then((response) => {
            let roleId;
            const empManager = response.empManId.split(" ");
            let managerId;

            connection.query(`SELECT (id) FROM empRole WHERE title=(?)`, response.empRoleId, (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    roleId = results[0].id
                }

                connection.query(`SELECT (id) FROM employee WHERE first_name=(?) AND last_name=(?)`, [empManager[0], empManager[1]], (err, results) => {
                    if (err) {
                        console.error(err)
                    } else {
                        managerId = results[0].id
                    }
                })

                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [response.empFirst, response.empLast, roleId, managerId], (err, results) => {
                    if (err) {
                        console.error(err);
                    } else {
                        employeeList.push(`${response.empFirst} ${response.empLast}`);
                        console.log('New Employee added!');
                    }
                    init();
                });
            });
        });
};


init();