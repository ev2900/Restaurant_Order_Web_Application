CREATE TABLE [dbo].[MENU](
	[ITEM_ID] [int] IDENTITY(1,1) NOT NULL,
	[NAME] [varchar](500) NULL,
	[PRICE] [float] NOT NULL,
	[IMG_URL] [varchar](500) NULL,
	[TYPE] [varchar](max) NULL
)