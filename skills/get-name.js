/**
 * Ask user for name
 */
module.exports = {
  _onEnter: function() {
    this.say('My name is ' + this.emma.name + '. But you knew that. :)');
    this.transition('ready');
  }
};
