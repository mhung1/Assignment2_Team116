// Code for the Add Location page.
loadLocations();

// DOM References:
var locationInputRef = document.getElementById("locationInput");
var nickNameInputRef = document.getElementById("nickNameInput");
var searchButtonRef = document.getElementById("searchButton");
var addLocationButtonRef = document.getElementById("addlocationButton");

// map initialize
//
function initialize() 
{
  var map=new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
  });
  var geocoder=new google.maps.Geocoder();
   document.getElementById('submit')addEventListener('click',function() {
    geocodeAdress(geocoder, map);  
   });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      
        lat=results[0].geometry.loacation.lat();
        lng=results[0].geometry.location.lng();
        
        addressRef.value = results[0].formatted_address;
    
        
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


// search the location
//
function search()
{
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locationInputRef.value +"&key=AIzaSyAlmgZ1Nj0KIWIRSEKsQVHFFwAW78hy1G4&callback=this.geoResponse";
    document.body.appendChild(script);
}




// execute when addlocation button is clicked
function addLocation ()
{
    locationWeatherCache.addLocation(lat, lng, nickNameInputRef.value);
    location.href = 'index.html'; // go back to main page
}
