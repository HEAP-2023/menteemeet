const User = require('./user');
const Skill = require('./skill');
const Interest = require('./interest');
const Group = require('./group');
const Programme = require('./programme');
const Review = require('./review');
const MentorSession = require('./mentorSession');
const Application = require('./application');
const Run = require('./run');
const Forum = require('./forum');
const Resource = require('./resource');
const Announcement = require('./announcement');
const Organiser = require('./organiser');

//Define the relationships between the entities
function initAssociations() {
  //User and skill
  User.belongsToMany(Skill, { through: 'UserSkill' });
  Skill.belongsToMany(User, { through: 'UserSkill' });

  //User and interest
  User.belongsToMany(Interest, { through: 'UserInterest' });
  Interest.belongsToMany(User, { through: 'UserInterest' });

  //User and group
  Group.hasMany(User, { foreignKey: 'groupId' });
  User.belongsTo(Group, { foreignKey: 'groupId' });

  //User and programme
  User.belongsToMany(Programme,{ through: 'UserProgramme' });
  Programme.belongsToMany(User, { through: 'UserProgramme' });

  //Group and mentorsession
  Group.hasMany(MentorSession, { foreignKey: "groupId" });
  MentorSession.belongsTo(Group, { foreignKey: "groupId" });

  //User and review
  User.hasMany(Review, { foreignKey: 'receiverId', as: 'receivedReviews' });
  Review.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });
  User.hasMany(Review, { foreignKey: 'authorId', as: 'authoredReview' });
  Review.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

  //User and application
  User.hasMany(Application, { foreignKey: 'userId' });
  Application.belongsTo(User, { foreignKey: 'userId' });

  //Programme and run
  Programme.hasMany(Run, { foreignKey: 'programmeId' });
  Run.belongsTo(Programme, { foreignKey: 'programmeId' });

  //Programme and forum
  Programme.hasOne(Forum, { foreignKey: "programmeId" });
  Forum.belongsTo(Programme, { foreignKey: "programmeId" });

  //Forum and comments
  Forum.hasMany(Comment, { foreignKey: "forumId" });
  Comment.belongsTo(Forum, { foreignKey: "forumId" });

  //User and comments
  User.hasMany(Comment, { foreignKey: "userId" });
  Comment.belongsTo(User, { foreignKey: "userId" });

  //Programme and resource
  Programme.hasMany(Resource, { foreignKey: "programmeId" });
  Resource.belongsTo(Programme, { foreignKey: "programmeId" });

  //Programme and announcement
  Programme.hasMany(Announcement, { foreignKey: "programmeId" });
  Announcement.belongsTo(Programme, { foreignKey: "programmeId" });

  //Organiser and announcement
  Organiser.hasMany(Announcement, { foreignKey: "organiserId" });
  Announcement.belongsTo(Organiser, { foregnKey: "organiserId" });

  //Organiser and resource
  Organiser.hasMany(Resource, { foreignKey: "organiserId" });
  Resource.belongsTo(Organiser, { foreignKey: "organiserId" });
}

module.exports = initAssociations;