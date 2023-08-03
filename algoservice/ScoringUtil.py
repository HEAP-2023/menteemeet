from Mentor import Mentor
from Mentee import Mentee
from typing import List

import random

def tags():

    strings = [
        "Negotiation", "Public Speaking", "Networking",
        "Sales", "Marketing", "Customer Service",
        "Leadership", "Conflict Management", "Collaboration",
        "Budgeting", "Taxation", "Financial Planning",
        "Investment", "Retirement Planning", "Insurance", "Risk Management",
        "Real Estate", "Funds", "Bonds",
        "Python", "Java", "Web Development",
        "Data Science", "Machine Learning", "AI Ethics",
        "Cloud computing", "Internet of Things", "Cyber security"
    ]

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

    THREE_POINTS = ['Negotiation', 'Public Speaking', 'Networking', 'Sales', 'Marketing', 'Customer Service', 'Leadership', 'Conflict Management', 'Collaboration', 'Budgeting', 'Taxation', 'Financial Planning', 'Investment', 'Retirement', 'Insurance', 'Risk Management', 'Real Estate', 'Funds', 'Bonds', 'Python', 'Web Development', 'Java', 'Data Science', 'Maching Learning', 'AI Ethics', 'Cloud computing', 'Internet of Things', 'Cyber security']
    TWO_POINTS =

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
    score = 0

    for day in mentor.availability:
        for slot in mentor.availability[day]:
            if slot in mentee.availability[day]:
                score+=1

    return score/21;
    
def getInterestsScore(mentor: Mentor, mentee: Mentee) -> int:
    # Insert Scoring logic here
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