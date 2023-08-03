
class Mentee:
    
    # Factory methods to create Mentee objects
    @classmethod
    def jsonDecoder(cls, json):
        userID = json["user_id"]
        name = "TEST_MENTEE"
        progID = json["programme_id"]
        return cls(userID, name, progID)

    # Constructor
    def __init__(self, userID, name, progID):
        self.userID = userID
        self.name = name
        self.progID = progID
        self.paired = False
        self.ranking = {}  # { score: [mentor1, mentor2, ...] }
        
    # Methods
    def setPaired(self, paired):
        self.paired = paired
        
    def __str__(self):
        return f"Mentee[ID: {self.userID}, PROG_ID: {self.progID}]"
    
    def jsonEncoder(self):
        return {
            "id": self.userID,
            "name": self.name
        }
