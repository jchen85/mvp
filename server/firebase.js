var Firebase = require("firebase");
var restaurantsRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/");

var dbState = {};

restaurantsRef.on('value', function(data) {
  dbState = data.val();
});

var eloCalculator = function (winner, loser) {
    var weighingFactor = 30;

    var expectedWinner = 1 / (1 + Math.pow(10, (loser - winner) / 400));
    var expectedLoser = 1 / (1 + Math.pow(10, (winner - loser) / 400));
    
    var newWinner = Math.ceil(winner + weighingFactor * (1 - expectedWinner));
    var newLoser = Math.ceil(loser + weighingFactor * (0 - expectedLoser));
    
    return [newWinner, newLoser];
}


var chooseLeft = function(req, res) {
  var leftEloRatingRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/" + dbState.left + '/eloRating');

  var leftEloRating = dbState[dbState.left].eloRating;
  var rightEloRating = dbState[dbState.right].eloRating;
  
  var newScores = eloCalculator(leftEloRating, rightEloRating);

  dbState[dbState.left].eloRating = newScores[0];
  dbState[dbState.right].eloRating = newScores[1];

  afterChoosingTasks(req, res);
};

var chooseRight = function(req, res) {
  var rightEloRatingRef = new Firebase("https://vivid-inferno-1656.firebaseio.com/" + dbState.right + '/eloRating');

  var rightEloRating = dbState[dbState.right].eloRating;
  var leftEloRating = dbState[dbState.left].eloRating;

  var newScores = eloCalculator(rightEloRating, leftEloRating);

  dbState[dbState.right].eloRating = newScores[0];
  dbState[dbState.left].eloRating = newScores[1];

  afterChoosingTasks(req, res);
};

var afterChoosingTasks = function(req, res) {
  dbState['currentList'] = shuffleArray(dbState['currentList']);
  dbState['left'] = dbState['currentList'][0];
  dbState['right'] = dbState['currentList'][1];

  // Update the list of restaurants and their scores, then sort by score so the view will put them in order
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