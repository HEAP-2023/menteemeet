import ast

class Mentor:
    
    # Factory methods
    @classmethod
    def jsonDecoder(cls, json, groupNo):
        userID = json["user_id"]
        name = json["name"]
        progID = json["programme_id"]
        availability = json["Application.availability"]
        interests = json["Application.interests"]
        skills = json["Application.skills"]
        return cls(userID, name, groupNo, progID, availability, interests, skills)
    
    @classmethod
    def jsonDecoder2(cls, json):
        userID = json['id']
        name = json['name']
        availability = json['availability']
        return cls(userID, name, -1, -1, availability, "[]", "[]")


    # Static methods
    @staticmethod
    def getCommonAvailability(mentors, mentees):
        result = []
        for day in mentors[0].availability:
                
            # Get a list of time slots for that day for every mentee
            allMenteesAvail = [mentee.availability[day] for mentee in mentees]
            
            # Get a list of time slots for that day for every mentor
            allMentorsAvail = [mentor.availability[day] for mentor in mentors[1:]]
            
            # Extend the 2 lists into 1
            allMenteesAvail.extend(allMentorsAvail)
            
            common = list(set(mentors[0].availability[day]).intersection(*map(set, allMenteesAvail)))
            
            if common: result.append(day + ": " + str(common)[1:-1].replace("'", ''))
            
        return result
    
    
    # Constructor
    def __init__(self, userID, name, groupNo, progID, availability, interests, skills):
        self.userID = userID
        self.name = name
        self.groupNo = groupNo
        self.progID = progID
        self.availability = availability
        if type(availability) == str:
            self.availability = {list(entry.keys())[0]:list(entry.values())[0] for entry in ast.literal_eval(availability)}
        self.interests = ast.literal_eval(interests)
        self.skills = ast.literal_eval(skills)
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
        return f"Mentor[ID: {self.userID},\nGROUP_NO: {self.groupNo},\nAVAIL: {self.availability},\nINTERESTS: {self.interests},\nSKILLS: {self.skills}]\n"
    
    def jsonEncoder(self):
        return {
            "id": self.userID,
            "name": self.name, 
            "availability": self.availability
        }
    