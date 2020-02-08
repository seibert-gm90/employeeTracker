DROP database IF exists employeeTracker;
CREATE DATABASE employeeTracker; 
USE employeeTracker; 

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL, 
  PRIMARY KEY (id)
   ); 

CREATE TABLE role (
  title VARCHAR(30) NOT NULL , 
  salary DECIMAL(10,2) NOT NULL, 
  department_id  INT NOT NULL, 
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
  );

CREATE TABLE employee(
  first_name VARCHAR(30) NOT NULL, 
  last_name VARCHAR(30) NOT NULL, 
  role_id INT NOT NULL, 
  manager_id INT NULL,  
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE, 
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
  ON UPDATE CASCADE
  )
  