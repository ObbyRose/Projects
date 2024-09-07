
CREATE PROCEDURE getAllItems
AS
select *
from Items;
order by Code
GO

CREATE PROCEDURE OrdersToBeDone
AS
select E.OrderDate, SUM(I.UnitPrice * E.Quantity) AS OrderAmount,
I.[Desc] AS ItemDescription,
E.Quantity,
E.Status
FROM ExOrders E
JOIN Items I ON E.Code = I.Code
GROUP BY E.OrderDate, E.OrderNo, I.[Desc], E.Quantity, E.Status
ORDER BY E.OrderDate;
GO

CREATE PROCEDURE ReturningCustomer
AS
SELECT
C.CustID, C.CustName, C.CustStatus, 
S.OrderNo,S.Status,
I.[Desc], O.Quantity, s.freq 
FROM Subscription S
INNER JOIN Customers C ON S.CustID = C.CustID
INNER JOIN ExOrders O ON S.OrderNo = O.OrderNo
INNER JOIN Items I ON O.Code = I.Code
ORDER BY C.CustID, S.OrderNo, I.[Desc];
GO

CREATE PROCEDURE FinancialSituation
AS

select R.RecNo, R.OrderNo, R.PymtDate,R.PaidAmt,
sum(A.CrdtDebt - R.PaidAmt) as SumOfDebtAndPaid
from Receipts as R join Accounting as A
on R.InvNo = A.InvNo
group by R.OrderNo, r.RecNo, R.PymtDate,R.PaidAmt
GO

CREATE PROCEDURE PendingOrders
AS
select e.OrderDate, e.SuppDate, i.TotalAmount
from ExOrders as e join Invoices as i
on e.OrderNo = i.OrderNo
where status = 'Pending'
order by e.OrderDate
GO
