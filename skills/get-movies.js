
var request = require('request');
var moment  = require('moment');
var keys    = require('./../keys');

// TODO: Make zipcode dynamic
// TODO: Listen for date, like `what movies TOMORROW`

function getMovies(callback) {

  var movies_url = 'http://data.tmsapi.com/v1.1/movies/showings';
      movies_url += '?startDate=2016-03-25';
      movies_url += '&zip=97123';
      movies_url += '&api_key=' + keys.gracenote.key;

  request(movies_url, function(e,r,body){
    var json = JSON.parse(body);
    var movie = {};
    movie.name = json[0].title;
    movie.theater = json[0].showtimes[0].theatre.name;
    movie.next_showing = json[0].showtimes[0].dateTime;
    return callback(movie);
  });
}


module.exports = {
  _onEnter: function() {
    this.say('Let me check...');

    getMovies(function(movie){
      var time = new moment(movie.next_showing);
      this.say(movie.name + ' is playing at ' + time.format('LT') + ' at ' + movie.theater);
      this.transition('ready');
    }.bind(this));
  }
};
