angular.module('restourney.landing', [])

.controller('LandingController', function($state, Restaurants) {
  this.getLocation = function() {
    console.log(this.userLocation);
    Restaurants.getRestaurants(this.userLocation).then(function(data) {
      console.log(data)
      $state.go('game');
    }.bind(this));
  }


});