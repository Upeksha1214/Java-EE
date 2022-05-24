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


create table Item
(
    ItemCode    varchar(20)  not null
        primary key,
    description varchar(100) null,
    unitPrice   varchar(100) null,
    qty         varchar(100) null
);

create table `order`
(
    orderId varchar(20) not null
        primary key,
    custId  varchar(20) null,
    date    varchar(30) null,
    constraint order_Customer__fk
        foreign key (custId) references Customer (custId)
            on update cascade on delete cascade
);



