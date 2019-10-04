$(function (){
       
    // parse cookie
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var contact_name = ca[0].replace("name=","")
    var contact_phone = ca[1].replace(" phone=","")
    
    var email = $('#email');

    var orderId = "";

    $('#send').on('click', function(ev) {

        $(window).trigger('resize');
        
        ev.preventDefault();

        var receipt = "Thank you for your order from Online Cafeteria.<br><br>";

        // build receipt to email from receipt on page:
        var set = $('#receipt li');
        var length = set.length;
        set.each( function(index) {
            receipt += $( this ).text() + "<br>";

            if(index === length - 1) {
                orderId = $( this ).text();
            }
        });

        var receipt = receipt.concat("<br>Thank you for your purchase!<br><br>See you next time,<br><br>Online Cafeteria");

        // Can now make email JSON
        var email_receipt = JSON.stringify({
            "TO": email.val(),
            "SUBJECT": "Email Receipt " + orderId,
            "BODY": receipt
        });

        // submit AJAX call
        $.ajax({
            type: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            url: 'https://prod-31.centralus.logic.azure.com:443/workflows/26c898759c6a4faeab672826ebb9f265/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=L01OFr7RI1bPta2kZG7fizRRqhIzQBAzjYq8GeqOiEM',
            data: email_receipt,
            success: function(resp){
                console.log('success');
                window.location.href ='cart.html';
            },
            error: function() {
                console.log('error');
            }
        });

    });

});