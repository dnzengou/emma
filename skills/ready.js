/**
 * Module dependencies
 */
var wit           = require('node-wit');
var keys          = require('./../keys');
var access_token  = keys.wit.access_token;

/**
 * Default state, waiting for new command
 */
module.exports = {
  listen: function(input) {

    // Send input to `Wit.ai` to get intent
    wit.captureTextIntent(access_token, input, function (err, res) {

      if (res && res.outcomes.length) {

        // Get intent, and update string syntax to match our skills
        var intent = res.outcomes[0].intent.replace('_', '-');
        // console.log('INTENT: ' + intent);

        // Change state to run the intended skill
        return this.transition(intent);

      } else {

        // Wit.ai can't determine intent
        this.say('I\'m still learning. Sorry. ');
      }
    }.bind(this));
  }
};
