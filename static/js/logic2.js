function buildPanel(id) {
    // use D3 to fetch json file
    d3.json("http://127.0.0.1:5000/api/v1.0/info").then((data) => {
        // console.log(data);

        var infoArray = data.filter(restaurant => restaurant.ID == id);
        console.log(infoArray);

        var infoObject = infoArray[0];
        console.log(infoObject);

        var restaurantPanel = d3.select("#sample-metadata");
        restaurantPanel.html("");
        Object.entries(infoObject).forEach(([key, value]) => {
            restaurantPanel.append("h5").text(`${key}: ${value}`);
        });

        buildGauge(infoObject.Score);

    });
}

var myMap = L.map("map_s", {
  center: [40.7128, -74.0060],
  zoom: 10
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var markers = [];
var markersLayer = new L.layerGroup();
markersLayer.addTo(myMap);

function buildMarker(id) {

  markersLayer.clearLayers();

  d3.json("http://127.0.0.1:5000/api/v1.0/small_map").then((data) => {
    var marker;
    var infoArray = data.filter(restaurant => restaurant.ID == id);
    var infoObject = infoArray[0];
    var lat = infoObject.Lat;
    var long = infoObject.Long;
    var violation = infoObject.Violation;
      
    marker = L.marker([lat, long]).bindPopup("<p>" + violation + "</p>");
    markersLayer.addLayer(marker);
    
  });
  
}

function buildGauge(Score) {
    // Enter the washing frequency between 0 and 180
    var level = parseFloat(Score);
  
    // Trig to calc meter point
    var degrees = 180 - level;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
  
    // Path: may have to change to create a better triangle
    var mainPath = "M -.0 -0.05 L .0 0.05 L ";
    var pathX = String(x);
    var space = " ";
    var pathY = String(y);
    var pathEnd = " Z";
    var path = mainPath.concat(pathX, space, pathY, pathEnd);
  
    var data = [
      {
        type: "scatter",
        x: [0],
        y: [0],
        marker: { size: 12, color: "850000" },
        showlegend: false,
        name: "score",
        text: level,
        hoverinfo: "text+name"
      },
      {
        values: [500 / 12, 50 / 12, 50 / 12, 50],
        rotation: 90,
        text: ["C", "B", "A", ""],
        textinfo: "text",
        textposition: "inside",
        marker: {
          colors: [
            "rgba(255, 140, 0, 1)",
            "rgba(46, 139, 87, 0.9)",
            "rgba(65, 105, 225, 1)",
            "rgba(255, 255, 255, 0)"
          ]
        },
        labels: ["28+", "14-27", "0-13", ""],
        hoverinfo: "label",
        hole: 0.5,
        type: "pie",
        showlegend: false
      }
    ];
  
    var layout = {
      shapes: [
        {
          type: "path",
          path: path,
          fillcolor: "850000",
          line: {
            color: "850000"
          }
        }
      ],
      title: "New York City Restaurant Inspection Grade",
      height: 400,
      width: 400,
      xaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      },
      yaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      }
    };
  
    var GAUGE = document.getElementById("gauge");
    Plotly.newPlot(GAUGE, data, layout);
  }

function init() {
    // D3 to fetch json file
    d3.json("http://127.0.0.1:5000/api/v1.0/info").then((data) => {
            var IDArray = [];
            
            data.forEach((restaurant) => {
                IDArray.push(restaurant.ID);
                
            });

            IDArray.forEach((id) => {
                d3.select("#selDataset")
                .append("option")
                .text(id)
                .property("value", id)
            });

    // Initialise the Test Subject ID with the first test subject ID from the names list
    const firstID = IDArray[0];
    
    // Initialise the Demographic Info and Plots with the first test subject ID
    buildPanel(firstID);
    buildMarker(firstID)
    });
}

// Update New info and Plots by optionChanged function
function optionChanged(newid) {
    buildPanel(newid);
    buildMarker(newid);
}

// Initialise the dashboard
init();