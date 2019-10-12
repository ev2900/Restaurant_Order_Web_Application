$(function (){
       
    // parse cookie
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var contact_name = ca[0].replace("name=","");
    var contact_phone = ca[1].replace(" phone=","");

    // get menu
    var person = JSON.stringify({
        "CONTACT_NAME": contact_name,
        "CONTACT_PHONE": contact_phone
    });

    var menu = []

    $.ajax({
        type: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        url: 'https://prod-12.centralus.logic.azure.com:443/workflows/623fba687c8a4d9983b03c59c34df6a7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uWI99lT_66N06ix1sNPExq1WHqQ_VS4f57_msIQCSRA',
        data: person,
        success: function(resp){
                   
            $.each(resp.Table1, function(i, each) {

                menu.push(each.NAME);

            });
                    
        },
        error: function() {
            alert('error');
        }
    });

    console.log(menu)

    $('#order').on('submit', function(ev) {
        
        // var menu = ['Pizza', 'Sushi', 'Pasta', 'Sandwich', 'Soda'];

        var order_combined = []

        for (index = 0; index < menu.length; ++index) {
            
            var itemm = menu[index];
            order_combined.push(document.getElementById(itemm).value);

        };

        /*
        var $pizza = document.getElementById('Pizza').value;
        var $sushi = document.getElementById('Sushi').value;
        var $pasta = document.getElementById('Pasta').value;
        var $sandwhich = document.getElementById('Sandwich').value;
        var $soda = document.getElementById('Soda').value;
        
        var order_combined = [$pizza, $sushi, $pasta, $sandwhich, $soda];
        */

        console.log(order_combined);

        ev.preventDefault();
        
        var index;

        for (index = 0; index < menu.length; ++index) {

            var ITEM = menu[index];
            var QUANTITY = order_combined[index]

            //console.log(ITEM);
            //console.log(QUANTITY);

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
                        // setTimeout(6000);
                        window.location.href ='cart.html';
                    },
                    error: function() {
                        console.log('error');
                        // setTimeout(6000);
                    }
                });

               
            }

        }

    });

});