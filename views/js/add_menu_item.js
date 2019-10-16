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

    $('#order').on('submit', function(ev) {
        
        ev.preventDefault();

        var name = document.getElementById("name").value;
        var price = document.getElementById("price").value;
        var img_url = document.getElementById("img_url").value;

        console.log(name);
        console.log(price);
        console.log(img_url);

        //setTimeout(6000);

        var menu_item = JSON.stringify({
            "PRICE": price,
            "NAME": name,
            "IMG_URL": img_url
        });

        // submit AJAX call
        $.ajax({
            type: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            url: 'https://prod-01.centralus.logic.azure.com:443/workflows/d3de08d451b0408092d99588c50f77e9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dKf4p5azWX8523XzB0DxFldHUIZvBzJp0J_uoEj3mCI',
            data: menu_item,
            success: function(resp){
            console.log('success');
                // setTimeout(6000);
                window.location.href ='edit_menu_item.html';
            },
            error: function() {
                console.log('error');
                // setTimeout(6000);
            }
        });

    });
    
});