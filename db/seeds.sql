INSERT INTO department (dept_name)
VALUES ("Managment"),
       ("Assistant"), 
       ("Population"),
       ("Defense"),
       ("Outsiders");

INSERT INTO job (title, salary, department_id)
VALUES ("Warlord", "Unlimited Water", 1),
       ("Warlord Assistant", "A lot of Water", 2), 
       ("Treasures", "Much Water", 3),
       ("Warboys", "Only Necessary Water", 4),
       ("Wanderers", "No Water", 5);


INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES ("Immortan", "Joe", 1, NULL),
       ("Mad","Max", 5, NULL),
       ("Furiousa", NULL, 4, 1),
       ("Nux", NULL, 4, 3),
       ("Splendid", NULL, 3, 1),
       ("Doof", "Warrior", 2, 2),
       ("Bullet", "Farmer", 1, NULL);