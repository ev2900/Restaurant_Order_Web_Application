
-- create cart view
CREATE VIEW [dbo].[ORDER_DETAILS] 
AS  
SELECT 
	[DELIVERY].[DELIVERY_ID],  
	[DELIVERY].[ADDRESS], 
	[DELIVERY].[CITY], 
	[DELIVERY].[STATE], 
	[DELIVERY].[ZIP], 
	[DELIVERY].[EMAIL],
	[ORDER].[ORDER_ID],
	[ORDER].[CREATE_TIME],
	[ORDER].[CONTACT_NAME],
	[ORDER].[CONTACT_PHONE],
	[ORDER].[ITEM],
	[ORDER].[QUANTITY],
	[ORDER].[STATUS],
	[ORDER].[rv]
FROM 
	[DELIVERY] JOIN [ORDER] ON [DELIVERY].[ORDER_ID] = CONVERT(varchar(500), [ORDER].[ORDER_ID]);
GO