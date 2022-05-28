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
                "View all Employees",
                "View All Roles",
                "Add a Department",
                "Add an Employee",
                "Add a Role",
                "Update Employee's Role",
                "Update Enmployee's Manager"
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
        updateRole();
    } else if (userSelect.request == "Add a Department") {
        newDept();
    } else if (userSelect.request == "View all Employees") {
        viewEmployees();
    } else if (userSelect.request == "View all Roles") {
        viewRoles();
    } else {
        updateManager();
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
        employee.manager_id,
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
            viewDepartments();
            userRequest();
        });
    };


    let newRole = () => {  
        const role = inquirer.prompt([
              {
                type: "input",
                name: "title",
                message: "What is the name of the role you'd like to add?",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary for this role?",
                },
                {
                    type: "input",
                    name: "department",
                    message: "What is the id of the department you'd like to add?",
                }
        ]).then((res) => {
                console.log("Adding a new role")
               
                connection.query( 'INSERT INTO role SET ?',
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: res.department
                });
            viewRoles();
            userRequest();
            });
        }

    let newEmploy = () => {  
        const employee = inquirer.prompt([
              {
                  type: "input",
                  name: "first_name",
                    message: "What is their first name?",
                },
                {
                    type: "input",
                    name: "last_name",
                   message: "What is their first name?",
                 },
                 {
                     type: "input",
                    name: "role",
                     message: "What is their role id?",
                },
                {
                    type: "input",
                   name: "manager",
                    message: "What is the id of their manager?",
               }
         ]).then((res) => {
                 console.log("Adding a new role")
                   
                 connection.query( 'INSERT INTO employee SET ?',
                 {
                    first_name: res.first_name,
                    last_name: res.last_name,
                    role_id: res.role,
                    manager_id: res.manager,
                 });
            viewEmployees();
            userRequest();
             });
        }

     let updateRole = () => {
         const findEmployee = inquirer.prompt([
            {
                type: "input",
                name: "old_id",
                message: "What is the id number of the employee you'd like to update?",
            },
            {
                type: "input",
                name: "new_role",
                message: "What is the id number of the new role for this employee?",
            }
         ]).then( (res) => {
             console.log("Updating the employee's role")
            connection.query(`SELECT id FROM employee WHERE id=${res.old_id}`);
            connection.query(`UPDATE employee SET ? WHERE role_id=${res.old_id}`,
            {
                role_id: res.new_role,
            });
            viewEmployees();
            userRequest();
         });
     };

     let updateManager = () => {
        const findEmployee = inquirer.prompt([
           {
               type: "input",
               name: "id",
               message: "What is the id number of the employee you'd like to update?",
           },
           {
               type: "input",
               name: "manager",
               message: "What is the id number of their new manager?",
           }
        ]).then( (res) => {
            console.log("Updating the employee manager")
           connection.query(`SELECT id FROM employee WHERE id=${res.id}`);
           connection.query(`UPDATE employee SET ? WHERE manager_id=${res.manager}`,
           {
               manager_id: res.manager,
           });
           userRequest();
        });
    };