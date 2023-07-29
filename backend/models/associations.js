const User = require('./user');
const Skill = require('./skill');
const Interest = require('./interest');
const UserGroup = require('./UserGroup');
const Programme = require('./programme');
const Review = require('./review');
const Session = require('./session');
const Application = require('./application');
const Forum = require('./forum');
const Resource = require('./resource');
const Announcement = require('./announcement');
const Organiser = require('./organiser');
const Comment = require('./comment');
const UserSkill = require('./userSkill');
const UserInterest = require('./userInterest');
const UserProgramme = require('./userProgramme');
const Account = require('./account');

//Define the relationships between the entities
function initAssociations() {
  //User and skill
  User.belongsToMany(Skill, { foreignKey: 'user_id', through: UserSkill });
  Skill.belongsToMany(User, { foreignKey: 'skill_id', through: UserSkill });

  //User and interest
  User.belongsToMany(Interest, { foreignKey: 'user_id', through: UserInterest });
  Interest.belongsToMany(User, { foreignKey: 'interest_id', through: UserInterest });

  //User and group
  UserGroup.belongsToMany(User, { foreignKey: 'group_id', through: UserProgramme });
  User.belongsToMany(UserGroup, { foreignKey: 'user_id', through: UserProgramme });

  //Programme and group
  Programme.hasMany(UserGroup, { foreignKey: "programme_id" });
  UserGroup.belongsTo(Programme, { foreignKey: "programme_id" });

  //User and programme
  User.belongsToMany(Programme,{ foreignKey: 'user_id', through: UserProgramme });
  Programme.belongsToMany(User, { foreignKey: 'programme_id', through: UserProgramme });

  //UserGroup and mentorsession
  UserGroup.hasMany(Session, { foreignKey: "group_id" });
  Session.belongsTo(UserGroup, { foreignKey: "group_id" });

  //User and review
  User.hasMany(Review, { foreignKey: 'receiver_id', as: 'receivedReviews' });
  Review.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });
  User.hasMany(Review, { foreignKey: 'author_id', as: 'authoredReview' });
  Review.belongsTo(User, { foreignKey: 'author_id', as: 'author' });

  //User and application
  User.hasMany(Application, { foreignKey: 'user_id' });
  Application.belongsTo(User, { foreignKey: 'user_id' });

  //Program and application
  Programme.hasMany(Application, { foreignKey: 'programme_id' });
  Application.belongsTo(Programme, { foreignKey: 'programme_id' });


  //Programme and forum
  // Programme.hasOne(Forum, { foreignKey: "programme_id" });
  // Forum.belongsTo(Programme, { foreignKey: "programme_id" });

  //Forum and comments
  // Forum.hasMany(Comment, { foreignKey: "forum_id" });
  // Comment.belongsTo(Forum, { foreignKey: "forum_id" });

  //User and comments
  // User.hasMany(Comment, { foreignKey: "user_id" });
  // Comment.belongsTo(User, { foreignKey: "user_id" });

  //Programme and resource
  Programme.hasMany(Resource, { foreignKey: "programme_id" });
  Resource.belongsTo(Programme, { foreignKey: "programme_id" });

  //Programme and announcement
  Programme.hasMany(Announcement, { foreignKey: "programme_id" });
  Announcement.belongsTo(Programme, { foreignKey: "programme_id" });

  //Organiser and Programme
  Organiser.hasMany(Programme, { foreignKey: 'organiser_id' });
  Programme.belongsTo(Organiser, { foreignKey: 'organiser_id' });

  //Organiser and announcement
  Organiser.hasMany(Announcement, { foreignKey: "organiser_id" });
  Announcement.belongsTo(Organiser, { foreignKey: "organiser_id" });

  //Organiser and resource
  Organiser.hasMany(Resource, { foreignKey: "organiser_id" });
  Resource.belongsTo(Organiser, { foreignKey: "organiser_id" });

  //Account and user
  Account.hasOne(User, { foreignKey: "account_id" });
  User.belongsTo(Account, { foreignKey: "account_id" });

  //Account and organiser
  Account.hasOne(Organiser, { foreignKey: "account_id" });
  Organiser.belongsTo(Account, { foreignKey: "account_id" });
}

module.exports = initAssociations;