
CREATE PROCEDURE [dbo].[UPDATE_CART_STATUS] @contact_name varchar(500), @contact_phone varchar(500)
AS

	UPDATE [ORDER] SET [STATUS] = 'Cooking' WHERE [STATUS] = 'In cart' AND [CONTACT_NAME] = @contact_name AND [CONTACT_PHONE] = @contact_phone;

GO