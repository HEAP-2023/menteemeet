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

//Define the relationships between the entities
function initAssociations() {
  //User and skill
  User.belongsToMany(Skill, { through: 'UserSkill' });
  Skill.belongsToMany(User, { through: 'UserSkill' });

  //User and interest
  User.belongsToMany(Interest, { through: 'UserInterest' });
  Interest.belongsToMany(User, { through: 'UserInterest' });

  //User and group
  User.hasOne(Group);
  Group.hasMany(User);

  //User and programme
  User.belongsToMany(Programme,{ through: 'UserProgramme' });
  Programme.belongsToMany(User, { through: 'UserProgramme' });

  //Group and mentorsession
  Group.hasMany(MentorSession);
  MentorSession.hasOne(Group);

  //User and review
  User.hasMany(Review, { foreignKey: 'receiverId', as: 'receivedReviews' });
  Review.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });
  User.hasOne(Review, { foreignKey: 'authorId', as: 'authoredReview' });
  Review.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

  //User and application
  User.hasMany(Application);
  Application.hasOne(User);

  //Programme and application
  Programme.hasMany(Application);
  Application.hasOne(Programme);

  //Programme and run
  Programme.hasMany(Run);
  Run.hasOne(Programme);

  //Programme and forum
  Programme.hasOne(Forum);
  Forum.belongsTo(Programme);
}

module.exports = initAssociations;