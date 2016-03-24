/**
 * Ask user for age
 */
module.exports = {
  _onEnter: function() {
    this.say('How old are you?');
  },
  listen: function(input) {
    if (isNaN(input)) {
      this.say('Hmm. That\'s not an age. :)');
      this.say('How old again?');
      return this.transition('askAge');
    }
    this.user.age = parseInt(input);
    var difference = this.user.age - this.emma.age;
    this.say('Wow! You are ' + difference + ' years older than me. :)');
  }
};
