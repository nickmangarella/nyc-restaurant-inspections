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
        f"/api/v1.0/latlong<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/start<br/>"         
        f"/api/v1.0/start/end"
    )


@app.route("/api/v1.0/latlong")
def latlong():
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

        
    
    
# @app.route("/api/v1.0/stations")
# def stations():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Query all stations
#     results = session.query(sta.station).all()

#     session.close()

#     # Convert list of tuples into normal list
#     stations = list(np.ravel(results))

#     return jsonify(stations)
   
   
# @app.route("/api/v1.0/tobs")
# def tobs():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Query data for most active station
#     tempfreq = session.query(meas.station, meas.date, meas.tobs).\
#     filter(meas.station == 'USC00519281').\
#     filter(meas.date > '2016-08-23').order_by(meas.date).all()

#     session.close()

#     # Convert list of tuples into normal list
#     temps = list(np.ravel(tempfreq))

#     return jsonify(temps)


    
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