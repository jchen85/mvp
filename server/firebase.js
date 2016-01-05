var Firebase = require("firebase");
var restaurantsRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/");

var dbState = {};

restaurantsRef.on('value', function(data) {
  dbState = data.val();
});

var chooseLeft = function(req, res) {
  var leftEloRating = dbState[dbState.left].eloRating;
  var leftEloRatingRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/" + dbState.left + '/eloRating');

  dbState[dbState.left].eloRating = leftEloRating + 20;

  afterChoosingTasks(req, res);
};

var chooseRight = function(req, res) {
  var rightEloRating = dbState[dbState.right].eloRating;
  var rightEloRatingRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/" + dbState.right + '/eloRating');

  dbState[dbState.right].eloRating = rightEloRating + 20;

  afterChoosingTasks(req, res);
};

var afterChoosingTasks = function(req, res) {
  dbState['currentList'] = shuffleArray(dbState['currentList']);
  dbState['left'] = dbState['currentList'][0];
  dbState['right'] = dbState['currentList'][1];
  dbState['currentListNamesScores'] = [];
  dbState['currentList'].forEach(function(restaurantHash) {
    dbState['currentListNamesScores'].push({ name: dbState[restaurantHash].name, eloRating: dbState[restaurantHash].eloRating });
  });

  dbState['currentListNamesScores'].sort(function(a,b) {
    return b.eloRating - a.eloRating;
  })

  restaurantsRef.set(dbState);
  res.end();
};

var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


module.exports.chooseLeft = chooseLeft;
module.exports.chooseRight = chooseRight;