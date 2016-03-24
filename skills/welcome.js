/**
 * Welcome user
 */
module.exports = {
  _onEnter: function() {
    this.say('Hello! My name is Emma.');

    if (!this.user.name) {
      return this.transition('ask-name');
    }

    this.transition('ready');
  }
};
