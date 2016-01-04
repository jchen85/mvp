angular.module('restourney.services', [])

.factory('Restaurants', function($http) {
  var getRestaurants = function () {
    return $http.get('/test');
  }
  return {
    getRestaurants: getRestaurants
  };
});