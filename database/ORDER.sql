
-- drop table if exists drop it
IF OBJECT_ID('ORDER', 'U') IS NOT NULL DROP TABLE [ORDER];

-- create table
CREATE TABLE [dbo].[ORDER](
	[ORDER_ID] [int] IDENTITY(1,1) NOT NULL,
	[CREATE_TIME] [datetime] NULL,
	[CONTACT_NAME] [nvarchar](500) NULL,
	[CONTACT_PHONE] [nvarchar](500) NULL,
	[ITEM] [nvarchar](500) NULL,
	[QUANTITY] [int] NULL,
	[STATUS] [nvarchar](100) NULL
);

/*
-- example insert statment
INSERT INTO [ORDER] 
	(
		[CREATE_TIME], [CONTACT_NAME], [CONTACT_PHONE],  [ITEM], [QUANTITY], [STATUS]      
	) 
	VALUES 
	(
		GETDATE(), 'Christopher Sharkey', '1 (516) 965 2497', 'Sushi', 1, 'Delivered'
	);

-- example select
SELECT * FROM [ORDER];

*/
