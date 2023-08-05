from db import db
from entity.Mentor import Mentor

class UserGroup(db.Model):
    __tablename__ = 'usergroup'
    group_id = db.Column(db.Integer, primary_key=True)
    group_no = db.Column(db.Integer, nullable=False)
    mentees = db.Column(db.String(2000), nullable=False)
    mentors = db.Column(db.String(2000), nullable=False)
    common_dt = db.Column(db.String(2000), nullable=False)
    programme_id = db.Column(db.Integer, nullable=False)
    
    def jsonEncoder(self):
        return {
            "id": self.group_id,
            "groupNo": self.group_no,
            "mentor": self.mentors,
            "mentee": self.mentees,
            "commonDT": self.common_dt
        }


def writeToDB(app, mentors):
    result = []
    
    for mentor in mentors:
        # Create json object to return in response
        groupObj = { "mentor": [mentor.jsonEncoder()],
                     "mentee": [mentee.jsonEncoder() for mentee in mentor.group],
                     "groupNo": mentor.groupNo,
                     "commonDT": str(Mentor.getCommonAvailability([mentor], mentor.group)).replace("'", '"')}
        
        # Create a new entry
        newUserGroup = UserGroup(mentees=str([mentee.jsonEncoder() for mentee in mentor.group]).replace("'", '"'),
                                 mentors=str([mentor.jsonEncoder()]).replace("'", '"') ,
                                 common_dt=groupObj["commonDT"],
                                 programme_id=mentor.progID,
                                 group_no=mentor.groupNo)

        # Write the entry to DB
        with app.app_context():
            db.session.add(newUserGroup)
            db.session.commit()
            db.session.refresh(newUserGroup)
            groupObj['id'] = newUserGroup.group_id
        
        result.append(groupObj)
        print("result : ", result)
    return result


def deleteGrpsByProgID(progID):
    db.session.query(UserGroup).filter_by(programme_id=progID).delete()
    db.session.commit()


def updateMentorsMenteesByGrpID(app, progID, grpNo, grpID, mentors, mentees, commonDT):
    # Create a new entry
    newUserGroup = UserGroup(group_id=grpID,
                             mentees=str(mentees).replace("'", '"'),
                             mentors=str(mentors).replace("'", '"'),
                             common_dt=str(commonDT).replace("'", '"'),
                             programme_id=progID,
                             group_no=grpNo)
        
    with app.app_context():
        db.session.add(newUserGroup)
        db.session.commit()