// Create a map object
var myMap = L.map("map", {
  center: [40.7128, -74.0060],
  zoom: 8
});
    
// Add the tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbob/light-v9",
  accessToken: API_KEY
}).addTo(myMap);

// Function to set the circle colors to a range of scores
function circleColor(score) {
    return score > 28 ? "#" :
           score > 27 ? "#" :
           score > 14 ? "#" :
           score > 13 ? "#" :
           score > 0  ? "#" :
                        "#" ;
}

// Set up Legend
var legend = L.control({position: "bottomright"});
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 13, 14, 27, 28]

  // Loop through the depth intervals
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + circleColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}
  return div;
};
legend.addTo(myMap);


d3.json("", function(data) {
  
  // For loop to cycle through each object
  for (var i = 0; i < data.length; i++) {
    
    // Render the restaurants as circles and call circleColor() for fillColor
    L.circle([data.Latitude, data.Longitude], {
      color: "white",
      fillColor: circleColor(data.SCORE),
      fillOpacity: 0.8,
      radius: 1000
    }).bindPopup().addTo(myMap);
  }
});