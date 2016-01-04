var yelp = require('./yelp');
var Firebase = require("firebase");
var restaurantsRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/");


module.exports = function (app, express) {
  app.post('/test', function(req, res) {
    yelp(req.body.location).then(function(data) {
      restaurantsRef.set(data.businesses)
      res.json(data);
    }).catch(function(err) {console.log(err);})
  });
};

