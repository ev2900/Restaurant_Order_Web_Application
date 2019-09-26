// set cookie
$(function (){

    var $name = $('#name');
    var $phone = $('#phone');

    $('#log-in').on('submit', function(ev) {
 
        document.cookie = "name=" + $name.val() + ";path=/";
        document.cookie = "phone=" + $phone.val() + ";path=/";

    });

    // if already logged in the go right to your cart
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var contact_name = ca[0].replace("name=","")
    var contact_phone = ca[1].replace(" phone=","")

    if (contact_name) {
        location = 'cart.html';
    };

});
