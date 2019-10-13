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