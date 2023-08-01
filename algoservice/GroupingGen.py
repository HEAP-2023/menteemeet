from Mentor import Mentor
from Mentee import Mentee
from typing import List, Dict

from ScoringUtil import setOverallScore


def setGroupCap(mentors, mentees):
    # Divide the mentees by mentors
    CAPACITY = len(mentees) // len(mentors)
    [mentor.setCapacity(CAPACITY) for mentor in mentors]
    
    # If unable to divide fully, add extra members for some first n groups
    REMAINDER = len(mentees) % len(mentors)
    [mentors[i].incrementCap() for i in range(REMAINDER)]


def pairToMentor(mentees, score):
    for mentee in mentees:
        if score in mentee.ranking:
            
            if not mentee.ranking[score]: return
            
            # Get the mentor to match
            mentorToMatch = mentee.ranking[score].pop(0)
            
            # Set mentee to paired only if mentor is not currently full
            if not mentorToMatch.isFull:
                mentorToMatch.addMentee(mentee)
                mentee.paired = True
                mentees.remove(mentee)
            
            # Remove this score from mentee's ranking
            if not mentee.ranking[score]: mentee.ranking.pop(score)
            
            return


def greedyAlgo(mentors: List[Mentor], mentees: List[Mentee]) -> None:
    # If no more mentees to match, exit
    if not mentees: return
    
    # Get all scores into a list and sort (highest to lowest)
    allScores = sorted([max(m.ranking.keys()) for m in mentees], reverse=True)

    for score in allScores:
        pairToMentor(mentees, score)
    
    # Remove mentors who are full
    new_mentors = [mentor for mentor in mentors if not mentor.isFull]
    
    # Recursively run this again
    greedyAlgo(new_mentors, mentees)


def generateGroupings(mentors: List[Mentor], mentees: List[Mentee], TEST_MODE=False) -> Dict[Mentor, List[Mentee]]:
    # Set group capacity
    setGroupCap(mentors, mentees)
    
    # Get scores for each mentor-mentee pair
    if not TEST_MODE: setOverallScore(mentors, mentees)
    
    # Start the grouping algo
    greedyAlgo(mentors, mentees)
    
    # Populate result
    groupings = {}
    [groupings.update({mentor: mentor.group}) for mentor in mentors]

    return groupings
