
var _generalParams;
var _gameParams;

(function () {

var ControlGame = {};

var GAME_URLS = {
    'bencarle': 'http://www.bencarle.com/chess/cg/',
    '10.11.18.65': 'https://10.11.18.65/cg/chess/'
};

var URL_ERRORS = {
    'bencarle': 'Note that cross-domain requests must be allowed to use this URL.',
    '10.11.18.65': 'Note that you must be connected to the Marist internal network to use this URL.'
};

var gameTimeout;
var currentGameId;
var currentMovesList;

ControlGame.init = function () {
    _generalParams = {
        showStats: true,
        boardTheme: ChessAppearance.themes[0],
        baseTheme: ChessAppearance.themes[0],
        background: Object.keys(ChessAppearance.backgrounds)[1]
    };

    var folder;
    folder = _gui.addFolder('General');
    folder.add(_generalParams, 'showStats').onChange(function () { $('#stats').toggle(); });
    folder.add(_generalParams, 'boardTheme', ChessAppearance.themes).onChange(ChessAppearance.setBoard);
    folder.add(_generalParams, 'baseTheme', ChessAppearance.themes).onChange(ChessAppearance.setBase);
    folder.add(_generalParams, 'background', Object.keys(ChessAppearance.backgrounds)).onChange(ChessAppearance.setBackground);
    folder.open();

    _gameParams = {
        viewWhite: Camera.viewWhite,
        viewBlack: Camera.viewBlack,
        viewNuetral: Camera.viewNuetral,
        viewTopDown: Camera.viewTopDown,

        resetBoard: resetBoard,
        //customMoveSequence: 'Pe2e4,Bf1d3,Kg1f3,Ke1g1', // Castle check
        customMoveSequence: 'Pe2e4,Pf7f4,Pe4f5', // En passant check
        playMoveSequence: playCustomMoveSequence,

        gameUrl: '10.11.18.65',
        //gameUrl: 'bencarle',
        gameId: '340',
        //gameId: '52',
        showGame: startGame,
        stopGame: stopGame,
        pollingInterval: 2,
        playFromBeginning: resetGame,
        waitBetweenMoves: 0.1
    };

    folder = _gui.addFolder('Camera Controls');
    folder.add(_gameParams, 'viewWhite');
    folder.add(_gameParams, 'viewBlack');
    folder.add(_gameParams, 'viewNuetral');
    folder.add(_gameParams, 'viewTopDown');

    folder = _gui.addFolder('Custom Game');
    folder.add(_gameParams, 'resetBoard');
    folder.add(_gameParams, 'customMoveSequence');
    folder.add(_gameParams, 'playMoveSequence');

    folder = _gui.addFolder('Current Game');
    folder.add(_gameParams, 'gameUrl', Object.keys(GAME_URLS));
    folder.add(_gameParams, 'gameId').listen();
    folder.add(_gameParams, 'showGame');
    folder.add(_gameParams, 'stopGame');
    folder.add(_gameParams, 'playFromBeginning');
    folder.add(_gameParams, 'pollingInterval', 1, 10).step(0.5);
    folder.add(_gameParams, 'waitBetweenMoves', 0.1, 2).step(0.1);
    folder.open();
};

function startGame() {
    if (gameTimeout) {
        if (currentGameId === _gameParams.gameId) {
            Alert.info('You are already following game ' + currentGameId + '.');
        } else {
            stopGame();
            currentGameId = _gameParams.gameId;
            followGame();
        }
    } else {
        currentGameId = _gameParams.gameId;
        followGame();
    }
}

function followGame() {
    Alert.loading();
    $.ajax({
        method: 'GET',
        url: GAME_URLS[_gameParams.gameUrl] + currentGameId,
        crossDomain: true,
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: updateGame,
        error: function () {
            Alert.done();
            Alert.error('Unable to retrieve game ' + currentGameId + '.<br>' + URL_ERRORS[_gameParams.gameUrl]);
            // Will have been cleared by activation at this point
            gameTimeout = null;
        }
    });
}

function updateGame(response) {
    Alert.done();
    var i;

    try {
        if (!gameTimeout) {
            // Following new game
            _state.reset();
            currentMovesList = response.moves;
            for (i = 0; i < currentMovesList.length; i++) {
                _state.move(currentMovesList[i]);
            }
            Chess.setSceneWithState();
            Alert.info('Now following game ' + currentGameId + '.');
        } else {
            // Check for any new moves
            for (i = currentMovesList.length; i < response.moves.length; i++) {
                Chess.move(response.moves[i]);
            }
            currentMovesList = response.moves;
        }

        gameTimeout = setTimeout(followGame, _gameParams.pollingInterval * 1000);
    } catch (e) {
        Alert.error('An unknown error occured following game.<br>See console for details.' +
                    '<br>Stopped following game ' + currentGameId + '.');
        clearTimeout(gameTimeout);
        gameTimeout = null;
        currentGameId = null;
        currentMovesList = null;
        Chess.stop();
        throw e;
    }
}

function stopGame(noErrorMessage) {
    if (gameTimeout) {
        Alert.info('Stopped following game ' + currentGameId + '.');
        clearTimeout(gameTimeout);
        gameTimeout = null;
        currentGameId = null;
        currentMovesList = null;
        Chess.stop();
    } else if (!noErrorMessage) {
        Alert.error('Not currently following a game.');
    }
}

function resetGame() {
    if (gameTimeout) {
        Alert.info('Playing game ' + currentGameId + ' from the beginning.');
        _state.reset();
        Chess.setSceneWithState();
        for (var i = 0; i < currentMovesList.length; i++) {
            Chess.move(currentMovesList[i]);
        }
    } else {
        Alert.error('Not currently following a game.');
    }
}

function resetBoard() {
    stopGame(true);
    _state.reset();
    Chess.setSceneWithState();
}

function playCustomMoveSequence() {
    Alert.info('Playing custom move sequence.');
    var movesList = _gameParams.customMoveSequence.match(/[KQBNRP]([A-H][1-8]){2}[KQBNRP]?/gi);
    for (var i = 0; i < movesList.length; i++) {
        Chess.move(movesList[i]);
    }
}

function playSampleGame() {
    Alert.info('Playing sample game.');
    resetBoard();
    for (var i = 0; i < Chess.SAMPLE_GAME.length; i++) {
        Chess.move(Chess.SAMPLE_GAME[i]);
    }
}

// Make available globally
window.ControlGame = ControlGame;

})();