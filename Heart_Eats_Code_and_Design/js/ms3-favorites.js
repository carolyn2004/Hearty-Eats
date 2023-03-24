function addFavorites() {
    var response = "";
    var jsonData = new Object();
    jsonData.restaurant_name = sessionStorage.getItem("restaurant_name");
    jsonData.user_name = sessionStorage.getItem("user_name");
    jsonData.image = sessionStorage.getItem("image")
    jsonData.cuisine = sessionStorage.getItem("cuisine")

    var request = new XMLHttpRequest();
    request.open('POST', "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/favorites", true);
    request.onload = function () {
        response = JSON.parse(request.responseText);

        if (response.message == "added to favorites") {
            alert('This restaurant has been added to favorites!');

        }
        else if (response.message == "restaurant has already been added to favorites") {
            alert('This restaurant has already been added to favorites!');

        }

        else {
            alert('Unable to add to favorites, try again!');

        }
    }
    request.send(JSON.stringify(jsonData));
}
function getFavorites() {
    var response = "";
    var request = new XMLHttpRequest();
    user_name = sessionStorage.getItem('user_name');
    request.open("GET", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/favorites/" + user_name, true);

    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response);


        var HTML = ""
        for (let i = 0; i < response.Count; i++) {
            console.log(response.Items[i].restaurant_name)
        var restaurant_name = response.Items[i].restaurant_name


            HTML += '<div class="col-md-3 box " style="background-color: #debc99;">' +
                '<div class="card" style="margin:15px -5 20px -5; ">' +
                '<a class="card-block stretched-link" href="#"></a>' +
                '<img class="card-img-top" src="' + response.Items[i].image + '" style="margin-left: 1px;width: 220px; margin-top: -15px;"' +
                'alt="Card image cap">' +
                '<div class="card-body">' +
                '<h5 class="card-title"></h5>' +


                '<h4 style="margin-top: 0px; color:black">' + response.Items[i].restaurant_name + '</h4>' +
                '<span class="badge badge-secondary float-right"' +
                'style="background-color: #8d4843; margin-top: -5px;">Cuisine</span>' +
                '<a style="color: black; margin-top: -5px;" onclick="deleteFavorites(\'' + restaurant_name + '\');"><u>Delete</u></a>' +
                '</div>' + 
                '</div>' + 

                '</div>'





        }

        document.getElementById('favoritesList').innerHTML = HTML;
    };
    request.send();
}

function deleteFavorites(restaurant_name) {
    console.log(restaurant_name)
    var response = "";
    var user_name = sessionStorage.getItem("user_name")
    console.log(user_name)
   

    var alert1 = confirm("Are you sure you want to delete this item from your favourites? This action is irreversible.");

    if (alert1 === true) {
        console.log(restaurant_name)
        var request = new XMLHttpRequest();
        var url = "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/favorites/" + restaurant_name + "/" + user_name
        console.log("restaurant_name")
        request.open("DELETE", url, true);
        request.onload = function () {
            response = JSON.parse(request.responseText);
            if (response.message == "favorites deleted") {
                alert('This restaurant has been deleted from favorites!');
                location.reload()
            }
            else if (response.message != "favorites deleted") {
                alert('Unable to delete from favorites, try again!');

            }
        }
        request.send();
    }
  
}




