CREATE TABLE Customers(
       customer_id SERIAL PRIMARY KEY, 
       customer_name VARCHAR(60), 
       customer_age INT
);
INSERT INTO Customers(
       customer_name, 
       customer_age) 
VALUES(
       "Mostafa Wael", 
        21
);
INSERT INTO Customers(
       customer_name, 
       customer_age) 
VALUES(
       "Wea'am Bassem", 
        23
);
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; 
flush privileges;