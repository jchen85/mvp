var yelpSearch = require('./yelp');

module.exports = function (app, express) {
  app.post('/test', yelpSearch);
};

