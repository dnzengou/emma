/**
 * Ask user for name
 */
module.exports = {
  _onEnter: function() {
    this.say('What is your name?');
  },
  listen: function(input) {
    this.user.name = input;
    this.say('Hi ' + this.user.name + '!');

    this.transition('ready');
  }
};
