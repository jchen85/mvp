angular.module('restourney.game', [])

.controller('GameController', function($scope, $firebaseObject, $state, Restaurants) {
  var GameScope = this;
  this.restaurantsRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/");
  this.left = {};
  this.right = {};
  this.progress = 0;
  this.remainingPicks = 20;

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
    if (GameScope.remainingPicks === 0) {
      endGame();
    } else {
      console.log('data changed');
      GameScope.left = GameScope.restaurants[GameScope.restaurants.left];
      GameScope.right = GameScope.restaurants[GameScope.restaurants.right];
      $state.go('game');
      GameScope.controlCounter();
    }
  });

  this.chooseLeft = function() {
    if (GameScope.remainingPicks > 0) {
      Restaurants.chooseLeft();
      console.log('picked left');
      GameScope.progress++;
      GameScope.remainingPicks--;
      shake('left');
    }
  };

  this.chooseRight = function() {
    if (GameScope.remainingPicks > 0) {
      console.log('picked right');
      Restaurants.chooseRight();
      GameScope.progress++;
      GameScope.remainingPicks--;
      shake('right');
    }
  };

  var endGame = function() {
    GameScope.counter.reset();
    $('#gameOver').toggle();
    $('.navbar').toggle();
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


  // var init = function() {
  //  var $window = $(window),
  //  $stickyEl = $('.container-fluid'),
  //  elTop = $stickyEl.offset().top;

  //  $window.scroll(function() {
  //       $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
  //   });
  // }

  // init();
  // this.growProgressBar = function() {
  //   var containerWidth = $("#progressBarContainer").width();
  //   var currentWidth = d3.select('.progressBar').attr('width');
  //   d3.select('.progressBar').attr('width', Number(currentWidth) + containerWidth/20)
  // }

  // var init = function() {
  //   var containerWidth = $("#progressBarContainer").width(),
  //       aspect = 500 / 950;

  //   var svg = d3.select("#progressBarContainer").append("svg")
  //     .attr("preserveAspectRatio", "xMidYMid")
  //     .attr("viewBox", "0 0 950 500")
  //     .attr("width", $(window).width())
  //     .attr("height", width * aspect);

  //   $(window).resize(function() {
  //     var containerWidth = $("#progressBarContainer").width();
  //     svg.attr("width", containerWidth);
  //     svg.attr("height", containerWidth * aspect);
  //     d3.select('.progressBar').attr('width', containerWidth/GameScope.progress);
  //   });

  //   svg.append('rect')
  //     .attr('class', 'progressBar')
  //     .attr('width', 0)
  //     .attr('height', 20)
  //     .style('color', 'blue');
  // }

  // init();



});