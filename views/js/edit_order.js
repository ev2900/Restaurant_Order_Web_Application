function deleteOrder(){
    var orderToDelete = JSON.stringify({
        "ORDER_ID": this.id
    });

    // submit AJAX call
    $.ajax({
        type: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        url: 'https://prod-11.centralus.logic.azure.com:443/workflows/3db59ce21d324c7d8a21e69a2f24ddf7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HyCGNasa6QEMTNfYyrDh4qTquA8UhytkmyIiEdVlbQU',
        data: orderToDelete,
        success: function(resp){
            console.log('success');
            window.location.href ='cart.html';
        },
        error: function() {
            console.log('error');
        }
    });
}

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

        // Call for GET cart
        $.ajax({
            type: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            url: 'https://prod-28.centralus.logic.azure.com:443/workflows/dfc9c8d5d66f4de4bb624ee5a028313c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8Ol6v5iRX72ZyaptoqnaDjw9A-QZk2vmC3LxoRusw2Q',
            data: person,
            success: function(resp){
                
                $.each(resp.Table1, function(i, each) {
                                        
                    var node = document.createElement("li");
                    
                    // Line break between each item:
                    var lineBreak = document.createElement("br");
                    node.appendChild(lineBreak);
                    
                    // Listed cart item
                    var textnode = document.createTextNode("Item: " + each.ITEM + "\n" + "Quantity: " + each.QUANTITY + "\n");
                    node.appendChild(textnode);

                    // Create delete button to be next to cart item
                    var delButton = document.createElement("input");
                    delButton.type = "submit";
                    delButton.value = "Delete";
                    delButton.id = each.ORDER_ID;
                    delButton.onclick = deleteOrder;
                    node.appendChild(delButton);

                    document.getElementById("cart").appendChild(node);

                });
                
                console.log(resp);
            },
            error: function() {
                alert('error');
            }
        });

});