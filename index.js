/**
 * Conversational UI with State Machine
 * and Natural Language Processing.
 * @author: Matt Hoiland
 */


/**
 * Module dependencies
 */
// var natural   = require('natural'); // https://github.com/NaturalNode/natural
var machina   = require('machina'); // https://github.com/ifandelse/machina.js


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
  states: {

    welcome: {
      _onEnter: function() {
        this.say('Hello! My name is Emma.');
        this.transition('askName');
      }
    },

    askName: {
      _onEnter: function() {
        this.say('What is your name?');
      },
      listen: function(input) {
        user.name = input;
        this.say('Hi ' + user.name + '!');
        this.transition('askAge');
      }
    },

    askAge: {
      _onEnter: function() {
        this.say('How old are you?');
      },
      listen: function(input) {
        if (isNaN(input)) {
          this.say('Hmm. That\'s not an age. :)');
          this.say('How old again?');
          return this.transition('askAge');
        }
        user.age = parseInt(input);
        var difference = user.age - emma.age;
        this.say('Wow! You are ' + difference + ' years older than me. :)');
      }
    }
  },

  // Let the bot say something
  say: function(message) {
    return console.log(message);
  },

  // Take user input and do something
  listen: function(input) {
    this.handle('listen', input);
  },

  // Start conversion from the top
  reset: function() {
    this.transition('welcome');
  }
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
