from typing import Dict

class Mentor:
    ID = 1
    
    # @classmethod
    # def jsonDecoder(mentorJSON: Dict[str]):
    #     return Mentor("test")
    
    def __init__(self, name, skills, interests, availability):
        self.userID = Mentor.ID
        self.name = name
        self.capacity = 0
        self.group = []
        self.isFull = False
        self.skills = skills
        self.interests = interests
        self.availability = availability
        
        ## INCREMENT ID (TESTING ONLY)
        Mentor.ID += 1
        
    def setCapacity(self, newCap):
        self.capacity = newCap

    def incrementCap(self):
        self.capacity += 1
        
    def addMentee(self, mentor):
        self.group.append(mentor)
        if len(self.group) == self.capacity:
            self.isFull = True
            
    def __str__(self):
        return f"Mentor[ID: {self.userID}, NAME: {self.name}]"
    
    def jsonEncoder(self):
        return {
            "user_id": self.userID,
            "name": self.name,
            "group": [mentee.jsonEncoder() for mentee in self.group]
        }
    