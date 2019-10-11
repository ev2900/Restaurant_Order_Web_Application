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

        $.ajax({
            type: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            url: 'https://prod-10.centralus.logic.azure.com:443/workflows/06deabfdd9874a478922439c097a6ac5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YTLC6ocCOCmjtFW_4OH67zob5Qfm0SDgUeIJQGCvmac',
            data: person,
            success: function(resp){
                
                $.each(resp.Table1, function(i, each) {
                                        
                    // var node = document.createElement("h2");
                    
                    // var textnode = document.createTextNode("Your order total is: $" + each.total);
                    // node.appendChild(textnode);
                    
                    // document.getElementById("cart").appendChild(node);

                    $(':hidden').val(each.total);

                });
                
                console.log(resp);
            },
            error: function() {
                alert('error');
            }
        });

});