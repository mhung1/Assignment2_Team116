// Code for the Add Location page.
loadLocations();

// DOM References:
var addressRef = document.getElementById("address");
var nicknameRef = document.getElementById("nickname");
var searchButtonRef = document.getElementById("searchButton");
var addButtonRef = document.getElementById("addButton");

// Attributes:
var latitude;
var longitude;


// search button onclick function that geocode the address
//
function search()
{
    geocodeAddress(geocoder, map);
}


// map initialization
//
function initMap() 
{
    // Create a map
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
    });
    
    infowindow = new google.maps.InfoWindow;
    geocoder = new google.maps.Geocoder();
}

// A reference code of geocode example on https://developers.google.com/
// maps/documentation/javascript/examples/geocoding-simple
// since Google's geocoding API doesn't support JSONP
//
function geocodeAddress(geocoder, resultsMap) {
    var addressObj = {
        'address': addressRef.value
    };
    geocoder.geocode(addressObj, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            // set the centre of the map at specified location
            resultsMap.setCenter(results[0].geometry.location);
            
            // get latitude and longitude values
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            
            // create a marker and place it at the centre
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
            
            // show the formatted address
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
        }
        else
        {
        alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}


// execute when addlocation button is clicked
function addLocation ()
{
    // using if statement to check: 1. nickname, 2. location
    // hints: nicknameRef = ""
    //        latitude and longitude is undefined or not
    
    // if ([something])
    // {
            locationWeatherCache.addLocation(lat, lng, nickNameInputRef.value);
            location.href = 'index.html'; // go back to main page
    // }
    // else
    // {
    //    something goes wrong, alert the user to search location or type in Nickname
    //    hints: use alert([message you want to display])
    // }
}
