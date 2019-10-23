$(function (){
       
    // parse cookie
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var contact_name = ca[0].replace("name=","")
    var contact_phone = ca[1].replace(" phone=","") 

    var editMenuButton = $('#admin');
    var seeAllOrdersButton = $('#SeeAllOrdersBtn');

    function checkIfAdmin() {
        if(contact_name === "admin" && contact_phone === "999-999-9999") {
            editMenuButton.show();
            seeAllOrdersButton.show();
        } else {
            editMenuButton.hide();
            seeAllOrdersButton.hide();
        }
    }

    checkIfAdmin();

});