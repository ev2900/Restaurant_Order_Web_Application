
-- drop view if exists drop it
-- IF OBJECT_ID('IN_PROGRESS', 'U') IS NOT NULL DROP VIEW [IN_PROGRESS];

-- create cart view
CREATE VIEW [IN_PROGRESS]
AS  
SELECT * FROM [ORDER] WHERE [STATUS] = 'Cooking' OR [STATUS] = 'Out for delivery';
GO

-- example select
-- SELECT * FROM [IN_PROGRESS];