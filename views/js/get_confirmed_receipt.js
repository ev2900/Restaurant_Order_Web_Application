$(function (){
       
    $.holdReady( true );

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

    // build price map from get menu call
    var priceMap = {};

    $.ajax({
        type: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        url: 'https://prod-12.centralus.logic.azure.com:443/workflows/623fba687c8a4d9983b03c59c34df6a7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uWI99lT_66N06ix1sNPExq1WHqQ_VS4f57_msIQCSRA',
        data: person,
        success: function(resp){
            
            $.each(resp.Table1, function(i, each) {

                priceMap[each.NAME] = each.PRICE;

            });
                    
        },
        error: function() {
            alert('error');
        }
    }).then(function() {

        const tax = 1.07;
        
        // get cart to create receipt
        $.ajax({
            type: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            url: 'https://prod-28.centralus.logic.azure.com:443/workflows/dfc9c8d5d66f4de4bb624ee5a028313c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8Ol6v5iRX72ZyaptoqnaDjw9A-QZk2vmC3LxoRusw2Q',
            data: person,
            success: function(resp){
    
                var subTotal = 0;
    
                var $receiptList = $('#receipt');
    
                var $receiptTitle = $('<li> Your receipt: <br> </li>');
                $receiptList.append($receiptTitle);
    
                var combinedOrderID = "";
                
                $.each(resp.Table1, function(i, each) {
    
                    var name = each.ITEM;
    
                    if(priceMap[name]) {
                        var price = priceMap[name];
                        var itemizedPrice = each.QUANTITY * price;
    
                        subTotal = subTotal + itemizedPrice;
    
                        var $receiptEntry = $('<li id="' + each.ORDER_ID + '"> ' + each.QUANTITY + " x " + each.ITEM + "...............$" + parseFloat(itemizedPrice).toFixed(2) + '<br> </li>');
                        
                        $receiptList.append($receiptEntry);
    
                        combinedOrderID += each.ORDER_ID;
                    } else {
                        alert("Price map [" + name + "] undefined");
                    }
                });
    
                var total = subTotal * tax;
    
                var $divider = $('<li> ----------------- <br> </li>');
                $receiptList.append($divider);
    
                var $receiptSubtotal = $('<li> Subtotal: $' + parseFloat(subTotal).toFixed(2) + ' <br> </li>');
                $receiptList.append($receiptSubtotal);
    
                var $receiptTotal = $('<li> Total: $' + parseFloat(total).toFixed(2) +  '<br> </li>');
                
                $receiptList.append($receiptTotal);
    
                var $orderIdBit = $('<li style="display:none;"> Order ID: ' + combinedOrderID + '<br> </li>');
                $receiptList.append($orderIdBit);
    
                console.log(resp);
            },
            error: function() {
                alert('error');
            }
        });
    }).then( function() {
        // clear cart
        $.ajax({
            type: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            url: 'https://prod-07.centralus.logic.azure.com:443/workflows/8c248de2db134a2c92af65bd9a17b07f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Wd3S1SPqQp76ixecNkL-1MQ6BlTOud7ebaPMbmmrHWM',
            data: person,
            success: function(resp) {
                console.log(resp);
            },
            error: function() {
                alert('error');
            }
        });
    });
    
    $.holdReady( false );

});
