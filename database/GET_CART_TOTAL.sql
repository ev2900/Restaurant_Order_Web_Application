
CREATE PROCEDURE [dbo].[GET_CART_TOTAL] @contact_name varchar(500), @contact_phone varchar(500)
AS

	DECLARE @Total int;

	DECLARE @Pizza int;
	DECLARE @Sushi int;
	DECLARE @Pasta int;
	DECLARE @Sandwich int;
	DECLARE @Soda int;

	SET @Pizza = (SELECT COUNT([ITEM]) FROM [dbo].[CART] WHERE [CONTACT_NAME] = @contact_name AND [CONTACT_PHONE] = @contact_phone AND [ITEM] = 'Pizza');
	SET @Sushi = (SELECT COUNT([ITEM]) FROM [dbo].[CART] WHERE [CONTACT_NAME] = @contact_name AND [CONTACT_PHONE] = @contact_phone AND [ITEM] = 'Sushi');
	SET @Pasta = (SELECT COUNT([ITEM]) FROM [dbo].[CART] WHERE [CONTACT_NAME] = @contact_name AND [CONTACT_PHONE] = @contact_phone AND [ITEM] = 'Pasta');
	SET @Sandwich = (SELECT COUNT([ITEM]) FROM [dbo].[CART] WHERE [CONTACT_NAME] = @contact_name AND [CONTACT_PHONE] = @contact_phone AND [ITEM] = 'Sandwich');
	SET @Soda = (SELECT COUNT([ITEM]) FROM [dbo].[CART] WHERE [CONTACT_NAME] = @contact_name AND [CONTACT_PHONE] = @contact_phone AND [ITEM] = 'Soda');

	SET @Total = (@Pizza * 12) + (@Sushi * 8) + (@Pasta * 9) + (@Sandwich * 7) + (@Soda * 1);

	SELECT @Total AS 'total';
GO
