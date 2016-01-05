angular.module('restourney.landing', [])

.controller('LandingController', function($state, Restaurants) {
  this.getLocation = function() {
    console.log(this.userLocation);
    Restaurants.searchYelpByLocation(this.userLocation).then(function(data) {
      console.log('data from LandingController:', data)
      $state.go('game');
    }.bind(this));
  }


});