angular.module('restourney.game', [])

.controller('GameController', function($scope, $firebaseObject, $state, Restaurants) {
  var GameScope = this;
  this.restaurantsRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/");
  this.left = {};
  this.right = {};

  var counterOptions = {
    useEasing : false, 
    useGrouping : true, 
    separator : ',', 
    decimal : '.', 
    prefix : '', 
    suffix : '' 
  };

  this.counter = new CountUp("counter", 5, 0, 2, 5, counterOptions);

  this.controlCounter = function() {
    GameScope.counter.reset();
    GameScope.counter.start(function() {
      GameScope.chooseLeft();
    });
  }

  $firebaseObject(this.restaurantsRef).$loaded()
  .then(function(restaurants) {
    GameScope.restaurants = restaurants;
    GameScope.left = restaurants[restaurants.left];
    GameScope.right = restaurants[restaurants.right];
    $state.go('game');
    GameScope.controlCounter();
  })

  $firebaseObject(this.restaurantsRef).$watch(function() {
    console.log('data changed');
    GameScope.left = GameScope.restaurants[GameScope.restaurants.left];
    GameScope.right = GameScope.restaurants[GameScope.restaurants.right];
    $state.go('game');
    GameScope.controlCounter();
  });

  this.chooseLeft = function() {
    Restaurants.chooseLeft();
    console.log('picked left');
  };

  this.chooseRight = function() {
    console.log('picked right');
    Restaurants.chooseRight();
  };



});