
d3.json("static/data/NYC_Restaurant_Inspection_Results_Clean2020.json").then((data) => {
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
        if (restaurant["BORO"]==="Queens" && restaurant["CRITICAL FLAG"]==="Y") {
            QueensCriticalY += 1;
        } else if (restaurant["BORO"]==="Queens" && restaurant["CRITICAL FLAG"]==="N") {
            QueensCriticalN += 1;
        } else if (restaurant["BORO"]==="Manhattan" && restaurant["CRITICAL FLAG"]==="Y") {
            ManCriticalY += 1;
        } else if (restaurant["BORO"]==="Manhattan" && restaurant["CRITICAL FLAG"]==="N") {
            ManCriticalN += 1;
        } else if (restaurant["BORO"]==="Staten Island" && restaurant["CRITICAL FLAG"]==="Y") {
            SICriticalY += 1;
        } else if (restaurant["BORO"]==="Staten Island" && restaurant["CRITICAL FLAG"]==="N") {
            SICriticalN += 1;
        } else if (restaurant["BORO"]==="Bronx" && restaurant["CRITICAL FLAG"]==="Y") {
            BronxCriticalY += 1;
        } else if (restaurant["BORO"]==="Bronx" && restaurant["CRITICAL FLAG"]==="N") {
            BronxCriticalN += 1;
        } else if (restaurant["BORO"]==="Brooklyn" && restaurant["CRITICAL FLAG"]==="Y") {
            BrooklynCriticalY += 1;
        } else if (restaurant["BORO"]==="Brooklyn" && restaurant["CRITICAL FLAG"]==="N") {
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
            marker: {color: "#448"}
        },
        {
            x: ["Queens", "Manhattan", "Staten Island", "Bronx", "Brooklyn"],
            y: [QueensCriticalN, ManCriticalN, SICriticalN, BronxCriticalN, BrooklynCriticalN],
            type: "bar",
            name: "N",
            barmode: "stack",
            marker: {color: "#080"}
        }];

    var barLayout = {
        title: "The Distribution of Critical Flags by Neighborhood",
        margin: { t: 30, l: 30 }
    };

    Plotly.newPlot("bar", barData, barLayout)
});

