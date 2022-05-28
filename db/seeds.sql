INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Accounting"),
       ("Project Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 75000, 1),
       ("Sales Lead", 60000, 1),
       ("Sales Representative", 45000, 1),
       ("Accountng Manager", 100000, 2),
       ("Accounting Lead", 80000, 2),
       ("Accounting Representative", 75000, 2),
       ("Project Manager", 150000, 3),
       ("Project Lead", 85000, 3),
       ("Project Representative", 75000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Liz", "DiTulio", 1, NULL),
       ("Vanessa", "Denmead", 2, 1),
       ("Sam", "Curry", 3, 1),
       ("Bill", "Wilman", 4, NULL),
       ("Cinthia", "Geraldino", 5, 4),
       ("Allie", "Duca", 6, 4),
       ("Nick", "DiMAtteo", 7, NULL),
       ("TJ", "Muniz", 8, 7);