angular.module('restourney.game', [])

.controller('GameController', function($scope, $firebaseObject, $state, Restaurants) {
  var GameScope = this;

  this.left = {};
  this.right = {};
  this.progress = 0;
  this.remainingPicks = 2;

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
    GameScope.restaurants = restaurants;
    GameScope.left = restaurants[restaurants.left];
    GameScope.right = restaurants[restaurants.right];
    $state.go('game');
    GameScope.controlCounter();
  })();


  // $firebaseObject(this.restaurantsRef).$loaded()
  // .then(function(restaurants) {
  //   GameScope.restaurants = restaurants;
  //   GameScope.left = restaurants[restaurants.left];
  //   GameScope.right = restaurants[restaurants.right];
  //   $state.go('game');
  //   GameScope.controlCounter();
  // })

  // $firebaseObject(this.restaurantsRef).$watch(function() {
  //   if (GameScope.remainingPicks === 0) {
  //     endGame();
  //   } else {
  //     console.log('data changed');
  //     GameScope.left = GameScope.restaurants[GameScope.restaurants.left];
  //     GameScope.right = GameScope.restaurants[GameScope.restaurants.right];
  //     $state.go('game');
  //     GameScope.controlCounter();
  //   }
  // });

  var doAfterChoosing = function () {
    var restaurants = Restaurants.getRestaurantData();
    GameScope.restaurants = restaurants;
    GameScope.left = restaurants[restaurants.left];
    GameScope.right = restaurants[restaurants.right];
    $state.go('game');
    GameScope.controlCounter();
    GameScope.progress++;
    GameScope.remainingPicks--;
    if (GameScope.remainingPicks === 0) {
      endGame();
    }
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