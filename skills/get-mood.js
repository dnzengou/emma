/**
 * Ask user for name
 */

var moods = [
  'So good, I can\'t even stand it!',
  'Totes great. Thanks for asking!',
  'I\'m doing great.',
  'Just chillin\' like a server room.',
  'So good.',
  'Feeling great!',
  'Perfect.',
  'Feeling rad.'
];


module.exports = {
  _onEnter: function() {
    this.say(moods[Math.floor(Math.random() * moods.length)]);
    this.transition('ready');
  }
};
