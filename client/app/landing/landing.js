angular.module('restourney.landing', [])

.controller('LandingController', function(Restaurants) {
  this.getLocation = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        Restaurants.getRestaurants().then(function(data) {
          console.log(data)
        });
      });
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }


});