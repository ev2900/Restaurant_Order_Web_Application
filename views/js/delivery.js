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
    var email = $('#inputEmail').val();

    // Grab order IDs from the receipt
    var orderIds = new Array();
    $('#receipt li').each(function(index, element) {

         // Skip receipt items that do not have an ID
        if (!$(this).attr('id')) {
            return true;
        }

        var orderId = $(this).attr('id');

        orderIds.push(orderId);

    });

    // Loop on order IDs to send each delivery 
    // NOTE: This is a hack for now until a cart has its own order ID 
    // instead of each cart item having an order ID.
    $.each(orderIds, function(i, each) {
        // alert(each);
    });

    // Release hold for braintree / PayPal to kick off
    $.holdReady( false );
});