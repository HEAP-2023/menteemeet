from typing import List, Dict
from entity.Mentor import Mentor
from entity.Mentee import Mentee
from util.AlgoUtil import setGroupCap, greedyAlgo
from util.ScoringUtil import setOverallScore
from models.UserGroup import UserGroup, writeToDB


def getGrpsByProgID(progID):
    print("hello: ")
    allGroups = UserGroup.query.filter_by(programme_id=progID).all()
    # print("DEBUG ALL_GROUPS:", [userGroup.jsonEncoder() for userGroup in allGroups])
    return [userGroup.jsonEncoder() for userGroup in allGroups], 200


def generateGroupings(app, data) -> Dict[Mentor, List[Mentee]]:
    # Extract mentors and mentees array from req
    mentors = [Mentor.jsonDecoder(m, i+1) for i, m in enumerate(data["mentors"])]
    mentees = [Mentee.jsonDecoder(m) for m in data["mentees"]]
    
    # Set group capacity
    setGroupCap(mentors, mentees)
    
    # Get scores for each mentor-mentee pair
    setOverallScore(mentors, mentees)
    
    # Start the grouping algo
    greedyAlgo(mentors, mentees)
    
    # Populate result
    return writeToDB(app, mentors), 201
