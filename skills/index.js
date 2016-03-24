
/**
 * Module dependencies
 */
var requireDir = require('require-dir');

/**
 * Create object of all skills
 */
var skillsDir = requireDir('./');
var skills = {};
for (var key in skillsDir) {
  skills[key] = skillsDir[key];
}

/**
 * Return object of all skills
 */
module.exports = skills;
