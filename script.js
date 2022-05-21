const inquirer = require('inquirer');
const fs = require('fs');
const connection = require('./db/connection');

const userRequest = () => {
    inquirer.prompt (
        [
            {
            type: "list",
            name: "request",
            message: "What would you like to do? ",
            choices: [
                "Add a Department",
                "Add an Employee",
                "Add a Role",
                "Update Employee's Role",
                "View all Departments",
                "View all Employees",
                "View All Roles"
                ],
            },
        ]
    )
.then((data) => {
    console.log(data)
    choiceHandler(data)
    writeToFile("./server.js")
    })
};

let choiceHandler = (userSelect) => {
    if (userSelect.request == "Add a Department") {
        newDept();
    } else if (userSelect.request == "Add an Employee") {
       newEmploy();
    } else if (userSelect.request == "Add a Role") {
        newRole();
    } else if (userSelect.request == "Update Employee's Role") {
        console.log("you are updating an employee's role")
    } else if (userSelect.request == "View all Departments") {
        console.log("viewing all deparmtments")
    } else if (userSelect.request == "View all Employees") {
        console.log("viewing all employees")
    } else {
        console.log("viewing all roles")
    };
}

const newDept = async () => {  

    const deptartment = await inquirer.prompt([
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
     ]);
      
       userRequest();
      }

const newEmploy = async () => {  

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

const newRole = async () => {  

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
          }

userRequest();