var myLogin = "KathrynJohnson";
var myLat = 0;
var myLng = 0;
var myMessage = "Hello World";
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat,myLng);
var myOptions = {
	zoom: 13,
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
}
var map;
var infowindow = new google.maps.InfoWindow();


function init() {
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
}

function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;

            postToServer();
			//renderMap();
		});
		
	} else {
		alert("Browser does not support geolocation");
	}
}

function renderMap() {
	/*me = new google.maps.LatLng(myLat, myLng);
	map.panTo(me);
	marker = new google.maps.Marker({
		position: me,
		title: myLogin
	});
	marker.setMap(map);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});*/
}


function postToServer () {
    var http = new XMLHttpRequest();
    var url = "https://secret-about-box.herokuapp.com/sendLocation";
    var params = "login=" +myLogin+ "&lat=" +myLat+ "&lng=" +myLng+ "&message=" +myMessage;
    http.open("POST", url, true);

//Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            //alert(http.responseText);
            createMarkers(http.responseText);
            createMyMarker();
        }
    }
    http.send(params);
}

function createMarkers(data) {
    var login;
    var lat;
    var lng;
    var message;
    var markers = new Array();
    var content;
    var miles_away;
    var contentString;// = new Object();
   
    data = JSON.parse(data);
    for (var i = 0; i <data.length; i++) {
        login = data[i]["login"];
        if (login == myLogin) {continue;}
        lat = data[i]["lat"];
        lng = data[i]["lng"];
        message = data[i]["message"];
        loc = new google.maps.LatLng(lat,lng);
        contentString = "Login: " +login+ "\nMessage: " +message+ "\nMiles Away: " +miles_away;
        markers[i] = new google.maps.Marker({
            position: loc,
            title: contentString
        });
        markers[i].setMap(map);
        miles_away = distanceFromMe(lat, lng);
        
        /*
        markers[i].addListener('click', function () {
            setContent(this.title)
            infowindows[i].open(map, markers[i])
        });*/
        
        google.maps.event.addListener(markers[i], 'click', function() {
            infowindow.setContent(this.title);
            infowindow.open(map, this);
        });
    }

}
function createMyMarker () {
    var image = "stickfigure.png";
    var myMarker = new google.maps.Marker {
        position: me,
        map: map,
        image: image,
        title: myLogin + "-This is you"
    };
    google.maps.event.addListener(myMarker, 'click', function() {
            infowindow.setContent(this.title);
            infowindow.open(map, this);
        });
    myMarker.setMap(map);
    map.panTo(me);
}
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
    return d;
}
Number.prototype.toRadians = function() {
   return this * Math.PI / 180;
}