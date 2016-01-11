var Yelp = require('yelp');
var yelp_api_keys = require('./config')
var yelp = new Yelp(yelp_api_keys);
var hash = require('string-hash');

var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var formatData = function(data) {
  var formattedData = {
    currentList: [],
    currentListNamesScores: []
  };
  data.businesses.forEach(function(restaurant) {
    // organize restaurants by a key, which is a hash of the name. This will make it easier to look up a particular
    // restaurant later when we want to update its score.
    restaurant.image_url = restaurant.image_url.replace('ms.jpg', 'o.jpg');
    var hashedName = hash(restaurant.name);
    formattedData[hashedName] = restaurant;
    formattedData[hashedName]['eloRating'] = 1400;
    formattedData['currentList'].push(hashedName);
    formattedData['currentListNamesScores'].push(restaurant);
  });

  // select two random restaurants to be the current contestants, one for each side of the page
  formattedData['currentList'] = shuffleArray(formattedData['currentList']);
  formattedData['left'] = formattedData['currentList'][0];
  formattedData['right'] = formattedData['currentList'][1];

  return formattedData;
};

var yelpSearch = function(req, res) {
  yelp.search({ term: 'food', location: req.body.location}).then(function(data) {
    data = formatData(data);
    res.json(data);
  }).catch(function(err) {
    console.log(err);
  });
};

module.exports = yelpSearch;