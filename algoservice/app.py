from flask import Flask, request, jsonify
from GroupingGen import generateGroupings
from Mentor import Mentor
from Mentee import Mentee

app = Flask(__name__)

@app.route('/')
def index():
    return "Grouping Algo Service"


@app.route("/create-groupings", methods=["POST"])
def createGroupings():
    data = request.get_json()
    
    mentors = [Mentor(m["name"], m["skills"]) for m in data["mentors"]]
    mentees = [Mentee(m["name"]) for m in data["mentees"]]
    groupings = generateGroupings(mentors, mentees)
    
    return jsonify([mentor.jsonEncoder() for mentor in groupings]), 201


if __name__ == '__main__':
    app.run(debug=True, port=5100)