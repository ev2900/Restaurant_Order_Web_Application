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
    
    $.ajax({
        type: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        url: 'https://prod-12.centralus.logic.azure.com:443/workflows/623fba687c8a4d9983b03c59c34df6a7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uWI99lT_66N06ix1sNPExq1WHqQ_VS4f57_msIQCSRA',
        data: person,
        success: function(resp){
            
            var html = "";

            $.each(resp.Table1, function(i, each) {
 
                html += '<tr> <td> <br> </td> </tr>';
                html += '<tr> <td> <img src="' + each.IMG_URL + '" alt="Pizza"> </td> </tr>';
                html += '<tr> <td> ' + each.NAME + ' </td> </tr>';
                html += '<tr> <td> Price: $' + each.PRICE + ' </td> </tr>'; 
                html += '<tr> <td> Choose quantity: <input type="number" id="' + each.NAME + '" min="0" max="25" step="1" value="0" </td> </tr>';
    
            });

            // console.log(html);
            $cart.html(html);

        },
        error: function() {
            alert('error');
        }
    });

});