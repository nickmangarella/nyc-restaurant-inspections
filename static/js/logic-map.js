// Create map
var myMap = L.map("boroMap", {
  center: [40.7128, -74.0060],
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
d3.json("http://127.0.0.1:5000/leaflet", function(data) {
  // var manhattan = data.filter(x => x.boro === 'Manhattan')
  console.log(data);
  var restaurants = data;
  console.log(restaurants);

  // For loop to cycle through each object
  for (var i = 0; i < restaurants.length; i++) {
    
    // Render the restaurants as markers and call markerColor() for fillColor
    L.marker([restaurants[i].lat, restaurants[i].long], {
      color: "white",
      fillColor: markerColor(restaurants.score),
      fillOpacity: 1
    }).bindPopup("<h4>" + restaurants[i].dba + "</h4> <hr> <p>" + restaurants[i].address + "</p>").addTo(myMap);
  }
});