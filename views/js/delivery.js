$('#pay-button').on('click', function(ev) {
    
    // Force Pay Now braintree scrip to wait until release this hold:
    $.holdReady( true );

    // parse cookie
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var contact_name = ca[0].replace("name=","")
    var contact_phone = ca[1].replace(" phone=","")

    // Grab delivery input fields (verify they are actually there)
    var address = $('#inputAddress').val();

    if(address == '') {
        alert("Please enter an address");
        return;
    }

    var addressSecondLine = $('#inputAddress2').val();  // optional
    
    var city = $('#inputCity').val();

    if(city == '') {
        alert("Please enter a city");
        return;
    }

    var state = $( "#inputState option:selected" ).text();

    if(state == 'Choose...') {
        alert("Please select a state");
        return;
    }

    var zip = $('#inputZip').val();

    if(zip == '') {
        alert("Please enter a zip code");
        return;
    }

    var email = $('#inputEmail').val();

    if(email == '') {
        alert("Please enter an email");
        return;
    }

    // Grab order IDs from the receipt
    // Create comma-delimited string to send to delivery table
    var orderId = "";
    $('#receipt li').each(function(index, element) {

         // Skip receipt items that do not have an ID
        if (!$(this).attr('id')) {
            return true;
        }

        orderId += $(this).attr('id') + ", ";

    });

    // remove trailing space and get rid of last comma
    orderId = orderId.trim();
    var orderId = orderId.slice(0, -1);

    // Can now send all data to delivery REST call
    var delivery = JSON.stringify({
        "ORDER_ID": orderId,
        "ADDRESS": address + ", " + addressSecondLine,
        "CITY": city,
        "STATE": state,
        "ZIP": zip,
        "EMAIL": email,
        "STATUS": "COOKING"
    });

    // submit AJAX call
    $.ajax({
        type: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        url: 'https://prod-11.centralus.logic.azure.com:443/workflows/436606720c3e488585465e7aa718b9eb/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xRgjY9nM_7UBhPrHPMjUfAml3hcFkFTKPthR_yDf294',
        data: delivery,
        success: function(resp){
            console.log('success');
        },
        error: function() {
            console.log('error');
        }
    });

    // Release hold for braintree / PayPal to kick off
    $.holdReady( false );
});