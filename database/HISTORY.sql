
-- drop view if exists drop it
-- IF OBJECT_ID('HISTORY', 'U') IS NOT NULL DROP VIEW [HISTORY];

-- create cart view
CREATE VIEW [HISTORY]
AS  
SELECT * FROM [ORDER] WHERE [STATUS] = 'Delivered';
GO

-- example select
-- SELECT * FROM [IN_PROGRESS];