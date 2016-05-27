// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationIndex) {
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationIndex);
    // And load the view location page.
    location.href = 'viewlocation.html';
}

var today = new Date();
var outputAreaRef = document.getElementById("locationList");

//Display locations list
for (var index = 0; index <= LocationWeatherCache.length; index++) {

    locationWeatherCache.getWeatherAtIndexForDate(index, today, showWeather);

};

//HTML formatting of weather information for locations
function showWeather(index, weather) {
    var output = "<li class=\"mdl-list__item mdl-list__item--two-line\" onclick=\"viewLocation(-1);\"> <span class=\"mdl-list__item-primary-content\"> <img class=\"mdl-list__item-icon\" id=\"icon\" src=\"images/loading.png\" class=\"list-avatar\" /> <span>Current Location</span> </span> </li>";
    tempMin = weather.temperatureMax
    tempMax = weather.temperatureMax

    output += "<li class=\"mdl-list__item mdl-list__item--two-line\" onclick=\"viewLocation(" + index + ");\">";
    output += "<span class=\"mdl-list__item-primary-content\">";
    output += "<img class=\"mdl-list__item-icon\" id=\" weather.icon \" src=\"images/" + weather.icon+ ".png\" class=\"list-avatar\" />";
    output += "<span>" + locationWeatherCache.locationAtIndex(index).nickname + "</span>";
    output += "<span id=\"weather" + index + "\" class=\"mdl-list__item-sub-title\">";
    output += "Low: " + tempMin + ", " + "High: " + tempMax + "</span></span></li>";

    outputAreaRef.innerHTML += output;
};