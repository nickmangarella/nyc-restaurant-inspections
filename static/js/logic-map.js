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
d3.json("http://127.0.0.1:5000/leaflet").then((data) => {
  console.log(data);

  // For loop to cycle through each object
  for (var i = 0; i < data.length; i++) {

    var manhattan = data.filter(x => x.boro === 'Manhattan');
    var staten_island = data.filter(x => x.boro === 'Staten Island');
    var queens = data.filter(x => x.boro === 'Queens');
    var bronx = data.filter(x => x.boro === 'Bronx');
    var brooklyn = data.filter(x => x.boro === 'Brooklyn');
    
    console.log(manhattan);
    console.log(staten_island);
    console.log(queens);
    console.log(bronx);
    console.log(brooklyn);
    
    // Render the restaurants as markers and call markerColor() for fillColor
    L.marker([data[i].lat, data[i].long], {
      iconColor: markerColor(data[i].score)
    }).bindPopup("<h4>" + data[i].dba + "</h4> <hr> <p>" + data[i].add + "</p>").addTo(myMap);
  }
});