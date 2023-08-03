from typing import Dict

class Mentor:
    
    # Factory methods
    @classmethod
    def jsonDecoder(cls, json, groupNo):
        userID = json["user_id"]
        name = "TEST_MENTOR"
        progID = json["programme_id"]
        return cls(userID, name, groupNo, progID)
    
    # Constructor
    def __init__(self, userID, name, groupNo, progID):
        self.userID = userID
        self.name = name
        self.groupNo = groupNo
        self.progID = progID
        self.capacity = 0
        self.group = []
        self.isFull = False

    # Methods
    def setCapacity(self, newCap):
        self.capacity = newCap

    def incrementCap(self):
        self.capacity += 1
        
    def addMentee(self, mentor):
        self.group.append(mentor)
        if len(self.group) == self.capacity:
            self.isFull = True
            
    def __str__(self):
        return f"Mentor[ID: {self.userID}, GROUP_NO: {self.groupNo}]"
    
    def jsonEncoder(self):
        return {
            "id": self.userID,
            "name": self.name
        }
    