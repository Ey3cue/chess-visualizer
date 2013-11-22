
var _generalParams;
var _gameParams;

(function () {

var ControlGame = {};

var GAME_URL = 'http://www.bencarle.com/chess/cg/';

var gameTimeout;
var isFollowingGame = false;
var currentGameId;
var currentMovesList;

ControlGame.init = function () {
    _generalParams = {
        showStats: true
    };

    var folder;
    folder = _gui.addFolder('General');
    folder.add(_generalParams, 'showStats').onChange(function () { $('#stats').toggle(); });

    _gameParams = {
        gameId: '340',
        showGame: startGame,
        stopGame: stopGame,
        pollingInterval: 2,
        playFromBeginning: resetGame,
        waitBetweenMoves: 0.5
    };

    folder = _gui.addFolder('Current Game');
    folder.add(_gameParams, 'gameId').listen();
    folder.add(_gameParams, 'showGame');
    folder.add(_gameParams, 'stopGame');
    folder.add(_gameParams, 'playFromBeginning');
    folder.add(_gameParams, 'pollingInterval', 1, 10).step(0.5);
    folder.add(_gameParams, 'waitBetweenMoves', 0, 10).step(0.5);
    folder.open();
};

function startGame() {
    if (isFollowingGame) {
        if (currentGameId === _gameParams.gameId) {
            Alert.info('You are already following game ' + currentGameId + '.');
        } else {
            stopGame();
            currentGameId = _gameParams.gameId;
            followGame();
        }
    } else {
        isFollowingGame = true;
        currentGameId = _gameParams.gameId;
        followGame();
    }
}

function followGame() {
    Alert.loading();
    $.ajax({
        method: 'GET',
        url: GAME_URL + currentGameId,
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: updateGame,
        error: function () {
            Alert.done();
            Alert.error('Unable to retrieve game ' + currentGameId + '.');
            isFollowingGame = false;
        }
    });
}

function updateGame(response) {
    Alert.done();
    var i;

    if (!currentMovesList) {
        // Following new game
        Alert.info('Now following game ' + currentGameId + '.');
        _state.reset();
        currentMovesList = response.moves;
        for (i = 0; i < currentMovesList.length; i++) {
            _state.move(currentMovesList[i]);
        }
        Chess.setSceneWithState();
    } else {
        // Check for any new moves
        for (i = currentMovesList.length; i < response.moves.length; i++) {
            Chess.move(response.moves[i]);
        }
        currentMovesList = response.moves;
    }

    if (isFollowingGame) {
        gameTimeout = setTimeout(followGame, _gameParams.pollingInterval * 1000);
    }
}

function stopGame() {
    if (isFollowingGame) {
        isFollowingGame = false;
        clearTimeout(gameTimeout);
        gameTimeout = null;

        Alert.info('Stopped following game ' + currentGameId + '.');

        currentGameId = null;
        currentMovesList = null;

        _state.reset();
        Chess.setSceneWithState();
    } else {
        Alert.error('Not currently following a game.');
    }
}

function resetGame() {
    if (isFollowingGame) {
        Alert.info('Playing game ' + currentGameId + ' from the beginning.');
        _state.reset();
        Chess.setSceneWithState();
        for (var i = 0; i < currentMovesList.length; i++) {
            //Chess.move(currentMovesList[i]);
        }
    } else {
        Alert.error('Not currently following a game.');
    }
}

// Make available globally
window.ControlGame = ControlGame;

})();