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
            url: 'https://prod-00.centralus.logic.azure.com:443/workflows/0274b0815d154d7ba8d196cf673d6f52/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XOQgBWSe8M78klr0B51omcpP1fwlCND-z2lvaiLMdG8',
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
                    c = r.insertCell(7);
                    c.innerHTML = '<a href="javascript:void(0);" class="openDialog" data-id="'+each.ORDER_ID+'" data-toggle="modal" data-target="#EditOrderModal"><i class="fa fa-edit"></i></a>';
                });
                document.getElementById("Tableorders").appendChild(node);
                
                console.log(resp);
            },
            error: function() {
                alert('error');
            }
        });

        $(document).on("click", ".openDialog", function () {
            var orderId = $(this).data('id');
            // console.log(orderId)
            $(".modal-header #orderID").html(orderId);
        });

        $('#EditOrderStatus').on('submit', function(ev) {
            
            ev.preventDefault();

            var order_id = document.getElementById("orderID").innerHTML;
            var status = document.getElementById("Editstatus").value;

            // console.log(order_id);
            // console.log(status);
            var order = JSON.stringify({
                "ORDER_ID": order_id,
                "STATUS": status
            });

            // submit AJAX call
            $.ajax({
                type: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                url: 'https://prod-07.centralus.logic.azure.com:443/workflows/13f040afcae841729f6d0bbc86569b3b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Yi5sN1m8KpOGeLFKfInVuSlSOOH5tGybMXzDobc4-NQ',
                data: order,
                success: function(resp){
                    console.log('success');
                    window.location.href = window.location.href;
                },
                error: function() {
                    console.log('error');
                }
            });

        });
});