angular.module('restourney.gameOver', [])

.controller('GameOverController', function($state, Restaurants) {
  var GameScope = this;

  this.restaurants = {};
  this.left = {};
  this.right = {};

  (function() {
    var restaurants = Restaurants.getRestaurantData();
    console.log(Restaurants.getRestaurantData());
    if (restaurants === undefined) {
      $state.go('landing');
    } else {
      GameScope.restaurants = restaurants;
      GameScope.left = restaurants[restaurants.left];
      GameScope.right = restaurants[restaurants.right];
    }
  })();  
});