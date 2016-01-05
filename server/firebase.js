var Firebase = require("firebase");
var restaurantsRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/");

var dbState = {};

restaurantsRef.on('value', function(data) {
  dbState = data.val();
});

var chooseLeft = function(req, res) {
  var leftEloRating = dbState[dbState.left].eloRating;
  var leftEloRatingRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/" + dbState.left + '/eloRating');

  leftEloRatingRef.set(leftEloRating + 20);

  // console.log(leftRef.val())
  // leftRef.once('value', function(d) {
  //   var target = new Firebase("https://vivid-inferno-1656.firebaseio.com/" + d.val().toString() + "/eloRating");
  //   target.once('value',function(d) {
  //     target.set(d.val() + 20);
  //   });
  // });
  // restaurantsRef.child('left').child('eloRating').once('value', function(d) {console.log(d.val())})
  // console.log(restaurantsRef.child('left').child('eloRating'));
  // restaurantsRef.child('left').child('eloRating').set(restaurantsRef.child('left').child('eloRating') + 20);
  console.log('chose left')
  res.end();
}

module.exports.chooseLeft = chooseLeft;