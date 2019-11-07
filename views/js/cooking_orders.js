$(function (){

    // parse cookie
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    // var contact_name = ca[0].replace("name=","")
    // var contact_phone = ca[1].replace(" phone=","")

    var person = JSON.stringify({});

    $.ajax({
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        url: 'https://prod-18.centralus.logic.azure.com:443/workflows/3a618db37be24d09a3258cb3aaac849e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LJ22S6TLL0-HIgBcCyzuPFBlgBqaKeoK8YPc41VyD-w',
        data: person,
        success: function(resp){
            var node = document.createElement("tbody");
            $.each(resp.Table1, function(i, each) {
                var c, r;
                r = node.insertRow(0);
                c = r.insertCell(0);
                c.innerHTML = each.ORDER_ID;
                c = r.insertCell(1);
                c.innerHTML = each.CONTACT_NAME;
                c = r.insertCell(2);
                c.innerHTML = each.CONTACT_PHONE;
                c = r.insertCell(3);
                c.innerHTML = each.ITEM;
                c = r.insertCell(4);
                c.innerHTML = each.QUANTITY;
                c = r.insertCell(5);
                c.innerHTML = each.CREATE_TIME;
                c = r.insertCell(6);
                c.innerHTML = each.STATUS;
            });
            document.getElementById("Tableorders").appendChild(node);

            console.log(resp);
        },
        error: function() {
            alert('error');
        }
    });
});