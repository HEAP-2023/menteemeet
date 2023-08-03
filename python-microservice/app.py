import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from db import db
from controller.Controller import generateGroupings, getGrpsByProgID
from flask_cors import CORS, cross_origin

# Load environment variables from .env file
load_dotenv()

# Environment variables
DB_USERNAME = os.environ.get('DB_USERNAME')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_HOSTNAME = os.environ.get('DB_HOSTNAME')
DB_SCHEMA = os.environ.get('DB_SCHEMA')

# Set up server
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOSTNAME}/{DB_SCHEMA}"

# Set up connection to DB
db.init_app(app)
print("CONNECTED TO DB!")


@app.route('/api/data')
@cross_origin()
def get_data():
    data = {'message': 'Hello, CORS is enabled on this route!'}
    return jsonify(data)

# Health Check route
@app.route('/')
@cross_origin()
def index():
    return "Grouping Algo Service"

# GET Groupings route
@app.route('/get-groupings/programme/<progID>')
@cross_origin()
def getGroupingsByProgID(progID):
    return getGrpsByProgID(progID)

# POST Groupings route
@app.route("/create-groupings", methods=["POST"])
@cross_origin()
def createGroupings():
    return generateGroupings(app, request.get_json())


if __name__ == '__main__':
    app.run(debug=True, port=5100)