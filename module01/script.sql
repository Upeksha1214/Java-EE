DROP DATABASE javaEEPos;
CREATE DATABASE javaEEPos;
USE javaEEPos;

DROP TABLE IF EXISTS Customer;
CREATE TABLE IF NOT EXISTS  Customer(
       custId VARCHAR(20),
       custName VARCHAR(100) NOT NULL DEFAULT 'Unknown',
       custAddress VARCHAR(100),
       tp VARCHAR(12),
       CONSTRAINT PRIMARY KEY(custId)
);


DROP TABLE IF EXISTS Item;
CREATE TABLE IF NOT EXISTS Item(
       itemCode VARCHAR(20),
       description VARCHAR(100) NOT NULL DEFAULT 'Unknown',
       unitPrice DOUBLE(100),
       qty INT,
       CONSTRAINT PRIMARY KEY(itemCode)
);


