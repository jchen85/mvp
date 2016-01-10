angular.module('restourney.services', [])

.factory('Restaurants', function($http, $log) {
  var Restaurants = {};
  var _restaurantData;

  var setRestaurantData = function (data) {
    _restaurantData = data;
  };

  Restaurants.getRestaurantData = function () {
    return _restaurantData;
  };

  Restaurants.searchYelpByLocation = function (userLocation, callback) {
    return $http.post('/restaurants', { location: userLocation }).then(function(restaurants) {
      $log.log('Restaurant Factory:', restaurants);
      setRestaurantData(restaurants.data);
      callback();
    });
  };

  Restaurants.chooseLeft = function() {
    var leftEloRating = _restaurantData[_restaurantData.left].eloRating;
    var rightEloRating = _restaurantData[_restaurantData.right].eloRating;
    
    var newScores = eloCalculator(leftEloRating, rightEloRating);

    _restaurantData[_restaurantData.left].eloRating = newScores[0];
    _restaurantData[_restaurantData.right].eloRating = newScores[1];

    afterChoosingTasks();
  };

  Restaurants.chooseRight = function() {
    var rightEloRating = _restaurantData[_restaurantData.right].eloRating;
    var leftEloRating = _restaurantData[_restaurantData.left].eloRating;

    var newScores = eloCalculator(rightEloRating, leftEloRating);

    _restaurantData[_restaurantData.right].eloRating = newScores[0];
    _restaurantData[_restaurantData.left].eloRating = newScores[1];

    afterChoosingTasks();
  };


  var afterChoosingTasks = function() {
    _restaurantData['currentList'] = shuffleArray(_restaurantData['currentList']);
    _restaurantData['left'] = _restaurantData['currentList'][0];
    _restaurantData['right'] = _restaurantData['currentList'][1];

    // Update the list of restaurants and their scores, then sort by score so the view will put them in order
    _restaurantData['currentListNamesScores'] = [];
    _restaurantData['currentList'].forEach(function(restaurantHash) {
      _restaurantData['currentListNamesScores'].push(_restaurantData[restaurantHash]);
    });

    _restaurantData['currentListNamesScores'].sort(function(a,b) {
      return b.eloRating - a.eloRating;
    })
  };

  var eloCalculator = function (winner, loser) {
    var weighingFactor = 30;

    var expectedWinner = 1 / (1 + Math.pow(10, (loser - winner) / 400));
    var expectedLoser = 1 / (1 + Math.pow(10, (winner - loser) / 400));
    
    var newWinner = Math.ceil(winner + weighingFactor * (1 - expectedWinner));
    var newLoser = Math.ceil(loser + weighingFactor * (0 - expectedLoser));
    
    return [newWinner, newLoser];
  };

  var shuffleArray = function (array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  };

  return Restaurants;
});