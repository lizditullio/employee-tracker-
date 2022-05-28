const res = require('express/lib/response');
const inquirer = require('inquirer');
const mysql = require('mysql');
//const connection = require('./db/connection');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'liz72296E',
    database: 'company_db'
  });
  
const userRequest = () => {
    inquirer.prompt (
        [
            {
            type: "list",
            name: "request",
            message: "What would you like to do? ",
            choices: [
                "View all Departments",
                "Add a Department",
                "Add an Employee",
                "Add a Role",
                "Update Employee's Role",
                "View all Employees",
                "View All Roles"
                ],
            },
        ]
    )

.then((data) => {
    console.log(data)
    choiceHandler(data);
    })
};

let choiceHandler = (userSelect) => {
    if (userSelect.request == "View all Departments") {
        viewDepartments();
    } else if (userSelect.request == "Add an Employee") {
       newEmploy();
    } else if (userSelect.request == "Add a Role") {
        newRole();
    } else if (userSelect.request == "Update Employee's Role") {
        console.log("you are updating an employee's role")
    } else if (userSelect.request == "Add a Department") {
        newDept();
    } else if (userSelect.request == "View all Employees") {
        viewEmployees();
    } else {
        viewRoles();
    };
};

userRequest();


let viewDepartments = () => {
    let query = `SELECT 
        department.id,
        department.department_name
        FROM department`;
    connection.query(query,(err, res)=> {
        if (err) throw err;
        console.table(res);
        userRequest();
    });
};

let viewEmployees = () => {
    let query = `SELECT 
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.department_name AS department,
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role 
            ON employee.role_id = role.id
        LEFT JOIN department
            ON department.id = role.department_id
        LEFT JOIN employee manager
            ON manager.id = employee.manager_id`;
    connection.query(query,(err, res)=> {
        if (err) throw err;
        console.table(res);
        userRequest();
    });
};

let viewRoles = () => {
    let query = `SELECT 
        role.id,
        role.title,
        role.salary,
        department.department_name AS department
        FROM role
        LEFT JOIN department
            ON department.id = role.department_id`;
    connection.query(query,(err, res)=> {
        if (err) throw err;
        console.table(res);
        userRequest();
    });
};

let newDept = () => {  
    const deptartment = inquirer.prompt([
          {
        type: "input",
         name: "name",
         message: "What is the name of the Department you'd like to add?",
            validate: (name) =>{
              if (name) {
                return true;
             } else {
               console.log(" Please Enter a Department Name!")
              return false;
             }
            },
         },
        ]).then((res) => {
            console.log("Adding a new department")
            connection.query( 'INSERT INTO department SET ?',
            {
                department_name: res.name
            });
            userRequest();
        });
    }

let newEmploy = async () => {  

  const employee = await inquirer.prompt([
      {
        type: "input",
         name: "name",
        message: "What is the name of the employee you'd like to add?",
            validate: (name) =>{
                if (name) {
                 return true;
                } else {
                 console.log(" Please Enter an Employee!")
                return false;
              }
             },
            },
        ]);
          
           userRequest();
          }

let newRole = async () => {  

        const role = await inquirer.prompt([
              {
            type: "input",
             name: "name",
             message: "What is the name of the role you'd like to add?",
                validate: (name) =>{
                  if (name) {
                    return true;
                 } else {
                   console.log(" Please Enter a Role!")
                  return false;
                 }
                },
             },
         ]);
          
           userRequest();
          };
