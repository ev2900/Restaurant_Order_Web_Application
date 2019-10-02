$(function (){
       
    // parse cookie
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var contact_name = ca[0].replace("name=","")
    var contact_phone = ca[1].replace(" phone=","")
    
    // Build array of order data (prices are static for now)
    var orders = [
        {item:"Pizza", quantity:$('#pizza'), price:12},
        {item:"Sushi", quantity:$('#sushi'), price:8},
        {item:"Pasta", quantity:$('#pasta'), price:9},
        {item:"Sandwich", quantity:$('#sandwich'), price:7},
        {item:"Soda", quantity:$('#soda'), price:1}
    ];

    $('#payment').on('click', function(ev) {
        
        ev.preventDefault();

        // Price per item shown on bill
        var receipt = "Thank you for your order from Online Cafeteria. You purchased the following items <br><br> ";

        // sum of prices before tax
        var subTotal = 0;

        // Tax is 7%
        const tax = 1.07;

        // Loop through active orders to build receipt and subtotal
        for(var order of orders) {
            // alert(order.quantity.val());
            if(order.quantity.val() > 0) {
                var itemPrice = order.price * order.quantity.val();

                var receipt = receipt.concat(order.item + " $" + order.price + " <br> ");

                subTotal = subTotal + itemPrice;
            }
        }

        var receipt = receipt.concat("----- <br> Subtotal: $" + subTotal + " <br> ");
        
        // Use tax to calculate total and append to receipt
        var total = subTotal * tax;
        var receipt = receipt.concat("Total: $" + total.toFixed(2) + " <br><br> Thank you for your purchase!");
        var orderId = 99;
        var email = "mpistacchio77@gmail.com";

        // Can now make email JSON
        var email_receipt = JSON.stringify({
            "TO": email,
            "SUBJECT": "Email Receipt Order #" + orderId,
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