angular.module('restourney.services', [])

.factory('Restaurants', function($http) {
  var getRestaurants = function (userLocation) {
    console.log('getting restaurants')
    return $http.post('/test', { location: userLocation });
  }
  return {
    getRestaurants: getRestaurants
  };
});