/**
 * Default state, waiting for new command
 */
module.exports = {
  listen: function(input) {

    /**
     * Dispatch
     * (NLP will go here)
     */
    if (input.match(/weather/)) {
      return this.transition('get-weather');
    }

    this.say('I\'m still learning. Sorry. ');
  }
};
