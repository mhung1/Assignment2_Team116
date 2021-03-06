// Returns a date in the format "YYYY-MM-DD".
Date.prototype.simpleDateString = function() {
    function pad(value)
    {
        return ("0" + value).slice(-2);
    }

    var dateString = this.getFullYear() + "-" + 
            pad(this.getMonth() + 1, 2) + '-' + 
            pad(this.getDate(), 2);
    
    return dateString;
}

// Date format required by forecast.io API.
// We always represent a date with a time of midday,
// so our choice of day isn't susceptible to time zone errors.
Date.prototype.forecastDateString = function() {
    return this.simpleDateString() + "T12:00:00";
}

// CONSTANT:

var MSEC_PER_DAY = 86400000;

// Code for LocationWeatherCache class and other shared code.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";

function LocationWeatherCache()
{
    // Private attributes:

    var locations = [];
    var callbacks = {};

    // Public methods:
    
    // Returns the number of locations stored in the cache.
    //
    this.length = function() {
        return locations.length;
    };
    
    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function(index) {
        if(index > locations.length)
        {
            console.log("Error: location at index " + index + " does not exist.")
            return undefined;
        }
        return locations[index];
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function(latitude, longitude, nickname)
    {
        var newLocation = {
            latitude: latitude,
            longitude: longitude,
            nickname: nickname,
            forecasts: {}
        };
        
        locations.push(newLocation);
        saveLocations();
        return locations.length - 1; // the index of the new added location should be the last item in the array
    }

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
        locations.splice(index, 1);
        saveLocations();
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() {
        // trasfer the private variables into an object
        
        var locationWeatherCachePDO = {
            locations: locations
        };
        
        return locationWeatherCachePDO;
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
        locations = locationWeatherCachePDO.locations;            
    };

    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the 
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the 
    // weather object for that location.
    // 
    this.getWeatherAtIndexForDate = function(index, date, callback) {
        var key = locations[index].latitude + "," + locations[index].longitude + "," + date.forecastDateString();
        
        if(locations[index].forecasts.hasOwnProperty(key))
        {
            callback(index, locations[index].forecasts[key]);
        }
        else
        {   // API call is needed
            
            callbacks[key] = callback; // temporary save the callback function for later use
            var script = document.createElement('script');
            script.src = "https://api.forecast.io/forecast/545d94fc22b966c9fe0d025fab265e6c/" + key + "?exclude=currently,minutely,hourly&units=ca&callback=this.locationWeatherCache.weatherResponse";
            document.body.appendChild(script);
        }
    };
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) {
        // get the index of selected location
        var index = indexForLocation(response.latitude,response.longitude);
        
        // create the date, since the time of the result data is at mid night of that day.
        // to prevent any time zone errors, we should use the mid-day time so we add msec of a half day
        var date = new Date(1000 * response.daily.data[0].time + 0.5 * MSEC_PER_DAY).forecastDateString();
        var key = response.latitude + "," + response.longitude + "," + date;
        
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
        
        locations[index].forecasts[key] = weather;
        saveLocations();
        
        callbacks[key](index, weather); // call the saved callback function

    };

    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    {
        for(var i = 0; i < locations.length; i++)
        {
            if (latitude == locations[i].latitude && longitude == locations[i].longitude)
            {
                return i; // return the index of matched location
            }
        }
        
        return -1; // does not match any location
    }
}

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
    var locationWeatherCacheJSON = localStorage.getItem(APP_PREFIX + "-cache");
    if (locationWeatherCacheJSON)
    {
        var locationWeatherCachePDO = JSON.parse(locationWeatherCacheJSON);
        locationWeatherCache = new LocationWeatherCache();
        locationWeatherCache.initialiseFromPDO(locationWeatherCachePDO);
    }
    else
    {
        console.log("Error: local storage item not found.")
        
        // create an empty cache
        locationWeatherCache = new LocationWeatherCache();
    }
}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations()
{
    localStorage.setItem(APP_PREFIX + "-cache", JSON.stringify(locationWeatherCache));
}

// load the locations once whenever a page is loaded.
loadLocations();
