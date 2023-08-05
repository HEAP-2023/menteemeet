import ast

class Mentee:
    
    # Factory methods to create Mentee objects
    @classmethod
    def jsonDecoder(cls, json):
        userID = json["user_id"]
        name = json["name"]
        progID = json["programme_id"]
        availability = json["Application.availability"]
        interests = json["Application.interests"]
        skills = json["Application.skills"]
        return cls(userID, name, progID, availability, interests, skills)
    
    @classmethod
    def jsonDecoder2(cls, json):
        userID = json['id']
        name = json['name']
        availability = json['availability']
        return cls(userID, name, -1, availability, "[]", "[]")

    # Constructor
    def __init__(self, userID, name, progID, availability, interests, skills):
        self.userID = userID
        self.name = name
        self.progID = progID
        self.availability = availability
        if type(availability) == str:
            self.availability = {list(entry.keys())[0]:list(entry.values())[0] for entry in ast.literal_eval(availability)}
        self.interests = ast.literal_eval(interests)
        self.skills = ast.literal_eval(skills)
        self.paired = False
        self.ranking = {}  # { score: [mentor1, mentor2, ...] }
        
    # Methods
    def setPaired(self, paired):
        self.paired = paired
        
    def __str__(self):
        return f"Mentee[ID: {self.userID},\nPROG_ID: {self.progID},\nAVAIL: {self.availability},\nINTERESTS: {self.interests},\nSKILLS: {self.skills}]"
    
    def jsonEncoder(self):
        return {
            "id": self.userID,
            "name": self.name,
            "availability": self.availability
        }
