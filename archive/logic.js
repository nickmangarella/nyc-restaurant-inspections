function buildPanel(dba) {
    // use D3 to fetch json file
    d3.json("static/data/NYC_Restaurant_Inspection_Results_Clean2020.json").then((data) => {
        // console.log(data);

        var infoArray = data.filter(restaurant => restaurant.DBA == dba);
        console.log(infoArray);

        var infoObject = infoArray[0];
        console.log(infoObject);

        var restaurantPanel = d3.select("#sample-metadata");
        restaurantPanel.html("");
        Object.entries(infoObject).forEach(([key, value]) => {
            restaurantPanel.append("h5").text(`${key}: ${value}`);
        });

        buildGauge(infoObject.SCORE);

    });
}

var myMap = L.map("map", {
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

// Function to set the marker colors to a range of scores
function markerColor(score) {
  return score > 28 ? "#FF8C00" :
         score > 27 ? "#FF8C00" :
         score > 14 ? "#2E8B57" :
         score > 13 ? "#2E8B57" :
         score > 0  ? "#4169E1" :
                      "#4169E1" ;
};

function buildMarker(dba) {

  markersLayer.clearLayers();

  d3.json("static/data/NYC_Restaurant_Inspection_Results_Clean2020.json").then((data) => {
    var marker;
    var infoArray = data.filter(restaurant => restaurant.DBA == dba);
    var infoObject = infoArray[0];
    var lat = infoObject.Latitude;
    var lon = infoObject.Longitude;
      
    marker = L.marker([lat, lon], {
      color: "white",
      fillColor: markerColor(infoObject.score),
      fillOpacity: 1}).bindPopup("<h3>" + infoObject.dba + "</h3> <hr> <h4>" + infoObject.violation_code + "</h4> <h4>" + infoObject.violation_description + "</h4>");
    markersLayer.addLayer(marker);
    console.log(markers);
  });
  
}

function buildGauge(SCORE) {
    // Enter the washing frequency between 0 and 180
    var level = parseFloat(SCORE);
  
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
    d3.json("static/data/NYC_Restaurant_Inspection_Results_Clean2020.json").then((data) => {
            var dbaArray = [];
            data.forEach((restaurant) => {
                dbaArray.push(restaurant.DBA);
                // console.log(dbaArray);
            });

            dbaArray.forEach((dba) => {
                d3.select("#selDataset")
                .append("option")
                .text(dba)
                .property("value", dba)
            });

    // Initialise the Test Subject ID with the first test subject ID from the names list
    const firstDBA = dbaArray[0];
    
    // Initialise the Demographic Info and Plots with the first test subject ID
    buildPanel(firstDBA);
    buildMarker(firstDBA)
    });
}

// Update New info and Plots by optionChanged function
function optionChanged(newdba) {
    buildPanel(newdba);
    buildMarker(newdba);
}

// Initialise the dashboard
init();