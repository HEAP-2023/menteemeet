from db import db

class UserGroup(db.Model):
    __tablename__ = 'usergroup'
    group_id = db.Column(db.Integer, primary_key=True)
    group_no = db.Column(db.Integer, nullable=False)
    mentees = db.Column(db.String, nullable=False)
    mentors = db.Column(db.String, nullable=False)
    common_dt = db.Column(db.String, nullable=False)
    programme_id = db.Column(db.Integer, nullable=False)
    
    def jsonEncoder(self):
        return {
            "id": self.group_id,
            "groupNo": self.group_no,
            "mentor": self.mentors,
            "mentee": self.mentees,
            "commonDT": self.common_dt
        }


def writeToDB(app, groupings):
    result = []
    
    for mentor in groupings:
        # Create json object to return in response
        groupObj = { "mentor": [mentor.jsonEncoder()],
                     "mentee": [mentee.jsonEncoder() for mentee in mentor.group],
                     "groupNo": mentor.groupNo,
                     "commonDT": '[]'}
        
        # Create a new entry
        newUserGroup = UserGroup(mentees=str([mentee.jsonEncoder() for mentee in mentor.group]).replace("'", '"'),
                                 mentors=str([mentor.jsonEncoder()]).replace("'", '"') ,
                                 programme_id=mentor.progID,
                                 group_no=mentor.groupNo)
        
        # Write the entry to DB
        with app.app_context():
            db.session.add(newUserGroup)
            db.session.commit()
            db.session.refresh(newUserGroup)
            groupObj['id'] = newUserGroup.group_id
        
        result.append(groupObj)

    return result