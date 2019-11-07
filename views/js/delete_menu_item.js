$(document).on("click", "[id*='delete']", function() {
    
    // Prepare body of delete call
    var nonNumericId = (this.id).replace(/\D/g,'');
    var id = parseInt(nonNumericId);
    var menuItemToDelete = JSON.stringify({
        "MENU_ID": id
    });

    // Post to delete API:
    $.ajax({
        type: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        url: 'https://prod-08.centralus.logic.azure.com:443/workflows/ab925bf6b570496daebed5a476b24610/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Cj9ue5JOrGACh1Fs0jnAliEvQ5uPSbEsonooAgunhNE',
        data: menuItemToDelete,
        success: function(resp){
            console.log('success');
            window.location.href ='edit_menu_item.html';
        },
        error: function() {
            console.log('error');
        }
    });
});