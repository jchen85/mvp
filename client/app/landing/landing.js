angular.module('restourney.landing', [])

.controller('LandingController', function($state, Restaurants) {
  console.log(Restaurants);
  this.getLocation = function() {
    Restaurants.searchYelpByLocation(this.userLocation, function() {
      console.log('data from LandingController:', Restaurants.getRestaurantData())
      $state.go('game');
    });
  }


});