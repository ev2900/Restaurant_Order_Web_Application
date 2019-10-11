# Restaurant Order Web Application
SWENG 894 Capstone Project. Application is hosted at **[www.onlinecafeteria.com](http://www.onlinecafeteria.com/)**

## Front End (User Interface)
The front end of the application has the following page 

* cart
* index
* order_history
* order_status
* place_order
* edit_order
* payment
* order confirmation

## Middleware (Application Programming Interfaces)
The following section provides an example(s) request for each API end point.

### Create Order 
```
Http verb: POST
Url: https://prod-28.centralus.logic.azure.com:443/workflows/7c1ad9e5dcad4006b753aec1e38a03af/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=s6j6VK6JcnXrxCkz3saCQYWnW4SO6qZRchpdg6aWzMI
Headers:'Content-Type': 'application/json'
Body (example):
{
    "CONTACT_NAME": "William Smith",
    "CONTACT_PHONE": "1 (912) 234 3456",
    "ITEM": "Pineapple",
    "QUANTITY": 1,
    "STATUS": "In cart"
}
Response (example):
{
    "@odata.context": "https://sql-cus.azconn-cus.p.azurewebsites.net/v2/$metadata#datasets('restaurant546.database.windows.net%2Crestaurant')/tables('%255Bdbo%255D.%255BORDER%255D')/items/$entity",
    "@odata.etag": "",
    "ItemInternalId": "e3c3e3a3-1e06-49ab-932d-226e32806f0d",
    "ORDER_ID": 12,
    "CREATE_TIME": "2019-09-24T19:51:36.6630000",
    "CONTACT_NAME": "William Smith",
    "CONTACT_PHONE": "1 (912) 234 3456",
    "ITEM": "Pineapple",
    "QUANTITY": 1,
    "STATUS": "In cart"
}  
```

### Get Cart 
```
Http verb: POST
Url: https://prod-28.centralus.logic.azure.com:443/workflows/dfc9c8d5d66f4de4bb624ee5a028313c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8Ol6v5iRX72ZyaptoqnaDjw9A-QZk2vmC3LxoRusw2Q
Headers:'Content-Type': 'application/json'
Body (example):
{
    "CONTACT_NAME": "William Smith",
    "CONTACT_PHONE": "1 (912) 234 3456"
}
Response (example):
{
    "OutputParameters": {},
    "ResultSets": {
        "Table1": [
            {
                "ORDER_ID": 10,
                "CREATE_TIME": "2019-09-24T18:37:07.76",
                "CONTACT_NAME": "William Smith",
                "CONTACT_PHONE": "1 (912) 234 3456",
                "ITEM": "Pineapple",
                "QUANTITY": 1,
                "STATUS": "In cart"
            }
        ]
    }
}
```

### Get Order
```
Http verb: POST
Url: https://prod-00.centralus.logic.azure.com:443/workflows/0274b0815d154d7ba8d196cf673d6f52/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XOQgBWSe8M78klr0B51omcpP1fwlCND-z2lvaiLMdG8
Headers:'Content-Type': 'application/json'
Body (example):
{
    "CONTACT_NAME": "William Smith",
    "CONTACT_PHONE": "1 (912) 234 3456"
}
Response (example):
{
    "OutputParameters": {},
    "ResultSets": {
        "Table1": [
            {
                "ORDER_ID": 13,
                "CREATE_TIME": "2019-09-24T20:32:23.167",
                "CONTACT_NAME": "William Smith",
                "CONTACT_PHONE": "1 (912) 234 3456",
                "ITEM": "Pasta",
                "QUANTITY": 1,
                "STATUS": "Cooking"
            },
            {
                "ORDER_ID": 14,
                "CREATE_TIME": "2019-09-24T20:33:19.77",
                "CONTACT_NAME": "William Smith",
                "CONTACT_PHONE": "1 (912) 234 3456",
                "ITEM": "Hamburger",
                "QUANTITY": 1,
                "STATUS": "Out for delivery"
            }
        ]
    }
}
```

### Get History 
```
Http verb: POST
Url: https://prod-31.centralus.logic.azure.com:443/workflows/23df81c62d1d44bda302a21c48a94353/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=un4IehybnRCYypsaIAIsimFBT493NbUieak9HKrEgY8
Headers:'Content-Type': 'application/json'
Body (example):
{
    "CONTACT_NAME": "William Smith",
    "CONTACT_PHONE": "1 (912) 234 3456"
}
Response (example):
{
    "OutputParameters": {},
    "ResultSets": {
        "Table1": [
            {
                "ORDER_ID": 15,
                "CREATE_TIME": "2019-09-24T20:33:53.883",
                "CONTACT_NAME": "William Smith",
                "CONTACT_PHONE": "1 (912) 234 3456",
                "ITEM": "Fruit",
                "QUANTITY": 1,
                "STATUS": "Delivered"
            }
        ]
    }
}
```

### Delete Order 
```
Http verb: POST
Url: https://prod-11.centralus.logic.azure.com:443/workflows/3db59ce21d324c7d8a21e69a2f24ddf7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HyCGNasa6QEMTNfYyrDh4qTquA8UhytkmyIiEdVlbQU 
Headers:'Content-Type': 'application/json'
Body (example):
{
	"ORDER_ID": 28
}
Response (example):
{
    "status": "success"
}
```

### Edit Order 
```
Http verb: POST
Url: https://prod-01.centralus.logic.azure.com:443/workflows/706e96b0172549f988570b5016599d0a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=O-ALExSXWm7vYGkJXcuGmiYfCumrctb3QqgCuu7fglM
Headers:'Content-Type': 'application/json'
Body (example): 
{
	"ORDER_ID": 24,
	"ITEM":"Pizza",
	"QUANTITY":"1",
	"STATUS":"In cart"
}
Response (example): 
{
    "status": "success"
}
```

### Email 
```
Http verb: POST
Url: https://prod-31.centralus.logic.azure.com:443/workflows/26c898759c6a4faeab672826ebb9f265/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=L01OFr7RI1bPta2kZG7fizRRqhIzQBAzjYq8GeqOiEM
Headers:'Content-Type': 'application/json'
Body (example): 
{
	"TO": "example_email@gmail.com",
	"SUBJECT":"Email Recipt Order #42",
	"BODY":"Thank you for your order from Online Cafeteria. You purchased the following items <br><br> Pizza $12, <br> Sandwich $7 <br> Soda $1 <br> Soda $1 <br> ----- <br> Order Total $21 <br><br> Thank you for your purchase!",
}
Response (example): 
{
    "status": "success"
}
```

### Get Order Total 
```
Http verb: POST
Url: https://prod-10.centralus.logic.azure.com:443/workflows/06deabfdd9874a478922439c097a6ac5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YTLC6ocCOCmjtFW_4OH67zob5Qfm0SDgUeIJQGCvmac
Headers:'Content-Type': 'application/json'
Body (example): 
{
    "CONTACT_NAME": "William Smith",
    "CONTACT_PHONE": "1 (912) 234 3456"
}
Response (example): 
{
    "Table1": [
        {
            "total": 45
        }
    ]
}
```

### Get Menu 
```
Http verb: POST
Url: https://prod-12.centralus.logic.azure.com:443/workflows/623fba687c8a4d9983b03c59c34df6a7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uWI99lT_66N06ix1sNPExq1WHqQ_VS4f57_msIQCSRA
Headers:'Content-Type': 'application/json'
Body (example): 
{}
Response (example): 
{
    "Table1": [
        {
            "ITEM_ID": 1,
            "NAME": "Pizza",
            "PRICE": 12.0,
            "IMG_URL": " "
        },
	{
            "ITEM_ID": 5,
            "NAME": "Soda",
            "PRICE": 1.0,
            "IMG_URL": " "
        }
    ]
}
```

### Add an Item to the  Menu 
```
Http verb: POST
Url: https://prod-01.centralus.logic.azure.com:443/workflows/d3de08d451b0408092d99588c50f77e9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dKf4p5azWX8523XzB0DxFldHUIZvBzJp0J_uoEj3mCI
Headers:'Content-Type': 'application/json'
Body (example): 
{
	"PRICE": 24,
	"NAME":"Lobster",
	"IMG_URL":"img/lobster"
}
Response (example): 
{
    "status": "success"
}
```

### Create a Delivery
```
Http verb: POST
Url:https://prod-11.centralus.logic.azure.com:443/workflows/436606720c3e488585465e7aa718b9eb/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xRgjY9nM_7UBhPrHPMjUfAml3hcFkFTKPthR_yDf294
Headers:'Content-Type': 'application/json'
Body (example): 
{
    "ORDER_ID": "123, 45, 22",
    "ADDRESS": "1 Street Ln",
    "CITY": "Rochester",
    "STATE": "NY",
    "ZIP": 11545,
    "EMAIL": "email@email.com",
    "STATUS": "COOKING"
}
Response (example): 
{
    "status": "success"
}
```

## Back End (Database)
A Microsoft SQL database is the back end of the applicaiton. The database has tables and view. 

### Table
* ORDER
* MENU
* DELIVERY

### View
* CART
* HISTORY
* IN_PROGRESS

### Stored Procedure
* GET_CART_TOTAL
* UPDATE_CART_STATUS
