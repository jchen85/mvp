angular.module('restourney', [
  'restourney.game',
  'restourney.landing',
  'restourney.services',
  'ui.router'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  // $urlRouterProvider.otherwise("/links");

  $stateProvider
    .state('landing', {
      url: '/landing',
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController as landing',
    })
    .state('game', {
      url: '/game',
      templateUrl: 'app/game/game.html',
      controller: 'GameController as game',
    })
    .state('entry', {
      url: '/',
      controller: 'EntryController'
    });

    // $httpProvider.interceptors.push('AttachTokens');
});
// .factory('AttachTokens', function ($window) {
//   // this is an $httpInterceptor
//   // its job is to stop all out going request
//   // then look in local storage and find the user's token
//   // then add it to the header so the server can validate the request
//   var attach = {
//     request: function (object) {
//       var jwt = $window.localStorage.getItem('com.shortly');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })
// .run(function ($rootScope, $location, Auth) {
//   // here inside the run phase of angular, our services and controllers
//   // have just been registered and our app is ready
//   // however, we want to make sure the user is authorized
//   // we listen for when angular is trying to change routes
//   // when it does change routes, we then look for the token in localstorage
//   // and send that token to the server to see if it is a real user or hasn't expired
//   // if it's not valid, we then redirect back to signin/signup
//   $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//     if (toState && toState.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });
// });
