$(function (){
       
        // parse cookie
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        var contact_name = ca[0].replace("name=","")
        var contact_phone = ca[1].replace(" phone=","") 

        // order details
        var $pizza = $('#pizza');
        var $sushi = $('#sushi');
        var $pasta = $('#pasta');
        var $sandwhich = $('#sandwich');
        var $soda = $('#soda');

        var order_combined = [$pizza, $sushi, $pasta, $sandwhich, $soda];
        var menu = ['Pizza', 'Sushi', 'Pasta', 'Sandwich', 'Soda'];
    
        $('#order').on('submit', function(ev) {
            
            ev.preventDefault();

            var index;

            for (index = 0; index < menu.length; ++index) {

                var ITEM = menu[index];
                var QUANTITY = order_combined[index].val()

                if(QUANTITY > 0) {
    
                    var order = JSON.stringify({
                        "CONTACT_NAME": contact_name,
                        "CONTACT_PHONE": contact_phone,
                        "ITEM": ITEM, 
                        "QUANTITY": QUANTITY,
                        "STATUS": "In cart"
                    });

                    // submit AJAX call
                    $.ajax({
                        type: 'POST',
                        headers: { 
                            'Content-Type': 'application/json'
                        },
                        url: 'https://prod-28.centralus.logic.azure.com:443/workflows/7c1ad9e5dcad4006b753aec1e38a03af/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=s6j6VK6JcnXrxCkz3saCQYWnW4SO6qZRchpdg6aWzMI',
                        data: order,
                        success: function(resp){
                            console.log('success');
                            window.location.href ='cart.html';
                        },
                        error: function() {
                            console.log('error');
                        }
                    });

                    // setTimeout(alert(order), 4000);
                }

            }
    
        });

/*
        var $cart = $('#cart');

        var person = JSON.stringify({
            "CONTACT_NAME": contact_name,
            "CONTACT_PHONE": contact_phone
        });

        $.ajax({
            type: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            url: 'https://prod-00.centralus.logic.azure.com:443/workflows/0274b0815d154d7ba8d196cf673d6f52/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XOQgBWSe8M78klr0B51omcpP1fwlCND-z2lvaiLMdG8',
            data: person,
            success: function(resp){
                
                $.each(resp.Table1, function(i, each) {
                                        
                    var node = document.createElement("li");
                    var textnode = document.createTextNode(each.ITEM + ' | ' + each.QUANTITY);
                    // node.appendChild(textnode);
                    // document.getElementById("cart").appendChild(node);
                    
                });
                
                console.log(resp);
            },
            error: function() {
                alert('error');
            }
        });
*/

});