$(function (){
       
    // parse cookie
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var contact_name = ca[0].replace("name=","")
    var contact_phone = ca[1].replace(" phone=","") 

    var button = $('#admin');

    function checkIfAdmin() {
        if(contact_name === "admin" && contact_phone === "999-999-9999") {
            button.show();
        } else {
            button.hide();
        }
    }

    checkIfAdmin();

});