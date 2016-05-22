// Code for the View Location page.


// Restore values from Local Storage
//
var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 
loadLocations();

// DOM References:

var dateRef = document.getElementById("date");
var weatherRef = document.getElementById("weather");
var removeButtonRef = document.getElementById("removeButton");

// CONSTANTS:

var MSEC_PER_DAY = 86400000;

// Callback function that displays weather information on the screen
//
var weatherCallback = function (index, weather)
{
    var weather = 
        "Summary: " + weather.summary + "<br/>" +
        "Minimum temperature: " + weather.temperatureMin + "&#176;C <br/>" +
        "Maximum temperature: " + weather.temperatureMax + "&#176;C <br/>" +
        "Humidity: " + weather.humidity + "% <br/>" +
        "Wind speed: " + weather.windSpeed + "km/h";
    weatherRef.innerHTML = weather;
}

// Change the date when the user drags the slider
//
function sliderCallback (value)
{
    weatherRef.innerHTML = "Loading weather...";
    var currentDate = new Date();
    var msecSince1970 = currentDate.getTime();
    msecSince1970 -= (30 - value) * MSEC_PER_DAY;
    currentDate.setTime(msecSince1970);
    dateRef.innerHTML = currentDate.simpleDateString();
    locationWeatherCache.getWeatherAtIndexForDate(locationIndex, currentDate, weatherCallback);
}

// Remove button onClick event
//
function removeThisLocation()
{
    locationWeatherCache.removeLocationAtIndex(locationIndex);
    location.href = 'index.html';
}
removeButtonRef.addEventListener("click", removeThisLocation);



// Show information of selected location:

document.getElementById("headerBarTitle").textContent =    
locationWeatherCache.locationAtIndex(locationIndex).nickname;
var today = new Date();
dateRef.innerHTML = today.simpleDateString();
locationWeatherCache.getWeatherAtIndexForDate(locationIndex, today, weatherCallback);

// Show the map:

var map;
var mapLatitude = Number(locationWeatherCache.locationAtIndex(locationIndex).latitude);
var mapLongitude = Number(locationWeatherCache.locationAtIndex(locationIndex).longitude);

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: mapLatitude, lng: mapLongitude},
    zoom: 9
    });
}




