// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationIndex) {
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName);
    // And load the view location page.
    location.href = 'viewlocation.html';
}
loadLocations();
var today = new Date()
var outputAreaRef = document.getElementById("locationsListRef")

for (var index = 0; index <= LocationWeatherCache.length; index++) {

    locationWeatherCache.getWeatherAtIndexForDate(index, today, [callback]);


};

function showWeather(index, weather) {
    var output = "";
    tempMin = weather.temperatureMax
    tempMax = weather.temperatureMax

    output = '<li class=\"mdl-list__item mdl-list__item--two-line" onclick="viewLocation(' + index + ');"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="'
    weather.icon '" src="images/loading.png" class="list-avatar" /><span>'
    locationWeatherCache.locationAtIndex(index).nickname(index)
    '</span><span id="weather'
    index '" class="mdl-list__item-sub-title">' + tempMin + ", " + tempMax
    '</span></span></li>'

    outputAreaRef.innerHTML += output    
}