$(document).on("click", "[id*='remove-rec']", function() {
    
    // Grab name of menu item
    var menuName = ( this.id ).replace('remove-rec', '');

    // Hide entire class
    $( ".rec-" + menuName ).css( "display", "none" );

    var title = $('#rec-title');
    var recBreak = $('#rec-break');
    
    var haveRecs = false;

    $('#recommendations tr').each(function() { 
        $.each(this.cells, function(){
            if($(this).is(':visible')) {
                haveRecs = true;
                return;
            }
        });
        
        return;  // just need to look in one row
     });

      if(!haveRecs) {
         title.hide();
         recBreak.hide();
     } else {
         title.show();
         recBreak.show();
     }
});