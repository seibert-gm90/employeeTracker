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
  choseView(); 
});

//sets up express

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    connection.end();
  });
  choseAdd()
};

function viewRoles(){
  console.log("Selecting all roles...\n");
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
  choseAdd()
};

function viewEmployees(){
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
  choseAdd()
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
      let query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
      connection.query(query, [answer.role, answer.salary, answer.departmentId], function(err, result) {
        if (err) {
          throw err;
        }
        console.log("this worked", result);
      });
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
        }
      );
    });
}

// function multiSearch() {
//   var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//   connection.query(query, function(err, res) {
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].artist);
//     }
//     runSearch();
//   });
// }

// function rangeSearch() {
//   inquirer
//     .prompt([
//       {
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       var query =
//         "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Position: " +
//               res[i].position +
//               " || Song: " +
//               res[i].song +
//               " || Artist: " +
//               res[i].artist +
//               " || Year: " +
//               res[i].year
//           );
//         }
//         runSearch();
//       });
//     });
// }

// function songSearch() {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?"
//     })
//     .then(function(answer) {
//       console.log(answer.song);
//       connection.query(
//         "SELECT * FROM top5000 WHERE ?",
//         { song: answer.song },
//         function(err, res) {
//           console.log(
//             "Position: " +
//               res[0].position +
//               " || Song: " +
//               res[0].song +
//               " || Artist: " +
//               res[0].artist +
//               " || Year: " +
//               res[0].year
//           );
//           runSearch();
//         }
//       );
//     });
// }

// function songAndAlbumSearch() {
//   inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?"
//     })
//     .then(function(answer) {
//       var query =
//         "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//       query +=
//         "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//       query +=
//         "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

//       connection.query(query, [answer.artist, answer.artist], function(
//         err,
//         res
//       ) {
//         console.log(res.length + " matches found!");
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             i +
//               1 +
//               ".) " +
//               "Year: " +
//               res[i].year +
//               " Album Position: " +
//               res[i].position +
//               " || Artist: " +
//               res[i].artist +
//               " || Song: " +
//               res[i].song +
//               " || Album: " +
//               res[i].album
//           );
//         }

//         runSearch();
//       });
//     });
// }
