// functions related to user
function register() {

    console.log("hello")
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    jsonData.user_name = document.getElementById("username").value;
    jsonData.mobile_number = document.getElementById("mobilenumber").value;
    jsonData.email = document.getElementById("email").value;

    jsonData.gender = 'Male';
    if (document.getElementById('genderFemale').checked) {
        jsonData.gender = 'Female';
    }

    jsonData.password = document.getElementById("password").value;
    if (jsonData.password != document.getElementById("confirmpassword").value) {
        alert('Password and confirm password must be the same!'); return;
    }

    var request = new XMLHttpRequest();
    request.open("POST", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/user-register", true);
    console.log("hello")
    request.onload = function () {
        console.log("hello")
        response = JSON.parse(request.responseText);
        console.log(response)
        if (response.message == "user added") {
            alert('Congrats! You have succesfully registered an account.');
            window.location.href = "login.html";
        }
        else if (response.message == "user_name already in use!") {
            alert('The username you have entered is already in use! Try a different username.')
        }
        else {
            alert('Error. Unable to register user.');

        }
    };
    request.send(JSON.stringify(jsonData));
    console.log("hello")
}

function login() {
    var response = "";
    var jsonData = new Object();
    jsonData.user_name = document.getElementById("username1").value;
    jsonData.password = document.getElementById("password1").value;

    var request = new XMLHttpRequest();
    request.open("POST", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/user-login",
        true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.Count == 1 || response.length == 1) {
            if (response.Count == 1) {
                sessionStorage.setItem("user_name", jsonData.user_name);
                sessionStorage.setItem("user", JSON.stringify(response.Items[0]));
                sessionStorage.setItem("mobile_number", response.Items[0].mobile_number);

            }
            alert('Welcome! You have successfully logged in.')
            window.location.href = "index.html";
            setNavBar();
        }
        else {
            alert('Error. Unable to login.');
        }
    };
    request.send(JSON.stringify(jsonData));
}
function setNavBar() {
    if (sessionStorage.getItem("user_name") != null) {
        document.getElementById("navUser").innerHTML =
            '<a style="background-color: #ff914d; color: white; font-size: 20px;" href="profile.html"><span class="fa-user-circle fa-solid" ></span>Profile</a>'
        document.getElementById("login").innerHTML = '<a style="background-color: #ff914d; color: white; font-size: 20px;" onclick="logOut()"><span class="fa-sharp fa-solid fa-right-to-bracket"></span>Logout</a>'

    }
    if (sessionStorage.getItem("user_name") == null) {
        document.getElementById("navUser").innerHTML = ''
        document.getElementById("login").innerHTML = '<a style="background-color: #ff914d; color: white; font-size: 20px;" href="login.html"><span class="fa-sharp fa-solid fa-right-to-bracket"></span>Login</a>'
    }
}
// function fillProfile() {
//     if (sessionStorage.getItem("user_name") != null) {
//         var jsonData = JSON.parse(sessionStorage.getItem("user"));
//         document.getElementById("user_name2").value = jsonData.user_name;
//         document.getElementById("name2").value = jsonData.name;
//         document.getElementById("email2").value = jsonData.email;
//         document.getElementById("mobile_number2").value = jsonData.mobile_number;

// if (jsonData.gender == 'Male') {
//     document.getElementById("genderMale").setAttribute("checked", true);
// }
// else {
//     document.getElementById("genderFemale").setAttribute("checked", true);
// }
//         document.getElementById("password2").value = jsonData.password;
//     }
// }
function updateProfile() {
    var response = "";
    var jsonData = new Object();
    jsonData.mobile_number = document.getElementById("mobile_number2").value;
    jsonData.user_name = document.getElementById("user_name2").value;
    jsonData.name = document.getElementById("name2").value;
    jsonData.email = document.getElementById("email2").value;
    jsonData.password = document.getElementById("password2").value;
    jsonData.gender = document.getElementById("gender2").value;



    var request = new XMLHttpRequest();
    request.open("PUT", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/user-profile",
        true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "user edited") {
            alert('Profile updated successfully.');
        }
        else {
            alert('Error. Unable to update profile.');
        }
    };
    request.send(JSON.stringify(jsonData));
}

function logOut() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = 'index.html';
}
function addBooking(restaurant_name_date_time, number_of_pax) {
    console.log(restaurant_name_date_time)
    console.log(number_of_pax)
    var response = "";
    var jsonData = new Object();
    user_name1 = JSON.stringify(sessionStorage.getItem("user_name"));
    image1 = JSON.stringify(sessionStorage.getItem("image"));
    cuisine1 = JSON.stringify(sessionStorage.getItem("cuisine"));
    contact_number1 = JSON.stringify(sessionStorage.getItem("mobile_number"));
    jsonData.user_name = JSON.parse(user_name1)
    jsonData.restaurant_name_date_time = restaurant_name_date_time;
    jsonData.number_of_pax = number_of_pax;
    jsonData.contact_number = JSON.parse(contact_number1)
    jsonData.image = JSON.parse(image1)
    jsonData.cuisine = JSON.parse(cuisine1)
    if (jsonData.contact_number == "") {
        alert('When making a booking contact number cannot be left blank!'); return;
    }

    if (sessionStorage.getItem("user_name") == null) {
        alert('Please ensure you are logged in before making a booking!'); return;
    }



    var request = new XMLHttpRequest();
    request.open("POST", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/bookings", true);

    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)
        if (response.message == "booking received") {
            alert('You have successfully added booking!');
            // window.location.href = "login.html";
        }
        else if (response.message == "duplicate booking") {
            alert('You have already made a booking for this particular restaurant at the specified date and time.')
        }
        else {
            alert('Error. Unable to add booking.');

        }
    };
    request.send(JSON.stringify(jsonData));
    console.log("hello")
}

function getBookings() {
    var response = "";
    var request = new XMLHttpRequest();
    user_name = sessionStorage.getItem('user_name');
    request.open("GET", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/bookings/" + user_name, true);

    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response);


        var HTML = ""
        for (let i = 0; i < response.Count; i++) {
            console.log(response.Items[i].restaurant_name)
            var restaurant_name_date_time = response.Items[i].restaurant_name_date_time



            HTML +=


                '<div class="card">' +


                '<div class="col-sm-3" style=" margin-right: 3rem; margin-bottom: 3rem">' +
                '<img src="' + response.Items[i].image + '" width="325px" class="card-img-top h-70" alt="..."' +
                'style="border-radius:1.6rem 0 0 1.6rem; height: 174px">' +
                '</div>' +
                '<div class="col-sm-2"' +
                'style=" margin-right: 3rem; height: 174px;   padding-bottom: 0.6rem; padding-left: 1rem; width: 25rem; border-radius: 0 1.6rem 1.6rem 0; background-color: #debc99;">' +
                '<div class="card-body">' +
                '<h4 class="card-title">' + response.Items[i].restaurant_name_date_time + '</h4>' +
                '<h5 class="card-title">' + response.Items[i].number_of_pax + '</h5>' +
                '<span class="badge badge-secondary float-right"' +
                'style="background-color: brown; margin-top: 0px;">' + response.Items[i].cuisine + '</span>' +
                '<a href="#" style="background-color: #8d4843; border: none;margin-left: 9.5rem; margin-top:3rem "' +
                'class="btn btn-primary stretched-link" onclick="deleteBooking(\'' + restaurant_name_date_time + '\');">Cancel Booking</a>' +
                '</div>' +
                '</div>' +


                '</div>'





        }

        document.getElementById('bookingsList').innerHTML = HTML;
    };
    request.send();
}

function deleteBooking(restaurant_name_date_time) {
    console.log(restaurant_name_date_time)
    var response = "";
    var user_name = sessionStorage.getItem("user_name")
    console.log(user_name)


    var alert1 = confirm("Are you sure you want to cancel this booking? This action is irreversible.");

    if (alert1 === true) {
        console.log(restaurant_name_date_time)
        var request = new XMLHttpRequest();
        var url = "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/bookings/" + user_name + "/" + restaurant_name_date_time
        console.log("restaurant_name")
        request.open("DELETE", url, true);
        request.onload = function () {
            response = JSON.parse(request.responseText);
            if (response.message == "booking cancelled") {
                alert('Your booking has been cancelled!');
                location.reload()
            }
            else if (response.message != "booking cancelled") {
                alert('Unable to cancel booking, try again!');

            }
        }
        request.send();
    }

}
function deleteAccount() {
    var response = confirm("Are you sure you want to delete this account? This is irreversible.");
    if (response === true) {
        deleteAllFavorites()
        deleteAllBookings()
        var request = new XMLHttpRequest();
        user_name = sessionStorage.getItem("user_name")
        var url = "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/user-profile/" + user_name
        request.open("DELETE", url, true);
        request.onload = function () {
            // window.location.href = "index.html";
            alert("Your account has been deleted");
            sessionStorage.clear();

        }
        request.send();
    }
    else {
        alert('Unable to delete account!')
    }
}

function deleteAllFavorites() {
    var fav_object = new Object();
    fav_object.user_name = sessionStorage.getItem("user_name");
    var request = new XMLHttpRequest();
    request.open('DELETE', "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/favorites/" + fav_object.user_id, true);
    request.onload = function () {
        location.reload();
    }
    request.send(JSON.stringify(fav_object));
}


function deleteAllBookings() {
    var fav_object = new Object();
    fav_object.user_name = sessionStorage.getItem("user_name");
    var request = new XMLHttpRequest();
    request.open('DELETE', "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/bookings/" + fav_object.user_name, true);
    request.onload = function () {
        location.reload();
    }
    request.send(JSON.stringify(fav_object));
}


function fillProfile1() {
    var response = "";
    var request = new XMLHttpRequest();
    user_name = sessionStorage.getItem('user_name');
    request.open("GET", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/user-profile/" + user_name, true);

    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response);


        var HTML = ""

        for (let i = 0; i < response.Count; i++) {

            HTML +=


                '<div class="row" style="margin-top: -40rem; margin-bottom: 5rem;  margin-right: -44rem;">' +
                '<div class="col-md-3 border-right">' +
                '<div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" style ="border-radius:50% ;" width="150px" src="' + response.Items[i].file_key + '"></div>' +
                '<form id="imageProfile">' +
                '<input type="file" id="imageUploader" accept="image/*">' +
                '<p style="margin-top:3px; margin-bottom:4px;">Please upload only png format</p>'+
                '<button type="button"; style="width:30%; height:1%; margin-left: -2px;", onclick="uploadImage()">Save Image</button>' +
                '</form>' +
                '</div>' +
                '<div class="col-md-5 border-right">' +
                '<form>' +
                '<div class="p-3 py-5">' +
                '<div class="d-flex justify-content-between align-items-center mb-3">' +
                '<!-- <h4 class="text-right">Profile Settings</h4> -->' +
                '</div>' +

                '<div class="row mt-2">' +
                '<div class="col-md-6"><label style="padding-top: 0.5rem;" class="labels">Name</label><input disabled required id="name2" type="text" class="form-control" placeholder="Enter Name" value="' + response.Items[i].name + '"></div>' +
                '<div class="col-md-6"><label style="padding-top: 0.5rem;" class="labels">Username</label><input disabled id="user_name2" type="text" class="form-control" value="' + response.Items[i].user_name + '" placeholder="Enter Username"></div>' +
                '</div>' +
                '<div class="row mt-3">' +
                '<div class="col-md-12"><label style="padding-top: 0.5rem;" class="labels">Mobile Number</label><input id="mobile_number2" type="text" class="form-control" placeholder="Enter Phone Number" value="' + response.Items[i].mobile_number + '"></div>' +
                '<div class="col-md-12"><label style="padding-top: 0.5rem;" class="labels">Gender</label><input disabled id="gender2" type="text" class="form-control" placeholder="Enter Gender" value="' + response.Items[i].gender + '"></div>' +

                '<div class="col-md-12"><label style="padding-top: 0.5rem;" class="labels">Email</label><input required id="email2" type="text" class="form-control" placeholder="Enter Email" value="' + response.Items[i].email + '"></div>' +
                '<div class="col-md-12"><label style="padding-top: 0.5rem;" class="labels">Password</label><input  required type="password" id="password2" class="form-control" placeholder="Enter Password" value="' + response.Items[i].password + '"></div>' +
                '<button type="button" style="color: white; font-size: small;" onclick="updateProfile()">Save Changes</button>' +
                '<div class="col-md-12"; style="margin-top: 1rem; ;"><label style="padding-top: 1rem" class="labels">Are you sure you want to delete your account? This action is irreversible</label></div>' +
                '<button type="button" style="color: white; font-size: small;" onclick="deleteAccount();">Delete Account</button>' +

                '</div>' +
                '</div>' +
                '</form>' +

                '</div>' +

                '</div>'







        }

        document.getElementById('userList').innerHTML = HTML;
    };
    request.send();
}
function checkAdminPassword() {
    var password = document.getElementById("password2").value;
    if (password === "correct_password") {
        alert("You have successfully logged into admin management system.")
        window.location.href = "slots.html";
        sessionStorage.setItem("isAdminLoggedIn", "true");
    } else {
        alert("Incorrect password. Please try again.");
    }
}
function checkAdminLogin() {
    if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
        alert("You are not authorized to access this page.");
        window.location.href = "index.html";
    }

}
function uploadImage() {
    var response = "";
    var jsonData = new Object();
    jsonData.user_name = sessionStorage.getItem("user_name");
    var file = document.getElementById("imageUploader").files[0];
    console.log(document.getElementById("imageUploader").files[0]);
    if (!file) {
        alert("No file selected")
        throw new Error("No file selected.");
        
        } 
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = function () {
      console.log(file)
        jsonData.file = file.name;
        jsonData.file_key = reader.result.split(',')[1];
        console.log(reader.result)
        console.log(jsonData.file_key)
        
        // console.log(jsonData.file_key)
        var request = new XMLHttpRequest();
        
        request.open("PUT", "https://aba3bnzddd.execute-api.us-east-1.amazonaws.com/user-profile-image", true);
        request.onload = function () {
            if (request.status === 200) {
                response = JSON.parse(request.responseText);
                console.log(response);
                console.log(response.message);
                if (response.message == "file_key and file URL updated") {
                    alert('Image uploaded successfully.');
                } else {
                    alert('Error. Unable to upload image.');
                }
            } else {
                console.error(`Request failed with status: ${request.status}`);
            }
        };
        request.send(JSON.stringify(jsonData));
    };
}
