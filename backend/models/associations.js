const User = require('./user');
const Skill = require('./skill');
const Interest = require('./interest');
const Group = require('./group');

function initAssociations() {
  //Define the relationships between the entities
  User.belongsToMany(Skill, { through: 'UserSkill' });
  Skill.belongsToMany(User, { through: 'UserSkill' });

  User.belongsToMany(Interest, { through: 'UserInterest' });
  Interest.belongsToMany(User, { through: 'UserInterest' });

  User.hasOne(Group);
  Group.hasMany(User);
}

module.exports = initAssociations;