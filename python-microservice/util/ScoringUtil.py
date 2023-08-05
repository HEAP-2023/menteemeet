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
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    timePeriods = ["Morning", "Afternoon", "Evening"]

    mentorString = ""
    menteeString = ""

    for day in days:
        if day in mentor.availability:
            for time_period in timePeriods:
                if time_period in mentor.availability[day]:
                    mentorString += '1'
                else:
                    mentorString += '0'
        else:
            mentorString += '0' * len(timePeriods)

    for day in days:
        if day in mentee.availability:
            for time_period in timePeriods:
                if time_period in mentee.availability[day]:
                    menteeString += '1'
                else:
                    menteeString += '0'
        else:
            menteeString += '0' * len(timePeriods)
    
    result = "".join('1' if bit1 == '1' and bit2 == '1' else '0' for bit1, bit2 in zip(menteeString, mentorString))

    numerator = 0
    denominator = 0

    for char in result:
        numerator += int(char)

    for char in mentorString:
        denominator += int(char)

    return numerator/denominator;



    # for day in mentor.availability:
    #     for timeslot in mentor.availability[day]:
    #         if timeslot in mentee.availability[day]:
    #             score += 1

    # return score/21
    
    ###return random.randint(0, 100)
    
    
def getInterestsScore(mentor: Mentor, mentee: Mentee) -> int:
    # Insert Scoring logic here
    tags = {
        "Negotiation": ["Communication", "Professional"],
        "Public Speaking": ["Communication", "Professional"],
        "Networking": ["Communication", "Professional"],
        "Sales": ["Support", "Professional"],
        "Marketing": ["Support", "Professional"],
        "Customer Service": ["Support", "Professional"],
        "Leadership": ["Team", "Professional"],
        "Conflict Management": ["Team", "Professional"],
        "Collaboration": ["Team", "Professional"],
        "Budgeting": ["Literacy", "Finance"],
        "Taxation": ["Literacy", "Finance"],
        "Financial Planning": ["Literacy", "Finance"],
        "Investment": ["Future", "Finance"],
        "Retirement": ["Future", "Finance"],
        "Insurance": ["Future", "Finance"],
        "Risk Management": ["Future", "Finance"],
        "Real Estate": ["Assets", "Finance"],
        "Funds": ["Assets", "Finance"],
        "Bonds": ["Assets", "Finance"],
        "Python": ["Programming", "Tech"],
        "Web Development": ["Programming", "Tech"],
        "Java": ["Programming", "Tech"],
        "Data Science": ["Artificial Intelligence", "Tech"],
        "Machine     Learning": ["Artificial Intelligence", "Tech"],
        "AI Ethics": ["Artificial Intelligence", "Tech"],
        "Cloud computing": ["Computing", "Tech"],
        "Internet of Things": ["Computing", "Tech"],
        "Cyber security": ["Computing", "Tech"],
    }
    score = 0

    for s1 in mentor.interests:
        for s2 in mentee.interests:
            if s1==s2:
                score +=3
            else:
                tag1 = tags.get(s1)
                tag2 = tags.get(s2)
                if tag1[0] == tag2[0]:
                    score += 2
                elif tag1[1] == tag[1]:
                    score += 1

    return score/9
    
def getSkillsScore(mentor: Mentor, mentee: Mentee) -> int:
    # Insert Scoring logic here
    return random.randint(0, 100)