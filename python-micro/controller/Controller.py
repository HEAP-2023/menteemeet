from typing import List, Dict
from entity.Mentor import Mentor
from entity.Mentee import Mentee
from util.AlgoUtil import setGroupCap, greedyAlgo
from util.ScoringUtil import setOverallScore
from models.UserGroup import UserGroup, writeToDB, updateMentorsMenteesByGrpID, deleteGrpsByProgID


def getGrpsByProgID(progID):
    allGroups = UserGroup.query.filter_by(programme_id=progID).all()
    return [userGroup.jsonEncoder() for userGroup in allGroups], 200


def generateGroupings(app, data):
    # Extract mentors and mentees array from req
    mentors = [Mentor.jsonDecoder(m, i+1) for i, m in enumerate(data["mentors"])]
    mentees = [Mentee.jsonDecoder(m) for m in data["mentees"]]
    # Set group capacity
    if not setGroupCap(mentors, mentees):
        return {"error" : "No mentees have signed up!"}, 400
    
    # Get scores for each mentor-mentee pair
    setOverallScore(mentors, mentees)
    
    # Start the grouping algo
    greedyAlgo(mentors, mentees)

    return writeToDB(app, mentors), 201


def manualEditGrps(app, progID, data):
    # Delete current records
    deleteGrpsByProgID(progID)

    result = []
    for i, group in enumerate(data):
        
        # Change group number
        group['groupNo'] = i + 1
        
        # Create a list of Mentors
        mentors = [Mentor.jsonDecoder2(m) for m in group['mentor']]
        
        # Create a list of Mentees
        mentees = [Mentee.jsonDecoder2(m) for m in group['mentee']]
        
        # Calculate new common DT
        group['commonDT'] = str(Mentor.getCommonAvailability(mentors, mentees)).replace("'", '"')
        
        # Update the DB
        updateMentorsMenteesByGrpID(app, progID, group['groupNo'], group['id'], group['mentor'], group['mentee'], group['commonDT'])
        
        # Append group to result
        result.append(group)

    return result, 200
