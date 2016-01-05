angular.module('restourney.game', [])

.controller('GameController', function($scope, $firebaseObject) {
  var GameScope = this;
  this.restaurantsRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/");
  this.left = {};
  this.right = {};
  this.leftRef = {};
  this.rightRef = {};

  var 

  $firebaseObject(this.restaurantsRef).$loaded()
  .then(function(restaurants) {
    GameScope.restaurants = restaurants;
    GameScope.left = restaurants[restaurants.left];
    GameScope.right = restaurants[restaurants.right];
    GameScope.leftRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/" + restaurants.left.toString());
    GameScope.rightRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/" + restaurants.right.toString());
  })

  $firebaseObject(this.restaurantsRef).$bindTo($scope, 'restaurants')
  .then(function(restaurants) {
    // GameScope.leftRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/" + restaurants.left.toString());
    // GameScope.rightRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/" + restaurants.right.toString());
  })

  $firebaseObject(this.restaurantsRef).$watch(function() {
    console.log('data changed');
    GameScope.left = GameScope.restaurants[GameScope.restaurants.left];
    GameScope.right = GameScope.restaurants[GameScope.restaurants.right];
  });

  this.chooseLeft = function($http) {
    console.log('picked left');
    console.log(GameScope.leftRef);
    GameScope.leftRef.child('eloRating').set(GameScope.restaurants[GameScope.restaurants.left].eloRating + 20);
  };

  this.chooseRight = function() {
    console.log('picked right');
    GameScope.rightRef.child('eloRating').set(GameScope.restaurants[GameScope.restaurants.right].eloRating + 20);
  };
});