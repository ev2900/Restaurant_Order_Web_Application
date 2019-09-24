
-- drop view if exists drop it
-- IF OBJECT_ID('CART', 'U') IS NOT NULL DROP VIEW [CART];

-- create cart view
CREATE VIEW CART 
AS  
SELECT * FROM [ORDER] WHERE [STATUS] = 'In cart';
GO

-- example select
-- SELECT * FROM CART;