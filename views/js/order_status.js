$(function (){
       
        // parse cookie
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        var contact_name = ca[0].replace("name=","")
        var contact_phone = ca[1].replace(" phone=","") 

        var $cart = $('#order_status');

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
                    var textnode = document.createTextNode("Item: " + each.ITEM + '\n' + "Status: " + each.STATUS + "\n\n");
                    node.appendChild(textnode);
                    document.getElementById("cart").appendChild(node);

                });
                
                console.log(resp);
            },
            error: function() {
                alert('error');
            }
        });

});