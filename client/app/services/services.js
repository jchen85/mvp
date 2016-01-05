angular.module('restourney.services', [])

.factory('Restaurants', function($http) {
  var searchYelpByLocation = function (userLocation) {
    return $http.post('/restaurants', { location: userLocation });
  };

  var getRestaurantsFromDB = function() {

  };

  var chooseLeft = function() {
    return $http.get('/restaurants/left');
  };

  var chooseRight = function() {
    return $http.get('/restaurants/right');
  };

  return {
    searchYelpByLocation: searchYelpByLocation,
    getRestaurantsFromDB: getRestaurantsFromDB,
    chooseLeft: chooseLeft,
    chooseRight: chooseRight
  };
});