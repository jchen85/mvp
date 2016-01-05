var yelpSearch = require('./yelp');
var db = require('./firebase');

module.exports = function (app, express) {
  app.post('/restaurants', yelpSearch);
  app.get('/restaurants/left', db.chooseLeft)
};

