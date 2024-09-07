USE WarehouseDB;

-- Insert data into Items table
INSERT INTO Items (Code, [Desc], UnitPrice, Available, Saved, Subscript, Freq, SuppDate, OrderPercent)
VALUES
('I001', 'Item Description 1', 19.99, 100, 50, 1, 'Monthly', '2024-01-10', 10.00),
('I002', 'Item Description 2', 29.99, 200, 75, 2, 'Weekly', '2024-02-15', 15.00);

-- Insert data into Customers table
INSERT INTO Customers (CustID, CustType, CustStatus, FreezeCode, CustName, DelivAddress, MailAddress, CreditCard)
VALUES
('C001', 'Regular', 'Active', NULL, 'John Doe', '123 Elm St', 'john@example.com', '1234567890123456'),
('C002', 'VIP', 'Inactive', 'F001', 'Jane Smith', '456 Oak St', 'jane@example.com', '6543210987654321');

-- Insert data into ExOrders table
INSERT INTO ExOrders (OrderNo, OrderDate, CustID, Code, Quantity, Delivery, Address, Status, SuppDate)
VALUES
(1001, '2024-03-01', 'C001', 'I001', 10, 1, '123 Elm St', 'Shipped', '2024-03-02'),
(1002, '2024-03-15', 'C002', 'I002', 5, 2, '456 Oak St', 'Pending', '2024-03-16');

-- Insert data into Invoices table
INSERT INTO Invoices (InvNo, OrderDate, OrderNo, UnitDesc, UnitsNo, TotalAmount)
VALUES
('INV001', '2024-03-01', 1001, 'Item Description 1', '10', 199.90),
('INV002', '2024-03-15', 1002, 'Item Description 2', '5', 149.95);

-- Insert data into Subscription table
INSERT INTO Subscription (OrderNo, Status, CustID, Code, Quantity, Freq, Delivery, NextOrder, Expiration)
VALUES
(1001, 'Active', 'C001', 'I001', 10, 'Monthly', '1', '2024-04-01', '2025-03-01'),
(1002, 'Active', 'C002', 'I002', 5, 'Weekly', '2', '2024-03-22', '2024-12-31');

-- Insert data into Receipts table
INSERT INTO Receipts (RecNo, PymtDate, InvNo, OrderNo, PaidAmt)
VALUES
(1, '2024-03-02', 'INV001', 1001, 199.90),
(2, '2024-03-16', 'INV002', 1002, 149.95);

-- Insert data into Accounting table
INSERT INTO Accounting (OrderDate, Amount, CrdtDebt, InvNo, OrderNo, ReceiptNo)
VALUES
('2024-03-01', 199.90, 3000, 'INV001', 1001, 1),
('2024-03-15', 149.95, 5000, 'INV002', 1002, 2);

-- Insert data into StockOrder table
INSERT INTO StockOrder (OrderNo, StockDate, Code, [Desc], Quantity)
VALUES
(2001, '2024-03-05', 'I001', 'Stock Order for Item 1', 50),
(2002, '2024-03-20', 'I002', 'Stock Order for Item 2', 30);

-- Insert data into DeliveryFees table
INSERT INTO DeliveryFees (Delivery, [Desc], DelFee)
VALUES
('1', 'Standard Delivery', 5.00),
('2', 'Express Delivery', 15.00);

-- Insert data into Discounts table
INSERT INTO Discounts (CustType, Discnt)
VALUES
('Regular', 5.00),
('VIP', 10.00);

-- Insert data into Numbers table with LastInvoice as varchar
INSERT INTO Numbers (LastOrder, LastSubsc, LastStock, LastReciept, LastInvoice)
VALUES
(1002, 1002, 3002, 2, 'INV002');


-- Insert data into Users table
INSERT INTO Users (UserName, Profile)
VALUES
('admin', 'Admin'),
('sales', 'Sales');

-- Insert data into Profiles table
INSERT INTO Profiles (Profile, Act)
VALUES
('Admin', 'Full Access'),
('Sales', 'Limited Access');
