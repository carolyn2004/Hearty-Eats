function getRestaurants(num) {
    var response = "";
    var request = new XMLHttpRequest();
    request.open("GET", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/restaurants", true);
    request.onload = function() {
    response = JSON.parse(request.responseText);
    console.log(response)
           
    var html = "";
    var max = num;
    if (response.Count < max) max = response.Count;
    for (var i = 0; i< max; i++)
    {
        // console.log(i)
        // console.log(response)
    html += '<div class="col-md-3 box" style="background-color: #debc99;">' +
    '<div class="card" style="margin:15px -5 20px -5;">' +
        '<a class="card-block stretched-link" href="#"></a>' +
        '<img class="card-img-top" src="' + response.Items[i].image + '" style="max-width: 195px; margin-top: -15px;"' 
        + 'alt="Card image cap">'+
        '<div class="card-body">'+
            '<h4 class="card-title" style="margin-bottom:-10px; color:black;">' + response.Items[i].restaurant_name + '</h4>'+


            '<span class="badge badge-secondary float-right"'+
                'style="background-color: #8d4843; margin-top: 30px;">' + response.Items[i].cuisine + '</span>' +
                '<a style="color: black; margin-top: 30px;" href="restaurant-info.html?restaurant_name=' + response.Items[i].restaurant_name + '"><u>View More</u></a>' +

        '</div>'+
    '</div>'+
'</div>'
    }
    document.getElementById("restaurantsList").innerHTML = html;
    
    };
    request.send();
    }

    function getOneRestaurant() {
        var response = "";
        var urlParams = new URLSearchParams(window.location.search);
        var restaurant_name = urlParams.get("restaurant_name");
        sessionStorage.setItem('restaurant_name', restaurant_name);
        console.log(restaurant_name)
      
        var request = new XMLHttpRequest();
        request.open("GET", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/restaurants/" + restaurant_name, true);
        // console.log(response)
        request.onload = function () {
            response = JSON.parse(request.responseText);
            sessionStorage.setItem('cuisine', response.Items[0].cuisine);
            sessionStorage.setItem('image', response.Items[0].image);
            console.log(response)
            console.log(response.Items[0].image)
            var HTML = ""
            for (let i = 0; i < response.Count; i++) {
                console.log(response.Items[0].image)
                HTML += 
                '<script src="js/ms3-favorites.js"></script>'+
                '<div>'+
    '<img  id="res_image" src="' + response.Items[0].image + '"' +
        'style="padding: 0 5% 0 5%; display: block; margin-left: auto; margin-right: auto; width: 88%; height: 500px; object-fit: cover;">' +
    '</div>'+

    '<div id="restaurant_details" class="container featured-box" style="padding-bottom: 15%;">'+
        '<h1 id="res_name" style="width: 500px;">' + response.Items[0].restaurant_name + '</h1>' +
        '<div style="padding-bottom: 50px; margin-bottom: -5rem;">' +
            '<span id="res_badge" style="background-color: #debc99; color: white;"' +
                'class="badge badge-secondary float-left">' +
                '<div id="res_cuisine" style="font-size:medium;">' + response.Items[0].cuisine + '</div>' + 
            '</span>' +
            '<div class="line"> </div>' +
        '</div>' +

        '<div class="line" style="margin-top: 20px;margin-bottom: -5rem;">' +
            
            

            '<!-- Favourite button -->' +
            '<div style="padding-left: 0px; display: inline;">' +
                '<button type="button" id="btn_favourite" class="btn btn-primary"' +
                    'style="background-color: #8d4843; border: none;" onclick="addFavorites()">'+
                    '<i class="fa-bookmark fa-solid"></i> Add to Favourites </button>'+
            '</div>'+
        '</div>' +

        '<!-- Map Section -->' +
        '<div class="card" style="width: 16rem; position: absolute; margin-left: 680px; margin-top: 23rem;">' +
            '<iframe src="' + response.Items[0].map + '"' +
                'width="400" height="350" style="border:0;" allowfullscreen="" loading="lazy"' +
                'referrerpolicy="no-referrer-when-downgrade"></iframe>' +
        '</div>' +
        '<!-- About section -->' +
        '<div style="margin-top: 80px; width: 100rem;font-size: medium; font-weight:lighter;">' +
            '<p id="description"' +
                'style="width: 1100px; border-bottom: 1px solid black; border-style: solid; border-top: none; border-left: none; border-right: none; padding-bottom: 20px; ">' +
                response.Items[0].description+'</p>'+

        '</div>' +

        '<!-- Restaurant Information -->' +
        '<div' +
            'style="width: 600px; height: 400px; border-bottom: 1px solid black;  border-style: solid; border-top: none; border-left: none; border-right: none; margin-bottom: -100px; ">' +

            '<h2 style="color: #ff914d; font-size: x-large; ">Address</h2>' +
            '<p style="font-size: medium;">' +
            response.Items[0].restaurant_address + 
            '</p>' +
            '<h2 style="color: #ff914d; font-size: x-large;"> Contact Details</h2>' +
            '<p style="font-size: medium;">' + response.Items[0].contact_number + '</p>' +
            '<h2 style="color: #ff914d; font-size: x-large;">Operating hours</h2>' +
            '<p style="font-size: medium;">' + response.Items[0].operating_hours + '</p>'

        '</div>' + 

        

    '</div>'

                
                

                
                     
                    
                 
    
    
        }
            document.getElementById('restaurantinfo').innerHTML = HTML
           
        };
    
        request.send();
    }

    function filterCuisine() {
        var request = new XMLHttpRequest();
        var select_cuisine = document.getElementById("select_cuisine").value;
        console.log(select_cuisine)
        request.open("GET", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/filterRestaurants/" + select_cuisine, true);
        
        request.onload = function() {
             if ( select_cuisine == 'All' ) {
                    location.reload()
                  }
            response = JSON.parse(request.responseText);
            HTML = "";
            for (let i = 0; i < response.Count; i++) {
                
              
            
    
                HTML += '<div class="col-md-3 box" style="background-color: #debc99;">' +
                '<div class="card" style="margin:15px -5 20px -5;">' +
                    '<a class="card-block stretched-link" href="#"></a>' +
                    '<img class="card-img-top" src="' + response.Items[i].image + '" style="max-width: 195px; margin-top: -15px;"' 
                    + 'alt="Card image cap">'+
                    '<div class="card-body">'+
                        '<h4 class="card-title" style="margin-bottom:-10px; color:black;">' + response.Items[i].restaurant_name + '</h4>'+
            
            
                        '<span class="badge badge-secondary float-right"'+
                            'style="background-color: #8d4843; margin-top: 30px;">' + response.Items[i].cuisine + '</span>' +
                            '<a style="color: black; margin-top: 30px;" href="restaurant-info.html?restaurant_name=' + response.Items[i].restaurant_name + '"><u>View More</u></a>' +
            
                    '</div>'+
                '</div>'+
            '</div>'
        
            }
            document.getElementById('restaurantsList').innerHTML = HTML
            
            
        };
        
        request.send();
    }

    function searchBar() {
      var request = new XMLHttpRequest();
        var text_search = document.getElementById("text_search").value;
        console.log(text_search)
        request.open("GET", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/searchRestaurants/" + text_search, true);
        
        request.onload = function() {
            
            response = JSON.parse(request.responseText);
            HTML = "";
            for (let i = 0; i < response.Count; i++) {
                
              
            
    
                HTML += '<div class="col-md-3 box" style="background-color: #debc99;">' +
                '<div class="card" style="margin:15px -5 20px -5;">' +
                    '<a class="card-block stretched-link" href="#"></a>' +
                    '<img class="card-img-top" src="' + response.Items[i].image + '" style="max-width: 195px; margin-top: -15px;"' 
                    + 'alt="Card image cap">'+
                    '<div class="card-body">'+
                        '<h4 class="card-title" style="margin-bottom:-10px; color:black;">' + response.Items[i].restaurant_name + '</h4>'+
            
            
                        '<span class="badge badge-secondary float-right"'+
                            'style="background-color: #8d4843; margin-top: 30px;">' + response.Items[i].cuisine + '</span>' +
                            '<a style="color: black; margin-top: 30px;" href="restaurant-info.html?restaurant_name=' + response.Items[i].restaurant_name + '"><u>View More</u></a>' +
            
                    '</div>'+
                '</div>'+
            '</div>'

        
            }
            document.getElementById('restaurantsList').innerHTML = HTML
            
            
        };
        
        request.send();
    }

    
    function getOneRestaurantSlots() {
        var response = "";
        var urlParams = new URLSearchParams(window.location.search);
        var restaurant_name = urlParams.get("restaurant_name");
        sessionStorage.setItem('restaurant_name', restaurant_name);
        user_name = sessionStorage.getItem("user_name")
        console.log(restaurant_name)
      
        var request = new XMLHttpRequest();
        request.open("GET", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/slots/" + restaurant_name, true);
        // console.log(response)
        request.onload = function () {
            response = JSON.parse(request.responseText);
            console.log(response)
            
            var HTML = ""
            for (let i = 0; i < response.Count; i++) {
                console.log(response.Items[i].restaurant_name_date_time)
                HTML += 

                '<form id="bookingForm"style="margin-left: 19rem; margin-bottom:3rem">'+
               
    '<label for="rname" hidden>Restaurant Name:</label><br>' +
    '<input type="text" hidden id="rname" name="rname" value="' + response.Items[i].restaurant_name + '"><br>'+
    '<label for="slots" style="font-size:x-large; text-transform: uppercase;color:#8d4843">Restaurant Name, Date and Time:</label><br>'+
'<select style="font-size:medium;" id="slots">'+
  '<option style="font-size:medium;" value="' + response.Items[i].restaurant_name_date_time +'">' + response.Items[i].restaurant_name_date_time + '</option>'+
'</select><br>'+
'<label for="slots1" style="margin-top:1rem; font-size:x-large; color:#8d4843; text-transform: uppercase;">Number of Pax</label><br>'+
'<select style="font-size:medium;" id="slots1">'+
  '<option style="font-size:medium;" value="'+ response.Items[i].number_of_pax + '">' + response.Items[i].number_of_pax + '</option>'+
 
'</select><br>'+
// '<label for="uname" style="font-size:x-large; text-transform: uppercase;color:#8d4843">Username:</label><br>'+
// '<input disabled name="uname" style="font-size:medium; height:60%"; value="'+ user_name +'"><br>' + 
    // '<label for="Contact Number" style="margin-top:1rem; font-size:x-large; color:#8d4843; text-transform: uppercase;">Contact Number</label><br>'+
    // '<input required style="font-size:medium;height:60%; " id="contact_number" >'+'<br>'+
    
    '<button type="button" onclick="addBooking(\'' + response.Items[i].restaurant_name_date_time + '\',\'' + response.Items[i].number_of_pax +'\')" style="margin-top:1rem; height:30px; font-size:medium">Make booking</button>'+
  '</form>'+
  '<p style="width: 1100px; border-bottom: 1px solid black; margin-bottom: 3rem; margin-left: 19rem; border-style: solid; border-top: none; border-left: none; border-right: none; padding-bottom: 20px; ">' +'</p>'
  
 

                
                     
                    
                 
    
    
        }
            document.getElementById('bookingForm1').innerHTML = HTML
          // console.log(HTML)
        };
    
        request.send();
    }

    function addSlots() {
        var response = "";
        var jsonData = new Object();
        jsonData.restaurant_name_date_time = document.getElementById("date_time_slot").value;
        jsonData.number_of_pax = document.getElementById("number_of_pax_2").value;
        jsonData.restaurant_name = document.getElementById("restaurant_name_slot").value;
        // validate the access token
        var access_token = document.getElementById("access_token").value;
        console.log(jsonData.restaurant_name_date_time)
        console.log(jsonData.number_of_pax)
        console.log(jsonData.restaurant_name)
        console.log(access_token)
        var request = new XMLHttpRequest();
        request.open("POST", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/slots", true);
        request.setRequestHeader("Authorization", access_token); 
        console.log(access_token)
        
      
        request.onload = function () {
            
            response = JSON.parse(request.responseText);
            console.log(response)
            if (response.message == "slot added") {
                alert('Congrats! You have succesfully added a slot.');
                location.reload()
            } else if (response.message == "forbidden") {
                alert('Invalid token. Please enter a valid access token.');
            } else if (response.message == "duplicate slot") {
                alert('Duplicate slot added.');
            } else {
                alert('Error. Unable to add slot.');
            }
        };
        request.send(JSON.stringify(jsonData));
}

function getAllSlots() {
    var request = new XMLHttpRequest();
request.open("GET", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/slots", true);
request.onload = function () {
  response = JSON.parse(request.responseText);
  console.log(response);
  console.log(response.Items[1].restaurant_name)
  var HTML = "";
  HTML += '<table class="table table-bordered" style="width: 120rem; margin-left: 15rem; margin-bottom:5rem;">'+
            '<thead>'+
            '<tr>'+
            '<th style="font-size: x-large; color: #A52A2A;">Restaurant Name</th>'+
            '<th style="font-size: x-large; color: #A52A2A;">Restaurant Name, Date and Time</th>'+
            '<th style="font-size: x-large; color: #A52A2A;">Number of Pax</th>'+
            '<th style="font-size: x-large; color: #A52A2A; border: none;"></th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>';
  for (let i = 0; i < response.Count; i++) {
    var restaurant_name = response.Items[i].restaurant_name
    var restaurant_name_date_time = response.Items[i].restaurant_name_date_time
  
    HTML += '<tr>'+
            '<td style="font-size: medium; font-weight: lighter;">'+ response.Items[i].restaurant_name +'</td>'+
            '<td style="font-size: medium">' +  response.Items[i].restaurant_name_date_time + '</td>'+
            '<td style="font-size: medium">' + response.Items[i].number_of_pax + '</td>'+
            '<td><a class="fa fa-trash" style="font-size: medium; margin-left: 0.3rem; " href="#" onclick="deleteSlot(\'' + restaurant_name + '\', \'' + restaurant_name_date_time + '\');"></a> </td>'+
            '</tr>'
  }
  HTML += '</tbody>'+
            '</table>'
  document.getElementById('tableSlots').innerHTML = HTML;
};
request.send();

}
function deleteSlot(restaurant_name,restaurant_name_date_time) {
    var access_token = prompt("Please enter the Lambda authorizer access token:");
    console.log(restaurant_name)
    console.log(restaurant_name_date_time)
    if (access_token) {
        var request = new XMLHttpRequest();
        var url = "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/slots/" + restaurant_name + "/" + restaurant_name_date_time;
        request.open("DELETE", url, true);
        request.setRequestHeader("Authorization", access_token);
        request.onload = function () {
            var response = JSON.parse(request.responseText);
            if (response.message == "slot deleted") {
                alert("The slot has been deleted successfully.");
                location.reload();
            } else {
                alert("The access token is invalid or slot could not be deleted. Please try again.");
            }
        };
        request.send();
    }
}







  


    
   
    

   
