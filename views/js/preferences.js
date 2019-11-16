$(function (){

    // parse cookie
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var contact_name = ca[0].replace("name=","")
    var contact_phone = ca[1].replace(" phone=","")

    var $preferences = $('#preferences');

    var person = JSON.stringify({
        "CONTACT_NAME": contact_name,
        "CONTACT_PHONE": contact_phone
    });

    // Build list of preferences from the menu types we have
    $.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        url: 'https://prod-12.centralus.logic.azure.com:443/workflows/623fba687c8a4d9983b03c59c34df6a7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uWI99lT_66N06ix1sNPExq1WHqQ_VS4f57_msIQCSRA',
        data: person,
        success: function(resp){

            var html = "";

            var availablePreferences = [];

            $.each(resp.Table1, function(i, each) {

                // Skip types we have already listed
                if(availablePreferences.includes(each.TYPE)) {
                    return;
                }

                availablePreferences.push(each.TYPE);
                html += '<li style="background-color: rgb(97, 71, 6);"> <input type="checkbox" style="width: 40px; height: 40px;" name="' + each.TYPE + '"> <h3> ' + each.TYPE + ' </h3> </li>';

            });

            $preferences.html(html);

        },
        error: function() {
            alert('error');
        }
    });
});
