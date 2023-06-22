const User = require('./user');
const Skill = require('./skill');
const Interest = require('./interest');

function initAssociations() {
  //Define the relationships between the entities
  User.belongsToMany(Skill, { through: 'UserSkill' });
  Skill.belongsToMany(User, { through: 'UserSkill' });
  User.belongsToMany(Interest, { through: 'UserInterest' });
  Interest.belongsToMany(User, { through: 'UserInterest' })
}

module.exports = initAssociations;