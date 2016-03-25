/**
 * Conversational UI with State Machine
 * and Natural Language Processing.
 * @author: Matt Hoiland
 */


/**
 * Module dependencies
 */

// var natural   = require('natural'); // https://github.com/NaturalNode/natural
var fs        = require('fs');
var machina   = require('machina'); // https://github.com/ifandelse/machina.js
var Ivona     = require('ivona-node');
var keys      = require('./keys');


/**
 * Current skills
 */
var listOfSkills = ['Mood', 'Weather', 'Name', 'Movies'];
console.log('Current skills:\n', listOfSkills, '\n\n');


/**
 * Play message as Text-to-Voice
 */
var ivona = new Ivona({
  accessKey: keys.ivona.access_key,
  secretKey: keys.ivona.secret_key
});

var voices = {
  emma: { name: 'Emma', language: 'en-GB', gender: 'Female' },
  salli: { name: 'Salli', language: 'en-US', gender: 'Female' }
};

function speak(message) {
  var file = new Date().getTime();
  ivona
    .createVoice(message, { body: { voice: voices.emma } })
    .pipe(fs.createWriteStream(file + '.mp3'));
  return true;
}



/**
 * Object to store info about user
 */
var user = { name: null, age: null };
var emma = { name: 'Emma', age: 1 };


/**
 * State machine for the conversation
 */
var bot = new machina.Fsm({
  initialState: 'welcome',
  states: require('./skills/index'),

  emma: emma,
  user: user,

  // Let the bot say something
  say: function(message) {
    speak(message);
    return console.log('    > ' + message);
  },

  // Take user input and do something
  listen: function(input) { this.handle('listen', input); },

  // Start conversion from the top
  reset: function() { this.transition('welcome'); }
});


/**
 * Listen for user input
 */
process.stdin.on('data', function(data) {

  // The user input
  var message = data.toString().trim();

  // End conversation if `magic` word used
  if (['bye', 'close', 'exit', 'quit'].indexOf(message) !== -1) {
    console.log('Good bye!');
    return process.exit(0);
  }

  // Send input to the bot
  bot.listen(message);
});
