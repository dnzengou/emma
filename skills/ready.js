/**
 * Default state, waiting for new command
 */
module.exports = {
  _onEnter: function() {
    this.say('How can I help you?');
  },
  listen: function(input) {
    this.say('I\'m still learning. Sorry.');
  }
};
