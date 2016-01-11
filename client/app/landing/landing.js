angular.module('restourney.landing', [])

.controller('LandingController', function($state, Restaurants) {
  this.getLocation = function() {
    Restaurants.searchYelpByLocation(this.userLocation, function() {
      $state.go('game');
    });
  }


});