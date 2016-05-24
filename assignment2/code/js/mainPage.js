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

for (var index = 0; index <= LocationWeatherCache.length; index++) {
    
    var outputAreaRef = document.getElementById("locationsListRef")
    var output;
    
    
    output += locationWeatherCache.locationAtIndex(index)
    output += '<li class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation('index');"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="'locationWeatherCache.weatherResponse.weather.icon(index)'" src="images/loading.png" class="list-avatar" /><span>'locationWeatherCache.locations.nickname(index)'</span><span id="weather'index'" class="mdl-list__item-sub-title">'this.getWeatherAtIndexForDate(index, today, callback)'</span></span></li>'
    
    outputAreaRef.innerHTML = output
    
    
};


