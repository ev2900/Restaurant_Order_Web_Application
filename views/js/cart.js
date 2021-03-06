$(function (){
       
        // parse cookie
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        var contact_name = ca[0].replace("name=","")
        var contact_phone = ca[1].replace(" phone=","") 

        var $cart = $('#cart');

        var person = JSON.stringify({
            "CONTACT_NAME": contact_name,
            "CONTACT_PHONE": contact_phone
        });

        var cartItemList = [];

        $.ajax({
            type: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            url: 'https://prod-28.centralus.logic.azure.com:443/workflows/dfc9c8d5d66f4de4bb624ee5a028313c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8Ol6v5iRX72ZyaptoqnaDjw9A-QZk2vmC3LxoRusw2Q',
            data: person,
            success: function(resp){
                
                // Move on if our cart table does not exist
                if(resp.Table1 === undefined) {
                    return;
                }

                $.each(resp.Table1, function(i, each) {
                                        
                    var node = document.createElement("li");
                    
                    var textnode = document.createTextNode("Item: " + each.ITEM + "\n" + "Quantity: " + each.QUANTITY + "\n\n");
                    node.appendChild(textnode);
                    
                    document.getElementById("cart").appendChild(node);

                    cartItemList.push(each.ITEM);

                });
                
                console.log(resp);

            },
            error: function() {
                alert('error');
            }
        }).then(function() {

            var placeOrderButton = $('#PlaceOrderBtn');
            var editCartButton = $('#EditCartBtn');
            
            if(cartItemList.length == 0) {
                
                // Hide the place order and edit cart buttons
                placeOrderButton.hide();
                editCartButton.hide();

                // Change header
                var cartLabel = $('#cart_label');
                cartLabel.text("Your cart is currently empty!");

            } else {
                
                placeOrderButton.show();
                editCartButton.show();

            }
        });

});