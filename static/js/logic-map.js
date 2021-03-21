// Create map
var myMap = L.map("boroMap", {
  center: [40.7128, -74.0059],
  zoom: 10
});

// Add the tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap)

// Function to set the marker colors to a range of scores
function markerColor(score) {
    return score > 28 ? "#FF8C00" :
           score > 27 ? "#FF8C00" :
           score > 14 ? "#2E8B57" :
           score > 13 ? "#2E8B57" :
           score > 0  ? "#4169E1" :
                        "#4169E1" ;
}

// Connect to database route
d3.json("static/data/NYC_Restaurant_Inspection_Results_Clean2020.json", function(data) {
  // var manhattan = data.id.filter(x => x.boro === 'Manhattan')
  var restaurants = data.id;
  console.log(restaurants);

  // For loop to cycle through each object
  for (var i = 0; i < restaurants.length; i++) {
    
    // Render the restaurants as markers and call markerColor() for fillColor
    L.marker([restaurants[i].latitude, restaurants[i].longitude], {
      color: "white",
      fillColor: markerColor(restaurants.score),
      fillOpacity: 1
    }).bindPopup("<h3>" + restaurants[i].dba + "</h3> <hr> <h4>" + restaurants[i].violation_code + "</h4> <h4>" + restaurants[i].violation_description + "</h4>").addTo(myMap);
  }
});