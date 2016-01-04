var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'mmMqscephPXOTYLXP_S7Xw',
  consumer_secret: 'X3BrA6as17fz0ANJA6jDUofzTjU',
  token: '55akAgzj1pX9hLIxIvuP54bGY8gfK1NO',
  token_secret: 'wjn7__NpgaDfCQU2rGHlVW900ko'
});

var yelpSearch = function(location) {
  return yelp.search({ term: 'food', location: location });
};

module.exports = yelpSearch;