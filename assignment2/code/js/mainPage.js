// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationName) {
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName);
    // And load the view location page.
    location.href = 'viewlocation.html';
}

for (index = 0; index <= LocationWeatherCache.length; index++) {
    loadLocations();
    var outputAreaRef = document.getElementById("locationsListRef")
    var output;
    
    output += locationWeatherCache.locationAtIndex(index)
    
    outputAreaRef.innerHTML = output
    
    
}

 /*<li class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation(0);">
                <span class="mdl-list__item-primary-content">
                  <img class="mdl-list__item-icon" id="icon0" src="images/loading.png" class="list-avatar" />
                  <span>Location A</span>
                  <span id="weather0" class="mdl-list__item-sub-title">Weather summary</span>
                </span>
              </li>
              
*/
