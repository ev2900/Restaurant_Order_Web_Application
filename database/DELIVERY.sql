-- drop table if exists drop it
IF OBJECT_ID('DELIVERY', 'U') IS NOT NULL DROP TABLE [DELIVERY];

-- create table
CREATE TABLE [dbo].[DELIVERY](
	[DELIVERY_ID] [int] IDENTITY(1,1) NOT NULL,
	[ORDER_ID] [nvarchar](500) NULL,
	[ADDRESS] [nvarchar](500) NULL,
	[CITY] [nvarchar](500) NULL,
	[STATE] [nvarchar](500) NULL,
	[ZIP] [int] NULL,
	[EMAIL] [nvarchar](500) NULL
);