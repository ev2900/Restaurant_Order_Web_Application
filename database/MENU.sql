
-- drop table if exists drop it
IF OBJECT_ID('MENU', 'U') IS NOT NULL DROP TABLE [MENU];

-- create table
CREATE TABLE [dbo].[MENU](
	[ITEM_ID] [int] IDENTITY(1,1) NOT NULL,
	[NAME] [varchar](500) NULL,
	[PRICE] [FLOAT] NOT NULL,
	[IMG_URL] [varchar](500)
) ON [PRIMARY]
GO

/*
-- example insert statment
INSERT INTO [MENU] 
	(
		[NAME], [PRICE], [IMG_URL]      
	) 
	VALUES 
	(
		'Soda', 1, ' '
	);

-- example select
SELECT * FROM [MENU];
*/
