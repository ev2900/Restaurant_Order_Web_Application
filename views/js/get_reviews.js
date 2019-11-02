$(document).on("click", "[id*='review']", function() {

    // Extract menu item name from id
    var itemId = (this.id).replace('review', '');

    // Grab menu list so we can grab pertinent data for later
    var menuMap = {};

    var person = JSON.stringify({});
    
    $.ajax({
        type: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        url: 'https://prod-12.centralus.logic.azure.com:443/workflows/623fba687c8a4d9983b03c59c34df6a7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uWI99lT_66N06ix1sNPExq1WHqQ_VS4f57_msIQCSRA',
        data: person,
        success: function(resp){

            $.each(resp.Table1, function(i, each) {

                menuMap[each.ITEM_ID] = each;

            });
                    
        },
        error: function() {
            alert('error');
        }
    }).then(function() {

        // Get all reviews so we can parse
        // TODO should revise API call to grab one review by ITEM_ID
        var noBody = JSON.stringify({});

        var itemReviews = [];

        $.ajax({
            type: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            url: 'https://prod-19.centralus.logic.azure.com:443/workflows/0ec8ed020ef841f98e0d9e65357925dd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4wAhTUTvXQBPt9vqaS9o2xHLLaLMZ7mFp88ZThIdiO8',
            data: noBody,
            success: function(resp){
                console.log('success');

                $.each(resp.Table1, function(i, review) {

                    var reviewItemId = parseInt(itemId);
                    
                    if(reviewItemId == review.ITEM_ID) {
                        itemReviews.push(review);
                    }

                });

            },
            error: function() {
                console.log('error');
            }
        }).then(function() {

            if(itemReviews.length == 0) {
                
                itemId = parseInt(itemId);
                var item = menuMap[itemId];

                // Get the modal
                var modal = document.getElementById("myModalNoReviews");

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];
                

                var imgTd = document.getElementById("image-no-review");
                while(imgTd.firstChild) imgTd.removeChild(imgTd.firstChild)
                imgTd = document.getElementById("image-no-review");

                var img = document.createElement("img");
                img.src = item.IMG_URL;
                img.alt = "Image not available";

                imgTd.appendChild(img);

                modal.style.display = "block";
                
                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                    var newReviewTitle = document.getElementById("add0");
                    newReviewTitle.style.display = "none";
                    var noReviewInputName = document.getElementById("add1");
                    noReviewInputName.style.display = "none";
                    var noReviewInputReview = document.getElementById("add2");
                    noReviewInputReview.style.display = "none";
                    var noReviewInputSubmit = document.getElementById("add3");
                    noReviewInputSubmit.style.display = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                        var newReviewTitle = document.getElementById("add0");
                        newReviewTitle.style.display = "none";
                        var noReviewInputName = document.getElementById("add1");
                        noReviewInputName.style.display = "none";
                        var noReviewInputReview = document.getElementById("add2");
                        noReviewInputReview.style.display = "none";
                        var noReviewInputSubmit = document.getElementById("add3");
                        noReviewInputSubmit.style.display = "none";
                    }
                }

                // If add a review link is clicked, show inputs for add review
                // TODO make this work
                var addReviewLink = document.getElementById("add-review");
                addReviewLink.onclick = function() {
                    var newReviewTitle = document.getElementById("add0");
                    newReviewTitle.style.display = "block";
                    var noReviewInputName = document.getElementById("add1");
                    noReviewInputName.style.display = "block";
                    var noReviewInputReview = document.getElementById("add2");
                    noReviewInputReview.style.display = "block";
                    var noReviewInputSubmit = document.getElementById("add3");
                    noReviewInputSubmit.style.display = "block";
                }
            
                $('#create-review').on('click', function(ev) {
                    var nameInput = $('#no-review-input-name').val();

                    if(nameInput == '') {
                        alert("Please enter your name");
                        return;
                    }

                    var reviewInput = $('#no-review-input-review').val();

                    if(reviewInput == '') {
                        alert("Please enter a review");
                        return;
                    }

                    var createReviewBody = JSON.stringify({
                        "ITEM_ID": itemId,
                        "NAME": nameInput,
                        "DESCRIPTION": reviewInput
                    });

                    $.ajax({
                        type: 'POST',
                        headers: { 
                            'Content-Type': 'application/json'
                        },
                        url: 'https://prod-16.centralus.logic.azure.com:443/workflows/9acc3323898f41c0847066d2f7e3f34d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vQ54kgaP1p3938cpIqiCtNnDfoqmD8EoW67eRafn-kU',
                        data: createReviewBody,
                        success: function(resp){
                            console.log('success');
            
                            // route to add to cart (refresh)
                            window.location.href ='place_order.html';
            
                        },
                        error: function() {
                            console.log('error');
                        }
                    });
                });
            } else {
                
                itemId = parseInt(itemId);
                var item = menuMap[itemId];

                // Get the modal
                var modal = document.getElementById("myModalReviews");

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close2")[0];
                
                var imgTd = document.getElementById("image-review");
                while(imgTd.firstChild) imgTd.removeChild(imgTd.firstChild)
                imgTd = document.getElementById("image-review");

                var img = document.createElement("img");
                img.src = item.IMG_URL;
                img.alt = "Image not available";

                imgTd.appendChild(img);

                modal.style.display = "block";

                var reviewList = document.getElementById("reviews");

                for (var i = 0; i < itemReviews.length; i++) {
                    
                    var itemReview = itemReviews[i];

                    var nameListItem = document.createElement("li");
                    var nameTextNode = document.createTextNode(itemReview.NAME + " says,");
                    nameListItem.appendChild(nameTextNode);

                    reviewList.appendChild(nameListItem);
                    
                    var reviewListItem = document.createElement("li");
                    var reviewTextNode = document.createTextNode("\"" + itemReview.DESCRIPTION + "\"");
                    reviewListItem.appendChild(reviewTextNode);

                    reviewList.appendChild(reviewListItem);

                    var lineBreak = document.createElement("li");
                    var breakIt = document.createElement("br");
                    lineBreak.appendChild(breakIt);
                    reviewList.appendChild(lineBreak);

                }
                
                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                    var newReviewTitle = document.getElementById("add7");
                    newReviewTitle.style.display = "none";
                    var noReviewInputName = document.getElementById("add4");
                    noReviewInputName.style.display = "none";
                    var noReviewInputReview = document.getElementById("add5");
                    noReviewInputReview.style.display = "none";
                    var noReviewInputSubmit = document.getElementById("add6");
                    noReviewInputSubmit.style.display = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                        var newReviewTitle = document.getElementById("add7");
                        newReviewTitle.style.display = "none";
                        var noReviewInputName = document.getElementById("add4");
                        noReviewInputName.style.display = "none";
                        var noReviewInputReview = document.getElementById("add5");
                        noReviewInputReview.style.display = "none";
                        var noReviewInputSubmit = document.getElementById("add6");
                        noReviewInputSubmit.style.display = "none";
                    }
                }

                // If add a review link is clicked, show inputs for add review
                // TODO make this work
                var addReviewLink = document.getElementById("add-review2");
                addReviewLink.onclick = function() {
                    var newReviewTitle = document.getElementById("add7");
                    newReviewTitle.style.display = "block";
                    var noReviewInputName = document.getElementById("add4");
                    noReviewInputName.style.display = "block";
                    var noReviewInputReview = document.getElementById("add5");
                    noReviewInputReview.style.display = "block";
                    var noReviewInputSubmit = document.getElementById("add6");
                    noReviewInputSubmit.style.display = "block";
                }
            
                $('#create-review-with-reviews').on('click', function(ev) {
                    var nameInput = $('#review-input-name').val();

                    if(nameInput == '') {
                        alert("Please enter your name");
                        return;
                    }

                    var reviewInput = $('#review-input-review').val();

                    if(reviewInput == '') {
                        alert("Please enter a review");
                        return;
                    }

                    var createReviewBodyThisTime = JSON.stringify({
                        "ITEM_ID": itemId,
                        "NAME": nameInput,
                        "DESCRIPTION": reviewInput
                    });

                    $.ajax({
                        type: 'POST',
                        headers: { 
                            'Content-Type': 'application/json'
                        },
                        url: 'https://prod-16.centralus.logic.azure.com:443/workflows/9acc3323898f41c0847066d2f7e3f34d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vQ54kgaP1p3938cpIqiCtNnDfoqmD8EoW67eRafn-kU',
                        data: createReviewBodyThisTime,
                        success: function(resp){
                            console.log('success');
            
                            // route to add to cart (refresh)
                            window.location.href ='place_order.html';
            
                        },
                        error: function() {
                            console.log('error');
                        }
                    });
                });
            }
        });
    
    });

 });