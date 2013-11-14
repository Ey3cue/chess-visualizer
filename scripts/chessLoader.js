(function () {

ChessLoader = {};

var MODELS_PATH = 'resources/models/';
var loader;
var loads;
var loaded;
var total;
var totalLoaded;

ChessLoader.init = function () {
	loader = new THREE.OBJMTLLoader();
	loads = {};
	loaded = {};
	total = 0;
	totalLoaded = 0;
};

ChessLoader.add = function (key, obj) {
	if (loads[key]) {
		throw 'Duplicate key.';
	}

	loads[key] = new Load(key, obj);
	total++;
};

ChessLoader.addDefaults = function () {
	// ChessLoader.add('wP', '', '');
    // ChessLoader.add('wR', '', '');
    // ChessLoader.add('wN', '', '');
    // ChessLoader.add('wQ', '', '');
    // ChessLoader.add('wK', '', '');
    // ChessLoader.add('wB', '', '');
    // ChessLoader.add('bP', '', '');
    // ChessLoader.add('bR', '', '');
    // ChessLoader.add('bN', '', '');
    // ChessLoader.add('bQ', '', '');
    // ChessLoader.add('bK', '', '');
    // ChessLoader.add('bB', '', '');

    ChessLoader.add('board', 'board3');
};

ChessLoader.loadAll = function (callback) {
	for (var i in loads) {
		(function (load) {
			loader.load(MODELS_PATH + load.obj + '.obj', MODELS_PATH + load.obj + '.mtl', function (object) {
				loaded[load.key] = object;
				totalLoaded++;
			});
		})(loads[i]);
	}

	var checkInterval = setInterval(function () {
		if (total === totalLoaded) {
			clearInterval(checkInterval);
			ChessLoader.objects = loaded;
			callback();
		}
	}, 100);
};

ChessLoader.get = function (key) {
	return loaded[key];
};

function Load(key, obj) {
	this.key = key;
	this.obj = obj;
}

// Make available globally
window.ChessLoader = ChessLoader;

})();