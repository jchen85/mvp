angular.module('restourney.game', [])

.controller('GameController', function($scope) {
  var GameScope = this;
  var restaurantsRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/");

  restaurantsRef.on('value', function(restaurants) {
    var restaurants = restaurants.val();
    $scope.$apply(function() {
      GameScope.restaurants = restaurants;
      GameScope.left = restaurants[restaurants.left];
      GameScope.right = restaurants[restaurants.right];
    });
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});