CREATE DATABASE WarehouseDB
USE WarehouseDB

CREATE TABLE Items(
Code varchar(20) Primary key,
[Desc] varchar(200) NULL,
UnitPrice DECIMAL(10,2) NOT NULL,
Available int NOT NULL,
Saved int NOT NULL,
Subscript int NOT NULL, 
Freq varchar(10) NOT NULL,
SuppDate Date NOT NULL,
OrderPercent DECIMAL(5,2) NOT NULL,
)

CREATE TABLE Customers(
CustID varchar(10) NOT NULL Primary key,
CustType varchar(10) NOT NULL,
CustStatus varchar(10) NOT NULL,
FreezeCode varchar(10),
CustName varchar (50) NOT NULL,
DelivAddress varchar (255) NOT NULL,
MailAddress varchar (255) NOT NULL,
CreditCard varchar (20) NOT NULL,
)

CREATE TABLE ExOrders(
OrderNo int Primary key NOT NULL,
OrderDate Date ,
CustID varchar(10) NOT NULL,
Code varchar(20) NOT NULL,
Quantity int NOT NULL,
Delivery int NOT NULL,
Address varchar (255) NOT NULL,
Status varchar(10) NOT NULL,
SuppDate Date NOT NULL,
FOREIGN KEY (Code) References Items(Code),
FOREIGN KEY (CustID) References Customers(CustID)
)

CREATE TABLE Invoices (
InvNo varchar(10) Primary key NOT NULL,
OrderDate Date NOT NULL,
OrderNo int NOT NULL,
UnitDesc varchar(255),
UnitsNo varchar (10) NOT NULL,
TotalAmount int NOT NULL,
FOREIGN KEY (OrderNo) References ExOrders(OrderNo),
)

CREATE TABLE Subscription (
    OrderNo int PRIMARY KEY,
    Status varchar(10) NOT NULL,
    CustID varchar(10) NOT NULL,
    Code varchar(20) NOT NULL,
    Quantity int NOT NULL,
    Freq varchar(10) NOT NULL,
    Delivery varchar(10) NOT NULL,
    NextOrder Date NOT NULL,
    Expiration Date NOT NULL,
    FOREIGN KEY (Code) References Items(Code),
    FOREIGN KEY (CustID) References Customers(CustID)
)

CREATE TABLE Receipts (
    RecNo int Primary key,
    PymtDate Date NOT NULL,
    InvNo varchar(10) NOT NULL,
    OrderNo int NOT NULL,
    PaidAmt DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (InvNo) References Invoices(InvNo),
    FOREIGN KEY (OrderNo) References ExOrders(OrderNo)
)

CREATE TABLE Accounting (
    OrderDate Date NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    CrdtDebt varchar(10) NOT NULL,
    InvNo varchar(10),
    OrderNo int,
    ReceiptNo int,
    FOREIGN KEY (InvNo) References Invoices(InvNo),
    FOREIGN KEY (OrderNo) References ExOrders(OrderNo),
    FOREIGN KEY (ReceiptNo) References Receipts(RecNo)
)

CREATE TABLE StockOrder (
    OrderNo int PRIMARY KEY,
    StockDate DATE NOT NULL,
    Code varchar(20) NOT NULL,
    [Desc] varchar(255) NOT NULL,
    Quantity int NOT NULL,
    FOREIGN KEY (Code) References Items(Code)
)


CREATE TABLE DeliveryFees (
    Delivery varchar(10) PRIMARY KEY,
    [Desc] varchar(255) NOT NULL,
    DelFee DECIMAL(10, 2) NOT NULL
)


CREATE TABLE Discounts (
    CustType varchar(10) PRIMARY KEY,
    Discnt DECIMAL(5, 2) NOT NULL
)

CREATE TABLE Numbers (
    LastOrder int NOT NULL,
    LastSubsc int NOT NULL,
    LastStock int NOT NULL,
    LastReciept int NOT NULL,
    LastInvoice varchar (10) NOT NULL
)

CREATE TABLE Users (
    UserName varchar(50) PRIMARY KEY,
    Profile varchar(50) NOT NULL
)

CREATE TABLE Profiles (
    Profile varchar(50) PRIMARY KEY,
    Act varchar(255) NOT NULL
)