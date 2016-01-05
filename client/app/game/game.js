angular.module('restourney.game', [])

.controller('GameController', function($scope) {
  var GameScope = this;
  this.restaurantsRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/");
  this.leftRef = {};
  this.rightRef = {};

  this.restaurantsRef.on('value', function(restaurants) {
    var restaurants = restaurants.val();
    $scope.$apply(function() {
      GameScope.restaurants = restaurants;
      GameScope.left = restaurants[restaurants.left];
      GameScope.right = restaurants[restaurants.right];
      GameScope.leftRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/" + restaurants.left.toString());
      GameScope.rightRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/" + restaurants.right.toString());
    });
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  this.chooseLeft = function($http) {
    console.log('picked left');
    GameScope.leftRef.child('eloRating').set(GameScope.restaurants[GameScope.restaurants.left].eloRating + 20);
  };

  this.chooseRight = function() {
    console.log('picked right');
  };
});