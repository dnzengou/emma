/**
 * Welcome user
 */
module.exports = {
  _onEnter: function() {
    this.say('Hello! My name is Emma.');
    this.transition('ask-name');
  }
};
