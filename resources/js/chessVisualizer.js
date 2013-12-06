
(function () {

var Chess = {};

var models;
var chess;
var board;

var chessTweens;

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

    chessTweens = new TweenQueue();

    initScene();
    Camera.init();
    initLighting();

    Alert.warn('To avoid error, please allow ALL animations and loading to complete BEFORE interacting with the GUI.' +
               '<br><br>Note that castling and en passant moves are not yet supported.');

    Control.animate();
};

function initLighting() {
    var ambient = new THREE.AmbientLight( 0x101010 );
    _scene.add(ambient);

    var distanceFactor = 300;
    var height = 100;

    for (var i = -1; i < 2; i += 2) {
        for (var j = -1; j < 2; j += 2) {
            _scene.add(Utils.createPointLight(i * distanceFactor, height, j * distanceFactor));
        }
    }
}

function initScene() {
    _scene = new THREE.Scene();

    chess = new THREE.Object3D();

    board = ChessLoader.get('board');
    board.scale.set(Chess.BOARD_SCALE_FACTOR, Chess.BOARD_SCALE_FACTOR, Chess.BOARD_SCALE_FACTOR);
    board.position.set(-7 * Chess.BOARD_SCALE_FACTOR, -20, 7 * Chess.BOARD_SCALE_FACTOR);
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
    base.position.set(7, -0.5, -7);
    board.add(base);

    Chess.setSceneWithState(true);
}

Chess.setSceneWithState = function (isFirstSet) {
    for (var rank in models) {
        for (var file in models[rank]) {
            var currentModel = models[rank][file];
            if (currentModel) {
                // Remove any existing pieces
                board.remove(currentModel);
            }
            // Place new piece if it exists in the state
            var pieceStr = Chess.PIECES[_state.board[rank][file]];
            var model = ChessLoader.get(pieceStr);
            if (model) {
                models[rank][file] = model;
                model.position = Utils.cellToVec3(rank, file);
                //model.scale = Utils.vec3(0.01);
                model.scale = Utils.vec3(Chess.PIECE_SCALE_FACTOR[pieceStr]);
                model.rotation.y = Chess.PIECE_ROTATIONS[pieceStr];
                board.add(model);
                /*
                Chess.addTween({
                    model: model,
                    scale: Utils.vec3(Chess.PIECE_SCALE_FACTOR[pieceStr])
                });
                */
            } else if (pieceStr !== 'na') {
                console.warn('Could not get model for: ' + Chess.PIECES[_state.board[rank][file]]);
            }
        }
    }
    //Chess.startTweens();
};

Chess.stop = function () {
    Chess.stopTweens();
};

function clearMove() {
    currentMove = null;
}

Chess.move = function (move) {
    move = move.toUpperCase();
    var moveDef = _state.move(move);
    var sourceModel = models[move[2]][move[1]];
    var destModel = models[move[4]][move[3]];

    models[move[4]][move[3]] = sourceModel;
    models[move[2]][move[1]] = null;
    console.log(moveDef.constructor);
    switch (moveDef.constructor) {
    case MoveDefinition.EnPassant:
        // TODO Tween en passant
        break;
    case MoveDefinition.Castle:
        console.log('CASTLE');
        chessTweens.addTween({
            model: sourceModel,
            position: Utils.cellToXyz(moveDef.kingEnd)
        });
        chessTweens.addTween({
            model: models[moveDef.rookStart[1]][moveDef.rookStart[0]],
            position: Utils.cellToXyz(moveDef.rookEnd)
        });
        chessTweens.startTweens();
        break;
    case MoveDefinition.Capture:
        console.log('Capture');
        chessTweens.addTween({
            model: destModel,
            scale: Utils.xyz(0),
            callback: function () { board.remove(destModel); }
        });
        // Fall through
    case MoveDefinition.Normal:
        chessTweens.addTween({
            model: sourceModel,
            position: Utils.cellToXyz(moveDef.end)
        });
        chessTweens.startTweens();
        break;
    default:
        break;
    }
};

Chess.update = function () {
    TWEEN.update();
    TweenQueue.updateTweens();
};

// Make available globally
window.Chess = Chess;

})();