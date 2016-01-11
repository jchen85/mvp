angular.module('restourney.game', [])

.controller('GameController', function($scope, $firebaseObject, $state, Restaurants) {
  var GameScope = this;

  this.left = {};
  this.right = {};
  this.progress = 0;
  this.remainingPicks = 20;

  this.counter = new CountUp("counter", 5, 0, 2, 5, counterOptions);
  var counterOptions = {
    useEasing : false, 
    useGrouping : true, 
    separator : ',', 
    decimal : '.', 
    prefix : '', 
    suffix : '' 
  };

  this.controlCounter = function() {
    GameScope.counter.reset();
    GameScope.counter.start(function() {
      GameScope.chooseLeft();
    });
  };

  // Initialization tasks
  (function() {
    var restaurants = Restaurants.getRestaurantData();
    if (restaurants === undefined) {
      $state.go('landing');
    } else {
      GameScope.restaurants = restaurants;
      GameScope.left = restaurants[restaurants.left];
      GameScope.right = restaurants[restaurants.right];
      $state.go('game');
      GameScope.controlCounter();
    }
  })();

  var doAfterChoosing = function () {
    $scope.$apply(function() {
      var restaurants = Restaurants.getRestaurantData();
      GameScope.restaurants = restaurants;
      GameScope.left = restaurants[restaurants.left];
      GameScope.right = restaurants[restaurants.right];
      GameScope.progress++;
      GameScope.remainingPicks--; 
      if (GameScope.remainingPicks === 0) {
        endGame();
      }
      GameScope.controlCounter();
    });
  };

  this.chooseLeft = function() {
    if (GameScope.remainingPicks > 0) {
      Restaurants.chooseLeft();
      doAfterChoosing();
      shake('left');
    }
  };

  this.chooseRight = function() {
    if (GameScope.remainingPicks > 0) {
      Restaurants.chooseRight();
      doAfterChoosing();
      shake('right');
    }
  };

  var endGame = function() {
    if (GameScope.remainingPicks === 0) {
      GameScope.counter.reset();
      $('#gameOver').toggle();
      $('.navbar').toggle();
    }
  }

  var shake = function(side){
    $('#' + side).animate({
        'margin-left': '-=5px',
        'margin-right': '+=5px'
    }, 100, function() {
        $('#' + side).animate({
            'margin-left': '+=5px',
            'margin-right': '-=5px'
        }, 100, function() {
            //and so on...
        });
    });
  }

});