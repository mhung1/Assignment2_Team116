// Code for the View Location page.

// Restore the cache and selected location index from Local Storage
//
var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 
loadLocations();

// DOM References:

var dateRef = document.getElementById("date");
var weatherRef = document.getElementById("weather");
var removeButtonRef = document.getElementById("removeButton");
var sliderRef = document.getElementById("slider");

// CONSTANT:

var MSEC_PER_DAY = 86400000;

// Attributes:

var today = new Date();
dateRef.innerHTML = today.simpleDateString();
var mapLatitude;
var mapLongitude;
var map;

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

// Callback function that shows today's weather at current location
//
function currentLocationResponse (response)
{
    // convert humidity into %
    var humidity = 100 * response.daily.data[0].humidity;
    
    var weather = {
            summary: response.daily.data[0].summary,
            temperatureMin: response.daily.data[0].temperatureMin,
            temperatureMax: response.daily.data[0].temperatureMax,
            humidity: humidity.toFixed(1),
            windSpeed: response.daily.data[0].windSpeed,
            icon: response.daily.data[0].icon
    }
    
    weatherCallback(-1, weather);
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

// show the position and weather information at current location
//
function showCurrentLocation(position)
{
    // map initialise
    mapLatitude = position.coords.latitude;
    mapLongitude = position.coords.longitude;
    initMap();
    
    // request weather at current location
    var key = mapLatitude + "," + mapLongitude + "," + today.forecastDateString();
    var script = document.createElement('script');
    script.src = "https://api.forecast.io/forecast/545d94fc22b966c9fe0d025fab265e6c/" + key + "?exclude=currently,minutely,hourly&units=ca&callback=this.currentLocationResponse";
    document.body.appendChild(script);
}

// map initialization:
//
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: mapLatitude, lng: mapLongitude},
    zoom: 12
    });
}

// Show information of selected location:

if (locationIndex == -1)
{
    // current location
    removeButtonRef.style.visibility = "hidden"; // hide the button
    sliderRef.style.visibility = "hidden"; // hide the slider
    document.getElementById("headerBarTitle").textContent = "Current location";
    navigator.geolocation.getCurrentPosition(showCurrentLocation); 
}
else
{
    // location at given index
    locationWeatherCache.getWeatherAtIndexForDate(locationIndex, today, weatherCallback);
    document.getElementById("headerBarTitle").textContent = locationWeatherCache.locationAtIndex(locationIndex).nickname;
    mapLatitude = Number(locationWeatherCache.locationAtIndex(locationIndex).latitude);
    mapLongitude = Number(locationWeatherCache.locationAtIndex(locationIndex).longitude);
}