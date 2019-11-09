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

            // Build a horizontal menu for the user to scroll through

            var html = "";

            html += "<tr>";

            $.each(resp.Table1, function(i, each) {

                html += '   <td style="padding: 250px 0 auto; min-width: 200px;"> <img src="' + each.IMG_URL + '" alt="Pizza"> </td>';

            });

            html += '</tr>';

            html += '<tr>';

            $.each(resp.Table1, function(i, each) {

                html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> ' + each.NAME + '</label> </td>';

            });

            html += '</tr>';

            html += '<tr>';

            $.each(resp.Table1, function(i, each) {

                html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Price: $' + each.PRICE + '</label> </td>';

            });

            html += '</tr>';
			 html += '<tr>';

            $.each(resp.Table1, function(i, each) {
				if(i==1)
                html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Calories: 600</label> </td>';
				else if (i==2)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Calories: 400</label> </td>';
			else if (i==3)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Calories: 800 per slice</label> </td>';
			else if (i==4)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Calories: 450</label> </td>';
			else if (i==5)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Calories: 200</label> </td>';
			else if (i==0)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Calories: 300 </label> </td>';
            });

            html += '</tr>';
			 html += '<tr>';

            $.each(resp.Table1, function(i, each) {

               if(i==1)
                html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Ingredients: Tomato, Ham, Whole Wheat, Lettuce</label> </td>';
				else if (i==2)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Ingredients: Carbonated water, Corn syrup, Phosphoric acid, Caffeine</label> </td>';
			else if (i==3)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Ingredients: Dough, Chesse, Pepperoni, Tomato sauce</label> </td>';
			else if (i==4)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Ingredients: lobster tail, Butter, Garlic powder, Lemon</label> </td>';
			else if (i==5)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Ingredients: Rice, Nori, Avocado, Soy sauce, Sesame, Rice vinegar</label> </td>';
			else if (i==0)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Ingredients: Eggs, Sugar, Cream, Vanila</label> </td>';
            });
			 html += '</tr>';
			 html += '<tr>';

            $.each(resp.Table1, function(i, each) {

              if(i==1)
                html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Guidance: diet is based on 2,000 calories a day </label> </td>';
				else if (i==2)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Guidance: diet is based on 2,000 calories a day </label> </td>';
			else if (i==3)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Guidance: diet is based on 2,000 calories a day </label> </td>';
			else if (i==4)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Guidance: diet is based on 2,000 calories a day </label> </td>';
			else if (i==5)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Guidance: diet is based on 2,000 calories a day </label> </td>';
			else if (i==0)
				html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Guidance: diet is based on 2,000 calories a day </label> </td>';

            });

            html += '</tr>';

            html += '<tr>';

            $.each(resp.Table1, function(i, each) {

                html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> Choose quantity: <input type="number" id="' + each.NAME + '" min="0" max="25" step="1" value="0"> </label> </td>';

            });

            html += '</tr>';

            html += '<tr>';

            $.each(resp.Table1, function(i, each) {

                html += '   <td> <label style="padding: 100px 0 auto; background-color: rgb(97, 71, 6);"> <a id="review ' + each.ITEM_ID + '" href="#"> See review(s) </a> </label> </td>';

            });

            html += '</tr>';

            $cart.html(html);

        },
        error: function() {
            alert('error');
        }
    });

});
