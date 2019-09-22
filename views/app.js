let order = document.getElementById("orderConfirmation")
order.addEventListener("click", function(){
fetch('https://prod-28.centralus.logic.azure.com:443/workflows/7c1ad9e5dcad4006b753aec1e38a03af/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=s6j6VK6JcnXrxCkz3saCQYWnW4SO6qZRchpdg6aWzMI',{
  method: 'POST',
  body: JSON.stringify({
    "CONTACT_NAME": "Eslam Amin",
        "CONTACT_PHONE": "1 505-615-8113",
        "ITEM_1": "Beef",
        "ITEM_2": "Sandwich",
        "ITEM_3": "Salad",
        "ITEM_4": "Soda",
        "ITEM_5": "Desert",
        "QUANTITY_1": 1,
        "QUANTITY_2": 2,
        "QUANTITY_3": 1,
        "QUANTITY_4": 4,
        "QUANTITY_5": 2,
        "STATUS": "In progress"
}),
headers: {
  "Content-Type":"application/json; charset=UTF-8"
}
}).then(function(response){
   return response.json()
}).then(function(json){
  console.log(json)
})
})
