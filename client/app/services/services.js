angular.module('restourney.services', [])

.factory('Restaurants', function($http) {
  var searchYelpByLocation = function (userLocation) {
    return $http.post('/restaurants', { location: userLocation });
  };

  var getRestaurantsFromDB = function() {

  };

  var chooseLeft = function(restaurant) {
    return $http.get('/restaurants/left', { restaurant: restaurant });
  };

  var chooseRight = function() {

  };

  return {
    searchYelpByLocation: searchYelpByLocation,
    getRestaurantsFromDB: getRestaurantsFromDB,
    chooseLeft: chooseLeft,
    chooseRight: chooseRight
  };
});