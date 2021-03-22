import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, render_template, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///static/data/NYC_Restaurant_Inspection_Results_Clean2020.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
nyc = Base.classes.NYCInspect


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    """Render HTML"""    

    return render_template("index.html")
    



@app.route("/leaflet")
def leaflet():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query lats and longs
    nycLat = session.query(nyc.dba, nyc.boro, nyc.score, nyc.address, nyc.latitude, nyc.longitude).\
    distinct().filter(nyc.latitude != 0.0).all()

    session.close()
    
    all_latslongs = []
    
    for dba, boro, score, add, lat, lng in nycLat:
        nycLat_dict = {}
        nycLat_dict["Name"] = dba
        nycLat_dict["Boro"] = boro
        nycLat_dict["Score"] = score
        nycLat_dict["Address"] = add
        nycLat_dict["Lat"] = lat
        nycLat_dict["Long"] = lng
        all_latslongs.append(nycLat_dict)   
    
    return jsonify(all_latslongs)

        
    
    
@app.route("/api/v1.0/info")
def info():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query name
    nycInfo = session.query(nyc.camis, nyc.dba, nyc.cuisine_description, nyc.boro, nyc.address, nyc.phone, nyc.score).\
    distinct().order_by(nyc.dba).all()

    session.close()

    # Convert list of tuples into normal list
    info = []
    
    for camis, dba, cuisine, boro, address, phone, score in nycInfo:
        nycInfo_dict = {}
        nycInfo_dict["ID"] = camis
        nycInfo_dict["Name"] = dba
        nycInfo_dict["Cuisine"] = cuisine
        nycInfo_dict["Boro"] = boro
        nycInfo_dict["Address"] = address
        nycInfo_dict["Phone"] = phone
        nycInfo_dict["Score"] = score    
        info.append(nycInfo_dict)  

    return jsonify(info)
   
   
@app.route("/api/v1.0/small_map")
def small_map():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query data for most active station
    nycsmall_map = session.query(nyc.camis, nyc.dba, nyc.violation_description, nyc.latitude, nyc.longitude).\
    distinct().filter(nyc.latitude != 0.0).all()

    session.close()

    # Convert list of tuples into normal list
    small_map = []
    
    for camis, dba, vio, lat, long in nycsmall_map:
        nycsmall_map_dict = {}
        nycsmall_map_dict["ID"] = camis
        nycsmall_map_dict["Name"] = dba
        nycsmall_map_dict["Violation"] = vio
        nycsmall_map_dict["Lat"] = lat
        nycsmall_map_dict["Long"] = long
        small_map.append(nycsmall_map_dict)

    return jsonify(small_map)


@app.route("/api/v1.0/gauge")
def gauge():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query data for most active station
    nycgauge = session.query(nyc.dba, nyc.score).\
    distinct().filter(nyc.latitude != 0.0).all()

    session.close()

    # Convert list of tuples into normal list     
    gauge = []
    
    for dba, score in nycgauge:
        gauge_dict = {}
        gauge_dict["dba"] = dba
        gauge_dict["score"] = score
        gauge.append(gauge_dict)

    return jsonify(gauge)


@app.route("/api/v1.0/critical_flag")
def critical_flag():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query data for most active station
    nycflag = session.query(nyc.dba, nyc.boro, nyc.critical_flag, nyc.camis).\
    distinct().filter(nyc.latitude != 0.0).order_by(nyc.dba).all()

    session.close()

    # Convert list of tuples into normal list     
    flag = []
    
    for dba, boro, cflag, camis in nycflag:
        flag_dict = {}
        flag_dict["Name"] = dba
        flag_dict["boro"] = boro
        flag_dict["flag"] = cflag
        flag_dict["ID"] = camis    
        flag.append(flag_dict)

    return jsonify(flag)




if __name__ == '__main__':
    app.run(debug=True)