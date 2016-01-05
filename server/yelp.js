var Yelp = require('yelp');
var yelp_api_keys = require('./config')
var yelp = new Yelp(yelp_api_keys);
var Firebase = require("firebase");
var restaurantsRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/");
var hash = require('string-hash');

var formatData = function(data) {
  var formattedData = {};
  data.businesses.forEach(function(restaurant) {
    // organize restaurants by a key, which is a hash of the name. This will make it easier to look up a particular
    // restaurant later when we want to update its score.
    var hashedName = hash(restaurant.name);
    formattedData[hashedName] = restaurant;
    formattedData[hashedName]['eloRating'] = 1400;
  });
  return formattedData;
};

var yelpSearch = function(req, res) {
  yelp.search({ term: 'food', location: req.body.location}).then(function(data) {
    data = formatData(data);
    restaurantsRef.set(data)
    res.json(data);
  }).catch(function(err) {
    console.log(err);
  });
};

module.exports = yelpSearch;