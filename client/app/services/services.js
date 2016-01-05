angular.module('restourney.services', [])

.factory('Restaurants', function($http) {
  var searchYelpByLocation = function (userLocation) {
    return $http.post('/restaurants', { location: userLocation });
  };

  var getRestaurantsFromDB = function() {

  };

  return {
    searchYelpByLocation: searchYelpByLocation,
    getRestaurantsFromDB: getRestaurantsFromDB
  };
});