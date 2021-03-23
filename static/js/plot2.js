
d3.json("http://127.0.0.1:5000/api/v1.0/critical_flag").then((data) => {
    var QueensCriticalY = 0;
    var QueensCriticalN = 0;
    var ManCriticalY = 0;
    var ManCriticalN = 0;
    var SICriticalY = 0;
    var SICriticalN = 0;
    var BronxCriticalY = 0;
    var BronxCriticalN = 0;
    var BrooklynCriticalY = 0;
    var BrooklynCriticalN = 0;

    data.forEach((restaurant) => {
        if (restaurant["boro"]==="Queens" && restaurant["flag"]==="Y") {
            QueensCriticalY += 1;
        } else if (restaurant["boro"]==="Queens" && restaurant["flag"]==="N") {
            QueensCriticalN += 1;
        } else if (restaurant["boro"]==="Manhattan" && restaurant["flag"]==="Y") {
            ManCriticalY += 1;
        } else if (restaurant["boro"]==="Manhattan" && restaurant["flag"]==="N") {
            ManCriticalN += 1;
        } else if (restaurant["boro"]==="Staten Island" && restaurant["flag"]==="Y") {
            SICriticalY += 1;
        } else if (restaurant["boro"]==="Staten Island" && restaurant["flag"]==="N") {
            SICriticalN += 1;
        } else if (restaurant["boro"]==="Bronx" && restaurant["flag"]==="Y") {
            BronxCriticalY += 1;
        } else if (restaurant["boro"]==="Bronx" && restaurant["flag"]==="N") {
            BronxCriticalN += 1;
        } else if (restaurant["boro"]==="Brooklyn" && restaurant["flag"]==="Y") {
            BrooklynCriticalY += 1;
        } else if (restaurant["boro"]==="Brooklyn" && restaurant["flag"]==="N") {
            BrooklynCriticalN += 1;
        } 
    });
    console.log(`QueensCriticalY ${QueensCriticalY}`)
    console.log(`QueensCriticalN ${QueensCriticalN}`)
    console.log(`ManCriticalY ${ManCriticalY}`)
    console.log(`ManCriticalN ${ManCriticalN}`)
    console.log(`SICriticalY ${SICriticalY}`)
    console.log(`SICriticalN ${SICriticalN}`)
    console.log(`BronxCriticalY ${BronxCriticalY}`)
    console.log(`BronxCriticalN ${BronxCriticalN}`)
    console.log(`BrooklynCriticalY ${BrooklynCriticalY}`)
    console.log(`BrooklynCriticalN ${BrooklynCriticalN}`)

    var barData = [
        {
            x: ["Queens", "Manhattan", "Staten Island", "Bronx", "Brooklyn"],
            y: [QueensCriticalY, ManCriticalY, SICriticalY, BronxCriticalY, BrooklynCriticalY],
            type: "bar",
            name: "Y",
            barmode: "stack",
            marker: {color: "#FA8072"}
        },
        {
            x: ["Queens", "Manhattan", "Staten Island", "Bronx", "Brooklyn"],
            y: [QueensCriticalN, ManCriticalN, SICriticalN, BronxCriticalN, BrooklynCriticalN],
            type: "bar",
            name: "N",
            barmode: "stack",
            marker: {color: "#B0C4DE"}
        }];

    var barLayout = {
        title: "Critical Flag Distribution by Neighborhood",
        margin: { t: 30, l: 30 }
    };

    Plotly.newPlot("bar", barData, barLayout)
});

