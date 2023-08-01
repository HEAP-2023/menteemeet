
class Mentee:
    ID = 1
    
    def __init__(self, name):
        self.userID = Mentee.ID
        self.name = name
        self.paired = False
        self
        
        # { score: [mentor1, mentor2, ...] }
        self.ranking = {}
        
        ## INCREMENT ID (TESTING ONLY)
        Mentee.ID += 1
        
    def setPaired(self, paired):
        self.paired = paired
        
    def __str__(self):
        return f"Mentee[ID: {self.userID}, NAME: {self.name}]"
    
    def jsonEncoder(self):
        return {
            "user_id": self.userID,
            "name": self.name
        }
