from entity.Mentor import Mentor
from entity.Mentee import Mentee
from typing import List

import random

def setOverallScore(mentors: List[Mentor], mentees: List[Mentee]) -> None:
    for mentee in mentees:
        for mentor in mentors:
            # Get a score
            availScore = getAvailScore(mentor, mentee)
            interestScore = getInterestsScore(mentor, mentee)
            skillsScore = getSkillsScore(mentor, mentee)
            overallScore = (availScore + interestScore + skillsScore) / 3
            
            # Tie the score to a mentor
            if not mentee.ranking.get(overallScore, []):
                mentee.ranking[overallScore] = []
            mentee.ranking[overallScore].append(mentor)


def getAvailScore(mentor: Mentor, mentee: Mentee) -> int:
    # Insert Scoring logic here
    return random.randint(0, 100)
    
def getInterestsScore(mentor: Mentor, mentee: Mentee) -> int:
    # Insert Scoring logic here
    return random.randint(0, 100)
    
def getSkillsScore(mentor: Mentor, mentee: Mentee) -> int:
    # Insert Scoring logic here
    return random.randint(0, 100)