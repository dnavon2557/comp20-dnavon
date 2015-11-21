var myLogin = "KathrynJohnson";
var myLat = 0;
var myLng = 0;
var myMessage = "Hello World";
var request = new XMLHttpRequest();
var me;
var myOptions = {
	zoom: 13,
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
}
var map;
var infowindow = new google.maps.InfoWindow();


function init() {
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	getMyLocation();
}

//gets location of user
function getMyLocation() {
	if (navigator.geolocation) {//proceeds only if user has geolocation
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
            me = new google.maps.LatLng(myLat,myLng);
            postToServer();
		});
		
	} else {
		alert("Browser does not support geolocation");
	}
}

//posts to server
function postToServer () {
    var http = new XMLHttpRequest();
    var url = "https://calm-headland-3864.herokuapp.com/sendLocation";
    var params = "login=" +myLogin+ "&lat=" +myLat+ "&lng=" 
                +myLng+ "&message=" +myMessage;
    http.open("POST", url, true);

//Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() {//proceeds when request is complete
        if(http.readyState == 4 && http.status == 200) {
            createMarkers(http.responseText);
            createMyMarker();
        }
    }
    http.send(params);
}

//create markers from JSON data
function createMarkers(data) {
    var login;
    var lat;
    var lng;
    var message;
    var markers = new Array();
    var content;
    var miles_away;
    var contentString;
    console.log(data);
    data = JSON.parse(data);
    //loop through for each object, maker a new marker with correct data at correct position
    for (var i = 0; i <data.length; i++) {
        login = data[i]["login"];
        if (login == myLogin) {continue;}
        lat = data[i]["lat"];
        lng = data[i]["lng"];
        message = data[i]["message"];
        loc = new google.maps.LatLng(lat,lng);
        contentString = "Login: " +login+ "<br>Message: " 
                        +message+ "<br>Miles Away: " +miles_away;
        markers[i] = new google.maps.Marker({
            position: loc,
            title: contentString
        });
        markers[i].setMap(map);
        miles_away = distanceFromMe(lat, lng);
        //event listener corresponds tot he marker that was clicked on
        //automatically by using "this"
        google.maps.event.addListener(markers[i], 'click', function() {
            infowindow.setContent(this.title);
            infowindow.open(map, this);
        });
    }

}

//creates unique marker for user
function createMyMarker () {
    var image = "stickfigure.png";
    var myMarker = new google.maps.Marker({
        position: me,
        map: map,
        icon: image,
        title: myLogin + "-This is you!<br>Message: " +myMessage
    });
    google.maps.event.addListener(myMarker, 'click', function() {
            infowindow.setContent(this.title);
            infowindow.open(map, this);
        });
    myMarker.setMap(map);
    map.panTo(me);
}

//calcs distance from user using Havershine Forumala
function distanceFromMe(lat, lng) {
    var R = 6371000; // metres
    var φ1 = myLat.toRadians();
    var φ2 = lat.toRadians();
    var Δφ = (myLat-lat).toRadians();
    var Δλ = (myLng-lng).toRadians();
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    d = d / 1.60934; //convert to miles
    return d;
}

//adds radian conversion to Number
Number.prototype.toRadians = function() {
   return this * Math.PI / 180;
}