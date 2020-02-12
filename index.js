var mysql = require("mysql");
var inquirer = require("inquirer");
var express = require("express");
var table = require("console.table")

var app = express();

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Onyx2013!",
  database: "employeeTracker"
});

connection.connect(function(err) {
  if (err) throw err;
  choseAdd(); 
});

//sets up express

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//funtion to take users back to "main menu" at the end of view, add, or update

function mainMenu(){
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["Add", "View", "or update employees"]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "Add":
            choseAdd();
            break;
  
          case "View":
            choseView();
            break;
  
          case "or update employees":
            updateEmployee();
            break;
        }
      });
  }


//handles user choice for what they'd like to view

function choseView(){
  inquirer
  .prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: ["View departments", "View roles", "View employees"]
  })
  .then(function(answer) {
    switch (answer.action) {
      case "View departments":
        viewDepartments();
        break;

      case "View roles":
        viewRoles();
        break;

      case "View employees":
        viewEmployees();
        break;
    }
  });
};


function viewDepartments(){
  console.log("Selecting all departments...\n");
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    then
    mainMenu(); 
  });
  
};

function viewRoles(){
  console.log("Selecting all roles...\n");
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    then
    mainMenu(); 
  });
}; 


async function viewEmployees(){
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    then
    mainMenu(); 
  });
}
//handles user choice for what they'd like to add

function choseAdd() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: ["Add department", "Add a role", "Add an employee"]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Add department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What department would you like to add?"
    })
    .then(function(answer) {
      let query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query, [answer.department], function(err, result) {
        if (err) {
          throw err;
        }
        console.log("this worked", result);
        console.table(result)
        mainMenu();
      });
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "role",
        type: "rawlist",
        message: "What role would you like to add?",
        choices: ["manager", "intern", "CEO"]
      },
      {
        name: "salary",
        type: "input",
        message: "What is this employee's yearly salary?"
      }, 
      {
        name: "departmentId", 
        type: "input", 
        message:"What is this role's department ID?"

      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.role,
          salary: answer.salary,
          department_id: answer.departmentId
        },
        function(err) {
          if (err) throw err;
          console.log("Your role was created successfully!");  
          console.table(answer)
          mainMenu();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of the employee you'd like to add?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name of the employee you'd like to add?"
      },
      {
        name: "roleId",
        type: "input",
        message: "What is this employee's role id?"
      },
      {
        name: "managerId",
        type: "input",
        message: "What is this employee's manager's id?"
      }
    ])
    .then(function(answer) {
      let query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
      connection.query(
        query,
        [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
        function(err, result) {
          if (err) {
            throw err;
          }
          console.log("this worked", result);
          console.table(result)
          mainMenu();
        }
      );
    });
}


