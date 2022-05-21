const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql');

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
    })
};
