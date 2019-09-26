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
            url: 'https://prod-31.centralus.logic.azure.com:443/workflows/23df81c62d1d44bda302a21c48a94353/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=un4IehybnRCYypsaIAIsimFBT493NbUieak9HKrEgY8',
            data: person,
            success: function(resp){
                
                $.each(resp.Table1, function(i, each) {
                            
                    var node = document.createElement("li");
                    var textnode = document.createTextNode(each.CREATE_TIME + ' | ' + each.ITEM + ' | ' + each.QUANTITY);
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