
-- drop view if exists drop it
-- IF OBJECT_ID('CART', 'U') IS NOT NULL DROP VIEW [CART];

-- create cart view
CREATE VIEW [IN_PROGRESS]
AS  
SELECT * FROM [ORDER] WHERE [STATUS] = 'Cooking' OR [STATUS] = 'Out for delivery';
GO

-- example select
-- SELECT * FROM CART;