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
	ChessLoader.add('wP', 'lowploycountpawn');
    ChessLoader.add('wR', 'rookwh');
    ChessLoader.add('wN', 'knightwh');
    ChessLoader.add('wQ', 'queenwh');
    ChessLoader.add('wK', 'kingwh');
    ChessLoader.add('wB', 'bishop2white');
    ChessLoader.add('bP', 'lowploycountpawnblack');
    ChessLoader.add('bR', 'rookbk');
    ChessLoader.add('bN', 'knightbk');
    ChessLoader.add('bQ', 'queenbk');
    ChessLoader.add('bK', 'kingbk');
    ChessLoader.add('bB', 'bishop2black');

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
	return loaded[key] ? loaded[key].clone() : null;
};

function Load(key, obj) {
	this.key = key;
	this.obj = obj;
}

// Make available globally
window.ChessLoader = ChessLoader;

})();