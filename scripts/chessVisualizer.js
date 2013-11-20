
(function () {

var Chess = {};

var models;
var chess;
var board;

var centerObject;

var PIECE_X_FACTOR = 2;
var PIECE_Z_FACTOR = -2;
var PIECE_Y = 0.2;
var PIECE_SCALE_FACTOR = 0.7;

var BOARD_SCALE_FACTOR = 20;

/**
 * Initializes the board.
 */
Chess.init = function () {
    models = {
        8: { A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null },
        7: { A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null },
        6: { A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null },
        5: { A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null },
        4: { A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null },
        3: { A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null },
        2: { A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null },
        1: { A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null }
    };

    initCamera();
    initScene();
    initLighting();

    Control.animate();
};

function initLighting() {
    var ambient = new THREE.AmbientLight( 0x101010 );
    _scene.add(ambient);

    //_scene.add(Utils.createPointLight(0, 100, 0));
    var distanceFactor = 300;
    var height = 100;

    for (var i = -1; i < 2; i += 2) {
        for (var j = -1; j < 2; j += 2) {
            _scene.add(Utils.createPointLight(i * distanceFactor, height, j * distanceFactor));
        }
    }
}

function initCamera() {
    _camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    _camera.position.set(0, 200, 350);

    new THREE.OrbitControls(_camera);
}

function initScene() {
    _scene = new THREE.Scene();

    chess = new THREE.Object3D();

    board = ChessLoader.get('board');
    board.scale.set(BOARD_SCALE_FACTOR, BOARD_SCALE_FACTOR, BOARD_SCALE_FACTOR);
    board.position.set(-7 * BOARD_SCALE_FACTOR, -20, 7 * BOARD_SCALE_FACTOR);
    chess.add(board);
    _scene.add(chess);

    // Wood texture outline
    var texture = THREE.ImageUtils.loadTexture('resources/textures/wood-1.png');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    texture.anisotropy = _renderer.getMaxAnisotropy();
    var material = new THREE.MeshPhongMaterial({
        map: texture,
        specular: '#FFFFFF',
        color:'#555555',
        emissive:'#FFFFFF',
        shininess: 100
    });
    var base = new THREE.Mesh(new THREE.CubeGeometry(19, 0.35, 19), material);
    base.position.set(7, -0.1, -7);
    board.add(base);

    Chess.setSceneWithState(_state);
}

Chess.setSceneWithState = function (state) {
    for (var rank in models) {
        for (var file in models[rank]) {
            var currentModel = models[rank][file];
            if (currentModel) {
                // Remove any existing pieces
                board.remove(currentModel);
            }

            // Place new piece if it exists in the state
            var pieceStr = ChessState.PIECES[state.board[rank][file]];
            var model = ChessLoader.get(pieceStr);
            if (model) {
                models[rank][file] = model;
                model.position.set(boardX(file), PIECE_Y, boardZ(rank));
                model.scale.set(PIECE_SCALE_FACTOR, PIECE_SCALE_FACTOR, PIECE_SCALE_FACTOR);
                model.rotation.y = PIECE_ROTATIONS[pieceStr];
                board.add(model);
            } else if (pieceStr !== 'na') {
                console.warn('Could not get model for: ' + ChessState.PIECES[state.board[rank][file]]);
            }
        }
    }
};

function boardX(file) {
    return ChessState.FILES[file] * PIECE_X_FACTOR;
}

function boardZ(rank) {
    return ChessState.RANKS[rank] * PIECE_Z_FACTOR;
}

var PIECE_ROTATIONS = {
    // White
    wP: 0,
    wR: 0,
    wN: Utils.toRads(180),
    wQ: 0,
    wK: Utils.toRads(90),
    wB: Utils.toRads(90),
    // Black
    bP: 0,
    bR: 0,
    bN: 0,
    bQ: 0,
    bK: Utils.toRads(90),
    bB: Utils.toRads(-90)
};

// Make available globally
window.Chess = Chess;

})();