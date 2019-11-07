$(document).on("click", "[id*='edit']", function() {
    
    // Prepare body of delete call
    var nonNumericId = (this.id).replace(/\D/g,'');
    var id = parseInt(nonNumericId);
    var name = $('#menu_name' + id).val();
    var price = $('#menu_price' + id).val();
    var image = $('#menu_pic' + id).val();

    var menuItemToEdit = JSON.stringify({
        "ITEM_ID": id,
        "NAME": name,
        "PRICE": price,
        "IMG_URL": image
    });

    // Post to delete API:
    $.ajax({
        type: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        url: 'https://prod-27.centralus.logic.azure.com:443/workflows/fc4450c4dc664b0bb24e9695fc5378f9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TkuPLf-YQlLTogQ9M-hkE0FfXEuhjdMXciJtvWyRcWA',
        data: menuItemToEdit,
        success: function(resp){
            console.log('success');
            window.location.href ='edit_menu_item.html';
        },
        error: function() {
            console.log('error');
        }
    });
});