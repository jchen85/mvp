var yelp = require('./yelp');
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

module.exports = function (app, express) {
  app.post('/test', function(req, res) {
    yelp(req.body.location).then(function(data) {
      data = formatData(data);
      restaurantsRef.set(data)
      res.json(data);
    }).catch(function(err) {
      console.log(err);
    });
  });
};

