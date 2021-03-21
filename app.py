import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


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
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/leaflet<br/>"
        f"/api/v1.0/info<br/>"
        f"/api/v1.0/small_map<br/>"
        f"/api/v1.0/gauge<br/>"         
        f"/api/v1.0/critical_flag"
    )


@app.route("/leaflet")
def leaflet():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query lats and longs
    nycLat = session.query(nyc.Latitude, nyc.Longitude).\
    distinct().filter(nyc.Latitude != 0.0).all()

    session.close()
    
    all_latslongs = []
    
    for lat, long in nycLat:
        nycLat_dict = {}
        nycLat_dict["lat"] = lat
        nycLat_dict["long"] = long
        all_latslongs.append(nycLat_dict)   
    
    return jsonify(all_latslongs)

        
    
    
# @app.route("/api/v1.0/info")
# def info():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Query name
#     results = session.query(sta.station).all()

#     session.close()

#     # Convert list of tuples into normal list
#     stations = list(np.ravel(results))

#     return jsonify(stations)
   
   
@app.route("/api/v1.0/small_map")
def small_map():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query data for most active station
    nycsmall_map = session.query(nyc.DBA, nyc.Latitude, nyc.Longitude).\
    distinct().filter(nyc.Latitude != 0.0).all()

    session.close()

    # Convert list of tuples into normal list
    small_map = []
    
    for dba, lat, long in nycsmall_map:
        nycsmall_map_dict = {}
        nycsmall_map_dict["dba"] = dba
        nycsmall_map_dict["lat"] = lat
        nycsmall_map_dict["long"] = long
        small_map.append(nycsmall_map_dict)

    return jsonify(small_map)


@app.route("/api/v1.0/gauge")
def gauge():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query data for most active station
    nycgauge = session.query(nyc.DBA, nyc.SCORE).\
    distinct().filter(nyc.Latitude != 0.0).all()

    session.close()

    # Convert list of tuples into normal list     
    gauge = []
    
    for dba, score in nycgauge:
        gauge_dict = {}
        gauge_dict["dba"] = dba
        gauge_dict["score"] = score
        gauge.append(gauge_dict)

    return jsonify(gauge)


    




















# @app.route("/api/v1.0/<start>")
# def start_date(start):
    
#     # Create our session (link) from Python to the DB
#     session = Session(engine)
    
#     # Query funcs to grab data that will tie back to input from user
#     sel = [func.min(meas.tobs), func.max(meas.tobs), func.avg(meas.tobs)]

#     funcs = session.query(*sel).filter(meas.date >= start).all()

#     session.close()
        
#     # Convert list of tuples into normal list
#     output = list(np.ravel(funcs))
#     return jsonify(output)


# @app.route("/api/v1.0/<start>/<end>")
# def start_end(start, end):
    
#     # Create our session (link) from Python to the DB
#     session = Session(engine)
    
#     # Query funcs to grab data that will tie back to input from user
#     sel = [func.min(meas.tobs), func.max(meas.tobs), func.avg(meas.tobs)]

#     funcs = session.query(*sel).\
#     filter(meas.date >= start).\
#     filter(meas.date <= end).all()

#     session.close()
        
#     # Convert list of tuples into normal list
#     output = list(np.ravel(funcs))
#     return jsonify(output)
   
    


if __name__ == '__main__':
    app.run(debug=True)