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

            // $.each(resp.Table1, function(i, each) {
 
            //     html += '<tr> <td> <br> </td> </tr>';
            //     html += '<tr> <td> <img src="' + each.IMG_URL + '" alt="Pizza"> </td> </tr>';
            //     html += '<tr> <td> Image URL: <input id="menu_pic' + each.ITEM_ID + '" type="text" value="' + each.IMG_URL + '"> </td> </tr>';
            //     html += '<tr> <td> Name: <input id="menu_name' + each.ITEM_ID + '" type="text" value="' + each.NAME + '"> </td> </tr>';
            //     html += '<tr> <td> Price: $ <input id="menu_price' + each.ITEM_ID + '" type="number" min="0" max="1000" step="0.01" value="' + each.PRICE.toFixed(2) + '"> </td> </tr>'; 
            //     html += '<tr> <td> <input id="edit' + each.ITEM_ID + '" class="btn-default submit" type="submit" value="Save"> </td> </tr>';
            //     html += '<tr> <td> <input id="delete' + each.ITEM_ID + '" class="btn-default submit" type="submit" value="Delete"> </td> </tr>';
    
            // });

            html += "<tr>";

            $.each(resp.Table1, function(i, each) {
 
                html += '   <td style="padding: 250px 0 auto; min-width: 200px;"> <img src="' + each.IMG_URL + '" alt="Pizza"> </td>';

            });

            html += '</tr>';

            html += '<tr>';

            $.each(resp.Table1, function(i, each) {

                html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Image URL: <input id="menu_pic' + each.ITEM_ID + '" type="text" value="' + each.IMG_URL + '"> </label> </td>';

            });

            html += '</tr>';

            html += '<tr>';

            $.each(resp.Table1, function(i, each) {

                html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Name: <input id="menu_name' + each.ITEM_ID + '" type="text" value="' + each.NAME + '"> </label> </td>';

            });

            html += '</tr>';

            html += '<tr>';

            $.each(resp.Table1, function(i, each) {

                html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Price: $ <input id="menu_price' + each.ITEM_ID + '" type="number" min="0" max="1000" step="0.01" value="' + each.PRICE.toFixed(2) + '"> </label> </td>'; 

            });

            html += '</tr>';

            html += '<tr>';

            $.each(resp.Table1, function(i, each) {

                html += '   <td> <input id="edit' + each.ITEM_ID + '" class="btn-default submit" type="submit" value="Save"> </td>';

            });

            html += '</tr>';

            html += '<tr>';

            $.each(resp.Table1, function(i, each) {

                html += '   <td> <input id="delete' + each.ITEM_ID + '" class="btn-default submit" type="submit" value="Delete"> </td>';

            });

            html += '</tr>';

            // console.log(html);
            $cart.html(html);

        },
        error: function() {
            alert('error');
        }
    });

});