// Code for the Add Location page.
loadLocations();

// DOM References:
var addressRef = document.getElementById("addressInput");
var nicknameRef = document.getElementById("nickname");
var searchButtonRef = document.getElementById("searchButton");
var addButtonRef = document.getElementById("addButton");

// Attributes:
var latitude;
var longitude;


// Map initialization:
//
function initMap() 
{
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 12});
    var geocoder = new google.maps.Geocoder();
    
    // add click event to the search button
    
    searchButtonRef.addEventListener('click', geocodeAddress(geocoder, map));
}

// Function to geocode entered address 
//
function geocodeAddress(geocoder, resultsMap)
{
    // geocode callback function to get latitude and longitude at that location
    //
    function geocodeCallback (results, status)
    {
        if (status === google.maps.GeocoderStatus.OK)
        {
            // no errors occurred
            
            // set the centre of the map at specified location
            resultsMap.setCenter(results[0].geometry.location);
            
            // get latitude and longitude values
            latitude = results[0].geometry.loacation.lat();
            longitude = results[0].geometry.location.lng();
            
            // show the formatted address
            addressRef.value = results[0].formatted_address;
            
            // create a marker and place it at the centre
            var marker = new google.maps.Marker(
                {
                    map: resultsMap,
                    position: results[0].geometry.location
                });
        }
        else
        {
            // an error occurred
            alert('Geocode was not successful for the following reason: ' + status);
        }
    }
    
    var addressObj = {
        'address': addressRef.value
    }
    
    geocoder.geocode(addressObj, geocodeCallback);
}

// Function executed when addlocation button is clicked
//
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
}
