
var _gameParams;
var folderi;

(function () {

var ControlGame = {};

var GAME_URL = 'http://www.bencarle.com/chess/cg/';

ControlGame.init = function () {
	_gameParams = {
		gameNumber: 0
	};

	var folder = _gui.addFolder('Current Game');
	folder.add(_gameParams, 'gameNumber');
	folder.open();
};


// Make available globally
window.ControlGame = ControlGame;

})();