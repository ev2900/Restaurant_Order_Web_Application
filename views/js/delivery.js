$('#pay-button').on('click', function(ev) {
    
    // Force Pay Now braintree scrip to wait until release this hold:
    $.holdReady( true );

    // parse cookie
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var contact_name = ca[0].replace("name=","")
    var contact_phone = ca[1].replace(" phone=","")

    // Grab delivery input fields
    var address = $('#inputAddress').val();
    var addressSecondLine = $('#inputAddress2').val();
    var city = $('#inputCity').val();
    var state = $( "#inputState option:selected" ).text();
    var zip = $('#inputZip').val();

    // Grab order IDs from the receipt

    // Release hold for braintree / PayPal to kick off
    $.holdReady( false );
});