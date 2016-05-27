// Code for the View Location page.

// Restore the selected location index from Local Storage
//
var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 

// DOM References:

var dateRef = document.getElementById("date");
var weatherRef = document.getElementById("weather");
var removeButtonRef = document.getElementById("removeButton");
var sliderRef = document.getElementById("slider");
var titleRef = document.getElementById("headerBarTitle");

// Attributes:

var today = new Date();
var mapLatitude;
var mapLongitude;
var map;

// map initialization:
//
function initMap() {
    // geolocation need plenty of time to get the current location,
    // an error will occur if this initMap function is called before
    // receiving a valid location. Therefore, we will initialize the
    // map appropriately after a short period of time
	setTimeout(function(){
		map = new google.maps.Map(document.getElementById("map"), {
    		center: {lat: mapLatitude, lng: mapLongitude},
    		zoom: 12
    	});
	},250);
    
}

// Callback function that displays weather information on the screen
//
function weatherCallback(index, weather)
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
function currentLocationResponse(response)
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
    
    // display the weather
    weatherCallback(-1, weather);
}

// Change the date when the user drags the slider
//
function sliderCallback(value)
{
    // shows loading while the information might not be there
    weatherRef.innerHTML = "Loading weather...";
    
    // display the date where the slider is dragged to
    var msecSince1970 = today.getTime();
    msecSince1970 -= (30 - value) * MSEC_PER_DAY; // minus the number of days dragged behind
    
    // create a date object where the slider is
    var sliderDate = new Date(msecSince1970);
    dateRef.innerHTML = sliderDate.simpleDateString(); // shows YYYY-MM-DD format
    locationWeatherCache.getWeatherAtIndexForDate(locationIndex, sliderDate, weatherCallback); 
}

// Remove button onClick event
//
function removeThisLocation()
{
    locationWeatherCache.removeLocationAtIndex(locationIndex);
    location.href = 'index.html';
}

// show the position and weather information at current location
//
function showCurrentLocation(position)
{
    // map initialise
    mapLatitude = position.coords.latitude;
    mapLongitude = position.coords.longitude;
    
    // request weather at current location
    var key = mapLatitude + "," + mapLongitude + "," + today.forecastDateString();
    var script = document.createElement('script');
    script.src = "https://api.forecast.io/forecast/545d94fc22b966c9fe0d025fab265e6c/" + key + "?exclude=currently,minutely,hourly&units=ca&callback=this.currentLocationResponse";
    document.body.appendChild(script);
}

// display today's date.

dateRef.innerHTML = today.simpleDateString();

// Show information of selected location:

if (locationIndex == -1)
{
    // current location case
    removeButtonRef.style.visibility = "hidden"; // hide the button
    sliderRef.style.visibility = "hidden"; // hide the slider
    titleRef.textContent = "Current location";
    navigator.geolocation.getCurrentPosition(showCurrentLocation); 
}
else
{
    // location at given index
    locationWeatherCache.getWeatherAtIndexForDate(locationIndex, today, weatherCallback);
    titleRef.textContent = locationWeatherCache.locationAtIndex(locationIndex).nickname;
    mapLatitude = Number(locationWeatherCache.locationAtIndex(locationIndex).latitude);
    mapLongitude = Number(locationWeatherCache.locationAtIndex(locationIndex).longitude);
}