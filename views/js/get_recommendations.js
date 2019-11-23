$(function (){

    // parse cookie
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var contact_name = ca[0].replace("name=","")
    var contact_phone = ca[1].replace(" phone=","")

    var $recommendations = $('#recommendations');

    var html = "";

    var person = JSON.stringify({
        "CONTACT_NAME": contact_name,
        "CONTACT_PHONE": contact_phone
    });

    // First grab preferences (the user's preferred menu types)
    var preferences = [];

    // Get all user preferences
    $.ajax({
        type: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        url: 'https://prod-28.centralus.logic.azure.com:443/workflows/5094a195e6c2461ba11d79963be01e22/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZlkhUXMtwWoJi3A31RdA_icTEFs3SCHIUBtlXQqgy7E',
        data: person,
        success: function(resp){

            // Reverse sort the response so we get the latest data
            var preferenceQuery = resp.value;
            var reversedPreferenceData = [];

            var preferenceQueryLength = preferenceQuery.length;

            while( preferenceQueryLength-- ) {
                if( preferenceQuery[preferenceQueryLength] !== undefined ) {
                    reversedPreferenceData.push(preferenceQuery[preferenceQueryLength]);
                }
            }

            $.each(reversedPreferenceData, function(i, latestPreferenceData) {

                // Skip if we are not on the current user or we have already grabbed the latest valid data
                if(latestPreferenceData.NAME != contact_name || latestPreferenceData.PHONE_NUMBER != contact_phone || preferences.length > 0) {
                    return;
                }

                if(latestPreferenceData.PREFERENCE_1 != "") {
                
                    preferences.push(latestPreferenceData.PREFERENCE_1);
                
                }

                if(latestPreferenceData.PREFERENCE_2 != "") {
                
                    preferences.push(latestPreferenceData.PREFERENCE_2);
                
                }
                
                if(latestPreferenceData.PREFERENCE_3 != "") {
                
                    preferences.push(latestPreferenceData.PREFERENCE_3);
                
                }

            });
                    
        },
        error: function() {
            alert('error');
        }
    }).then(function() {

        $.ajax({
            type: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            url: 'https://prod-12.centralus.logic.azure.com:443/workflows/623fba687c8a4d9983b03c59c34df6a7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uWI99lT_66N06ix1sNPExq1WHqQ_VS4f57_msIQCSRA',
            data: person,
            success: function(resp){
                
                // Check if user does not have preferences set
                if(preferences.length == 0) {

                    // Hide title / line break
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

                } else {

                    // Build a horizontal recommendation view similar to the menu for the user to scroll through

                    html += "<tr>";

                    $.each(resp.Table1, function(i, each) {

                        // Skip menu items whose type the user does not prefer
                        if(!preferences.includes(each.TYPE)) {
                            return;
                        }

                        html += '   <td class="rec-' + each.NAME + '" style="padding: 250px 0 auto; min-width: 200px;"> <img src="' + each.IMG_URL + '" alt="Pizza"> </td>';

                    });

                    html += '</tr>';

                    html += '<tr>';

                    $.each(resp.Table1, function(i, each) {

                        // Skip menu items whose type the user does not prefer
                        if(!preferences.includes(each.TYPE)) {
                            return;
                        }

                        html += '   <td class="rec-' + each.NAME + '"> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> ' + each.NAME + '</label> </td>';

                    });

                    html += '</tr>';

                    html += '<tr>';
        
                    $.each(resp.Table1, function(i, each) {

                        // Skip menu items whose type the user does not prefer
                        if(!preferences.includes(each.TYPE)) {
                            return;
                        }
        
                        html += '   <td class="rec-' + each.NAME + '"> <input id="remove-rec' + each.NAME + '" class="btn-default submit" type="submit" value="No thanks!"> </td>';
        
                    });
        
                    html += '</tr>';

                    $recommendations.html(html);

                }
                        
            },
            error: function() {
                alert('error');
            }
        });
    });

});
