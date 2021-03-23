// Create map
var myMap = L.map("boroMap", {
  center: [40.7128, -74.0060],
  zoom: 12,
  layers: [Rats, Roaches]
});

// Add the tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v9",
  accessToken: API_KEY
}).addTo(myMap)

// Connect to database route
fetch("http://127.0.0.1:5000/leaflet").then(response => response.json()).then((data) => {
  
  var rat = data.filter(x => x.Violation_Code === "04K");
  var roach = data.filter(x => x.Violation_Code === "04M");

  console.log(rat);
  console.log(roach);
    

  // For loop to cycle through Manhattan restaurants
  for (var i = 0; i < rat.length; i++) {

    // Render the restaurants as markers and call markerColor()
    var Rats = L.circle([rat[i].Lat, rat[i].Long], {
      color: "white",
      fillColor: "#FF00FF",
      fillOpacity: 1,
      radius: 50,
      weight: 1
    })
    .bindPopup("<h4>" + rat[i].Name + "</h4> <hr> <p>" + rat[i].Address + "</p> <p>" + rat[i]. + "</p>").addTo(myMap);
  }

  // For loop to cycle through Staten Island restaurants
  for (var i = 0; i < roach.length; i++) {

    // Render the restaurants as markers and call markerColor()
    var Roaches = L.circle([roach[i].Lat, roach[i].Long], {
      color: "white",
      fillColor: "#7FFFD4",
      fillOpacity: 1,
      radius: 50,
      weight: 1
    })
    .bindPopup("<h4>" + roach[i].Name + "</h4> <hr> <p>" + roach[i].Address + "</p> <br> <p>" + roach[i]. + "</p>").addTo(myMap);
  }
}).catch(err => console.error(err));