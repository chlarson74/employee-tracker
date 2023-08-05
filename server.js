const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'employee_db'
  },
  console.log(`

  ........................................

  |. /|    /.    | .  |. /|    /.    .   /  
  | V |   /  .   |  . | V |   /  .    . /   
  |   |  /.....  |  / |   |  /.....   / . 
  |   | /      . | /  |   | /      . /   .
                     
   Connected to the MAD MAX jobs database
  ........................................


  `)
);

// THE USER is presented with the following options: 
//view all departments, 
//view all jobs, 
//view all employees, 
//add a department, 
//add a role, 
//add an employee 
//update an employee role


function menu() {
    inquirer.prompt(
        {
            type:"list",
            name:"action",
            message:"what would you like to do?",
            choices:["view department", "view job", "view employee", "add department", "delete department", "add job", "delete job", "add employee", "update employee", "delete employee"]
        }
    )
    .then(response => {
        if (response.action === "view department") {
            db.query('SELECT * FROM department', function (err, results) {
            console.log(err);  
            console.table(results);
            menu()
            })
        }
        if (response.action === "add department") {
            inquirer.prompt(
                {
                    type:"input",
                    name:"name",
                    message:"what is the new department?", //use more messages for other tables to ask questions regarding the different keys
                }
            )
            .then(response => {
                db.query("insert into department(dept_name) values(?)", [response.name], (err, results) => {
                    console.log(err);  
                    console.table(results);
                    menu()
                })
            })
        }
        //deleting a department
        if (response.action === "delete department") {
            inquirer
              .prompt([
                {
                  type: "input",
                  name: "name",
                  message: "What department should be deleted?",
                },
              ])
              .then((response) => {
                db.query(
                  "DELETE FROM department WHERE dept_name = ?",
                  [response.name],
                  (err, results) => {
                    if (err) {
                      console.log("Error while deleting department:", err);
                    } else {
                      console.table(results);
                    }
                    menu();
                  }
                );
              });
          }
        //end delete function

        if (response.action === "view job") {
            db.query('SELECT * FROM job', function (err, results) {
            console.log(err);  
            console.table(results);
            menu()
            })
        }
        if (response.action === "add job") {
            inquirer.prompt( [
                {
                    type:"input",
                    name:"title",
                    message:"what is the new job title?", //use more messages for other tables to ask questions regarding the different keys
                },
                {
                    type:"input",
                    name:"salary",
                    message:"what is the new job salary? Enter a weekly water quantity", //use more messages for other tables to ask questions regarding the different keys
                },
                {
                    type:"input",
                    name:"department_id",
                    message:"what is the new job department ID? Enter a number 1 through 5.", //use more messages for other tables to ask questions regarding the different keys
                }
            ])
            .then(response => {
                db.query("insert into job(title, salary, department_id) values(?,?,?)", [response.title, response.salary, response.department_id], (err, results) => {
                    console.log(err);  
                    console.table(results);
                    menu()
                })
            })
        }
        //deleting a job
        if (response.action === "delete job") {
            inquirer
            .prompt([
                    {
                        type:"input",
                        name:"title",
                        message:"what is job title should be removed?",
                    },
                  ])
                  .then((response) => {
                    db.query(
                      "DELETE FROM job WHERE title = ?",
                      [response.title],
                      (err, results) => {
                        if (err) {
                          console.log("Error while deleting job:", err);
                        } else {
                          console.table(results);
                        }
                        menu();
                      }
                    );
                  });
              }
            //end delete function
        if (response.action === "view employee") {
            db.query('SELECT * FROM employee', function (err, results) {
            console.log(err);  
            console.table(results);
            menu()
            })
        }
        if (response.action === "add employee") {
            inquirer.prompt( [
                {
                    type:"input",
                    name:"first_name",
                    message:"what is the first name of the new employee?", //use more messages for other tables to ask questions regarding the different keys
                },
                {
                    type:"input",
                    name:"last_name",
                    message:"what is the last name of the new employee", //use more messages for other tables to ask questions regarding the different keys
                },
                {
                    type:"input",
                    name:"job_id",
                    message:"what is the new employee's job department ID? Enter a number.", //use more messages for other tables to ask questions regarding the different keys
                },
                {
                    type:"input",
                    name:"manager_id",
                    message:"who is the new employee's manager ID? Enter a number.", //use more messages for other tables to ask questions regarding the different keys
                }
            ])
            .then(response => {
                db.query("insert into employee(first_name, last_name, job_id, manager_id) values(?,?,?,?)", [response.first_name, response.last_name, response.job_id, response.manager_id], (err, results) => {
                    console.log(err);  
                    console.table(results);
                    menu()
                })
            })
        }
        //update an employee
        if (response.action === "update employee") {
            inquirer
              .prompt([
                {
                  type: "input",
                  name: "id",
                  message: "Enter the ID of the employee you want to update:",
                },
                {
                  type: "input",
                  name: "first_name",
                  message: "Enter the new first name:",
                },
                {
                  type: "input",
                  name: "last_name",
                  message: "Enter the new last name:",
                },
                {
                  type: "input",
                  name: "job_id",
                  message: "Enter the new job department ID (a number):",
                },
                {
                  type: "input",
                  name: "manager_id",
                  message: "Enter the new job's manager ID (a number):",
                },
              ])
              .then((response) => {
                const employeeId = response.id;
                const newFirstName = response.first_name;
                const newLastName = response.last_name;
                const newJobID = response.job_id;
                const newManagerID = response.manager_id;
          
                // Update employee data in the database based on the provided inputs
                db.query(
                  "UPDATE employee SET first_name = ?, last_name = ?, job_id = ?, manager_id = ? WHERE id = ?",
                  [newFirstName, newLastName, newJobID, newManagerID, employeeId],
                  (err, results) => {
                    if (err) {
                      console.log("Error while updating employee:", err);
                    } else {
                      console.log("Employee updated successfully.");
                      console.table(results);
                    }
                    menu(); 
                  }
                );
              });
          }  

       //deleting an employee
       if (response.action === "delete employee") {
        inquirer
        .prompt([
                {
                    type:"input",
                    name:"first_name",
                    message:"what is the employee's first name that should be removed?",
                },
              ])
              .then((response) => {
                db.query(
                  "DELETE FROM employee WHERE first_name = ?",
                  [response.first_name],
                  (err, results) => {
                    if (err) {
                      console.log("Error while deleting employee:", err);
                    } else {
                      console.table(results);
                    }
                    menu();
                  }
                );
              });
          }
        //end delete function        
    })
}

menu()

//********************************************************* */
//ACCEPTANCE CRITERIA
// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

//********************************************************* */
// HOMEWORK PSUEDOCODE: Due 8/4

// create a repo clone it down/
// no starting code/

//gitignore - node (in Github repo) and (manual) DS_Store
//


//foreign keys (see the homework-demo-01.png —- department_id, role_id, manager_id 
//create a google sheet to visually create the 3 data tables — department, role, employee
// create arbitrary departments, roles and employees
//db folder

	//schema.sql — 
		//drop database 
		//create database
		//use database
		//create department table (id, department name)
		//create role table (id, title, salary, department_id*)
		//create employee table (id, first_name, last_name, role_id*, manager_id*)
		
	//seed.sql — all three tables in here
		//insert the data from the spreadsheet visualization

//INSTALL DEPENDENT FILES
	// npm init -y (creates the package json)
	// npm i inquirer@8.2.4 (look in the readme file)
	// npm i mysql 2 (install mysql package)
	// require inquire

//index.js
	// import statements
	// create inquirer questions
		// first question - what would you like to do?
		// what if you have a function for each option - (if else or switch statements)
			//SAMPLE FUNCTION:
			//const viewAllEmployees = () => {
				//query database
				//display results
				//return to main menu
			// }
			//const addNewEmployee = () => {
				//
			// }
 			//const addNewRole = () => {
				//ask the role’s name
				//ask the salaray
				//query the departments - when this is complete proceed to next steps 
					//db.query the exact string you would put into the sql file.
				//give the list of departments
				//async await or promise - use callbacks for these questions - db query is asynchronous
				//return to main menu
			// }
			//repeat the process for each function
			//will need a connection: activity 11-connect NODE (lines 12-19) — node based application — check out activity 11 or 12 from Tuesday for clues
			// rewatch all of Tuesdays class for clues
			// will run into async - nest within each other

			// all the work should be working in index.js file — 
			// drop, create. use database - employee_db
			// 
// * foreign key