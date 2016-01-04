var yelp = require('./yelp')

module.exports = function (app, express) {
  app.get('/test', function(req, res) {
    yelp('San Francisco').then(function(data) {
      res.json(data);
    })
  });
};

