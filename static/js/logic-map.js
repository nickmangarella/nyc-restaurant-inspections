// Arrays to hold circles
var ratCircles = [];
var roachCircles = [];

// Fetch the data with the flask route
fetch("http://127.0.0.1:5000/leaflet").then(response => response.json()).then((data) => {
  
  // Filter restaurants by rat and roach violation codes
  var rats = data.filter(x => x.Violation_Code === "04K");
  var roaches = data.filter(x => x.Violation_Code === "04M");

  console.log(rats);
  console.log(roaches);
    

  // For loop to go through restaurants with rats
  for (var i = 0; i < rats.length; i++) {

    // Render the restaurants as circles
    ratCircles.push(
      L.circle([rats[i].Lat, rats[i].Long], {
        color: "white",
        fillColor: "#FF00FF",
        fillOpacity: 1,
        radius: 50,
        weight: 1
      }).bindPopup("<h4>" + rats[i].Name + "</h4> <hr> <p>" + rats[i].Address + "</p> <p>" + rats[i].Violation_Desc + "</p>")
    );
  }
  
  // For loop to go through restaurants with roaches
  for (var i = 0; i < roaches.length; i++) {

    // Render the restaurants as circles
    roachCircles.push(
      L.circle([roaches[i].Lat, roaches[i].Long], {
        color: "white",
        fillColor: "#7FFFD4",
        fillOpacity: 1,
        radius: 50,
        weight: 1
      }).bindPopup("<h4>" + roaches[i].Name + "</h4> <hr> <p>" + roaches[i].Address + "</p> <p>" + roaches[i].Violation_Desc + "</p>")
    );
  }
console.log(ratCircles);
console.log(roachCircles);

// Add rat and roach cirlces to new layer groups
var ratsLayer = new L.layerGroup(ratCircles);
var roachesLayer = new L.layerGroup(roachCircles);

// Overlays that may be toggled on or off
var overlayLayers = {
  Rats: ratsLayer,
  Roaches: roachesLayer
};

// Create map
var myMap = L.map("rrMap", {
  center: [40.7397, -73.9763],
  zoom: 12,
  layers: [ratsLayer, roachesLayer]
});

// Add the tile layer
var darkLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v9",
  accessToken: API_KEY
}).addTo(myMap);

// Pass layers into layer control
L.control.layers(null, overlayLayers).addTo(myMap);
}).catch(err => console.error(err));
