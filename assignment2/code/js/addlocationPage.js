// Code for the Add Location page.
loadLocations();

// DOM References:
var locationInputRef = document.getElementById("locationInput");
var nickNameInputRef = document.getElementById("nickNameInput");
var searchButtonRef = document.getElementById("searchButton");
var addLocationButtonRef = document.getElementById("addlocationButton");

// map initialize
//
function initialize() 
{
    var mapProp = 
        {
            center:new google.maps.LatLng(-37.908042,145.1325757),
            zoom:15,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
//google.maps.event.addDomListener(window, 'load', initialize);


// search the location
//
function search()
{
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locationInputRef.value +"&key=AIzaSyAlmgZ1Nj0KIWIRSEKsQVHFFwAW78hy1G4&callback=this.geoResponse";
    document.body.appendChild(script);
}

// callback function
//
function geoResponse (response)
{
   lat = response.geometry.location.lat;
   lng = response.geometry.location.lng;
}


// execute when addlocation button is clicked
function addLocation ()
{
    locationWeatherCache.addLocation(lat, lng, nickNameInputRef.value);
    location.href = 'index.html'; // go back to main page
}
