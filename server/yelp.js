var Yelp = require('yelp');
var yelpKeys = require('./config')

var yelp = new Yelp(yelpKeys);

var yelpSearch = function(location) {
  return yelp.search({ term: 'food', location: location });
};

module.exports = yelpSearch;