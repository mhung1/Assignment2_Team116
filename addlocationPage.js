// Code for the Add Location page.

    function initialize() 
            {
             var mapProp = 
            {
            center:new google.maps.LatLng(-37.908042,145.1325757),
            zoom:15,
            mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
            }
     google.maps.event.addDomListener(window, 'load', initialize);

var searchButtonRef = document.getElementId("searchButton");
var addLocationButtonRef = document.getElementId("addLocation");

function buttonclick()
{
 var script = document.createElement('script');
            script.src = "https://maps.googleapis.com/maps/api/geocode/json?address=Monash+University&key=AIzaSyAlmgZ1Nj0KIWIRSEKsQVHFFwAW78hy1G4&callback=this.geoResponse";
            document.body.appendChild(script);
}

function geoResponse (response)
{
   lat = response.geometry.location.lat;
   lng = response.geometry.location.lng;

}

