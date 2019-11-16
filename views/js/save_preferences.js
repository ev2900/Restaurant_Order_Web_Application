$(function() {
    $('#SavePreferencesBtn').on('click', function(ev) {
            
        // parse cookie
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        var contact_name = ca[0].replace("name=","")
        var contact_phone = ca[1].replace(" phone=","")
        
        var checkboxValues = [];
        var getOut = false;

        var preference1 = "";
        var preference2 = "";
        var preference3 = "";
        
        $('input[type="checkbox"]:checked').each(function(index, elem) {
            
            var runningLen = checkboxValues.length;

            if(runningLen == 3) {
                alert('You can only select up to 3 preferences');
                getOut = true;
                return;
            }

            switch(index) {
                case 0:
                    preference1 = $(elem).attr('name');
                    break;
                case 1:
                    preference2 = $(elem).attr('name');
                    break;
                case 2:
                    preference3 = $(elem).attr('name');
                    break;
                default:
                    break;
            }
            
            checkboxValues.push($(elem).attr('name'));
        
        });

        if(getOut) {
            return false;
        } else if (checkboxValues === undefined || checkboxValues.length == 0) {
            alert('Please select a preference');
            return false;
        }

        var preferencesToSave = JSON.stringify({
            "NAME": contact_name,
            "PHONE_NUMBER": contact_phone,
            "PREFERENCE_1": preference1,
            "PREFERENCE_2": preference2,
            "PREFERENCE_3": preference3
        });

        // Post to set preferences API:
        $.ajax({
            type: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            url: 'https://prod-29.centralus.logic.azure.com:443/workflows/22e7ea130d444a849dc02b971833a068/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lEWXV42r_15vm7wECTlKgih_kpoIfa9Y3YBSvtPDaog',
            data: preferencesToSave,
            success: function() {
                console.log('success');
                window.location.href = 'cart.html';
            },
            error: function() {
                console.log('error');
            }
        }).error(alert('Success!'));

    });
});