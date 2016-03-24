
/**
 * Module dependencies
 */
var request = require('request');
var keys    = require('./../keys');


/**
 * Request weather from remote API
 */
function getWeather(callback) {
  var weather_api = 'http://api.openweathermap.org/data/2.5/weather';
      weather_api = weather_api + '?zip=97124,us';
      weather_api = weather_api + '&units=imperial';
      weather_api = weather_api + '&appid=' + keys.weather.api_key;
  request(weather_api, function(error, response, body) {
    return callback(JSON.parse(body));
  });
}


/**
 * Default state, waiting for new command
 */
module.exports = {
  _onEnter: function() {
    this.say('Let me look outside...');

    // Determine if saved weather is outdated
    var weather_outdated = true;
    var minutes_old = 5;
    if (this.weather && this.weather.time) {
      weather_outdated = (new Date < (this.weather.time + (minutes_old * 60000)));
    }

    // Get, or update current weather
    if (!this.weather || weather_outdated ) {
      getWeather(function(weather) {
        this.weather = weather;
        this.weather.time = new Date();

        var current_temp = Math.round(this.weather.main.temp);
        var condition = this.weather.weather[0].description;

        this.say('It\'s currently ' + current_temp + ' degrees, with ' + condition);
        this.transition('ready');
      }.bind(this));
    }

    // Repeat weather, since nothing should change in 5 minutes.
    else {
      var current_temp = Math.round(this.weather.main.temp);
      var condition = this.weather.weather[0].description;

      this.say('It\'s currently ' + current_temp + ' degrees, with ' + condition);
      this.transition('ready');
    }
  }
};
