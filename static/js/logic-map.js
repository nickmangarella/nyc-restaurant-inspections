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
  id: "mapbox/light-v9",
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
};

// Connect to database route
fetch("http://127.0.0.1:5000/leaflet").then(response => response.json()).then((data) => {
  console.log(data);

  var manhattan = data.filter(x => x.Boro === "Manhattan");
  var staten_island = data.filter(x => x.Boro === "Staten Island");
  var queens = data.filter(x => x.Boro === "Queens");
  var bronx = data.filter(x => x.Boro === "Bronx");
  var brooklyn = data.filter(x => x.Boro === "Brooklyn");
    
  console.log(manhattan);
  console.log(staten_island);
  console.log(queens);
  console.log(bronx);
  console.log(brooklyn);
    

  // For loop to cycle through Manhattan restaurants
  for (var i = 0; i < manhattan.length; i++) {

    // Render the restaurants as markers and call markerColor() for fillColor
    L.marker([manhattan[i].Lat, manhattan[i].Long], {
      iconColor: markerColor(manhattan[i].Score)
    }).bindPopup("<h4>" + manhattan[i].Name + "</h4> <hr> <p>" + manhattan[i].Address + "</p> <br> <p>" + manhattan[i].Score + "</p>").addTo(myMap);
  }

  // For loop to cycle through Staten Island restaurants
  for (var i = 0; i < staten_island.length; i++) {

    // Render the restaurants as markers and call markerColor() for fillColor
    L.marker([staten_island[i].Lat, staten_island[i].Long], {
      iconColor: markerColor(staten_island[i].Score)
    }).bindPopup("<h4>" + staten_island[i].Name + "</h4> <hr> <p>" + staten_island[i].Address + "</p> <br> <p>" + staten_island[i].Score + "</p>").addTo(myMap);
  }

  // For loop to cycle through Queens restaurants
  for (var i = 0; i < queens.length; i++) {

    // Render the restaurants as markers and call markerColor() for fillColor
    L.marker([queens[i].Lat, queens[i].Long], {
      iconColor: markerColor(queens[i].Score)
    }).bindPopup("<h4>" + queens[i].Name + "</h4> <hr> <p>" + queens[i].Address + "</p> <br> <p>" + queens[i].Score + "</p>").addTo(myMap);
  }

  // For loop to cycle through Bronx restaurants
  for (var i = 0; i < bronx.length; i++) {

  // Render the restaurants as markers and call markerColor() for fillColor
    L.marker([bronx[i].Lat, bronx[i].Long], {
      iconColor: markerColor(bronx[i].Score)
    }).bindPopup("<h4>" + bronx[i].Name + "</h4> <hr> <p>" + bronx[i].Address + "</p> <br> <p>" + bronx[i].Score + "</p>").addTo(myMap);
  }

  // For loop to cycle through Brooklyn restaurants
  for (var i = 0; i < brooklyn.length; i++) {

    // Render the restaurants as markers and call markerColor() for fillColor
    L.marker([brooklyn[i].Lat, brooklyn[i].Long], {
      iconColor: markerColor(brooklyn[i].Score)
    }).bindPopup("<h4>" + brooklyn[i].Name + "</h4> <hr> <p>" + brooklyn[i].Address + "</p> <br> <p>" + brooklyn[i].Score + "</p>").addTo(myMap);
  }
}).catch(err => console.error(err));