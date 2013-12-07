
(function () {

var Chess = {};

var models;

var chessTweens;
var capturedModels;

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
    capturedModels = [];

    initScene();
    Camera.init();
    initLighting();

    Alert.warn('To avoid error, please allow ALL animations and loading to complete BEFORE interacting with the GUI.');

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

    _chess = new THREE.Object3D();

    //board = ChessLoader.get('board');
    ChessAppearance.init();

    _board.scale.set(Chess.BOARD_SCALE_FACTOR, Chess.BOARD_SCALE_FACTOR, Chess.BOARD_SCALE_FACTOR);
    _board.position.set(-7 * Chess.BOARD_SCALE_FACTOR, -20, 7 * Chess.BOARD_SCALE_FACTOR);

    Chess.setSceneWithState(true);
}

Chess.setSceneWithState = function (isFirstSet) {
    for (var i = capturedModels.length - 1; i >= 0; i--) {
        _board.remove(capturedModels[i]);
    }
    capturedModels = [];

    for (var rank in models) {
        for (var file in models[rank]) {
            var currentModel = models[rank][file];
            if (currentModel) {
                // Remove any existing pieces
                models[rank][file] = null;
                _board.remove(currentModel);
            }

            // Place new piece if it exists in the state
            var pieceStr = Chess.PIECES[_state.board[rank][file]];
            var model = ChessLoader.get(pieceStr);
            if (model) {
                models[rank][file] = model;
                model.position = Utils.cellToVec3(rank, file);
                model.scale = Utils.vec3(0.01);
                //model.scale = Utils.vec3(Chess.PIECE_SCALE_FACTOR[pieceStr]);
                model.rotation.y = Chess.PIECE_ROTATIONS[pieceStr];
                _board.add(model);
                chessTweens.addTween({
                    model: model,
                    scale: Utils.vec3(Chess.PIECE_SCALE_FACTOR[pieceStr])
                });
            } else if (pieceStr !== 'na') {
                console.warn('Could not get model for: ' + Chess.PIECES[_state.board[rank][file]]);
            }
        }
    }
    chessTweens.startTweens();
};

Chess.stop = function () {
    chessTweens.stopTweens();
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

    switch (moveDef.constructor) {
    case MoveDefinition.EnPassant:
        chessTweens.addTween({
            model: sourceModel,
            position: Utils.cellToXyz(moveDef.end)
        });
        var capturedModel = models[moveDef.remove[1]][moveDef.remove[0]];
        models[moveDef.remove[1]][moveDef.remove[0]] = null;
        chessTweens.addTween({
            model: capturedModel,
            scale: Utils.xyz(0),
            callback: function () { _board.remove(capturedModel); }
        });
        capturedModels.push(capturedModel);
        chessTweens.startTweens();
        break;
    case MoveDefinition.Castle:
        var rookModel = models[moveDef.rookStart[1]][moveDef.rookStart[0]];
        // Move rook to new position
        models[moveDef.rookStart[1]][moveDef.rookStart[0]] = null;
        models[moveDef.rookEnd[1]][moveDef.rookEnd[0]] = rookModel;
        // Animate castle
        chessTweens.addTween({
            model: sourceModel,
            position: Utils.cellToXyz(moveDef.kingEnd)
        });
        chessTweens.addTween({
            model: rookModel,
            position: Utils.cellToXyz(moveDef.rookEnd)
        });
        chessTweens.startTweens();
        break;
    case MoveDefinition.Capture:
        chessTweens.addTween({
            model: destModel,
            scale: Utils.xyz(0),
            callback: function () { _board.remove(destModel); }
        });
        capturedModels.push(destModel);
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

    if (moveDef.promotion) {
        var newModel = ChessLoader.get(moveDef.promotion);
        newModel.position = Utils.cellToVec3(moveDef.end);
        newModel.rotation.y = Chess.PIECE_ROTATIONS[moveDef.promotion];
        newModel.scale = Utils.vec3(0.01);
        board.add(newModel);
        models[move[4]][move[3]] = newModel;
        chessTweens.addTween({
            model: sourceModel,
            scale: Utils.xyz(0.01),
            delay: 0,
            callback: function () { _board.remove(sourceModel); }
        });
        chessTweens.addTween({
            model: newModel,
            scale: Utils.vec3(Chess.PIECE_SCALE_FACTOR[moveDef.promotion]),
            delay: 0
        });
        chessTweens.startTweens();
    }
};

Chess.update = function () {
    TWEEN.update();
    TweenQueue.updateTweens();
};

// Make available globally
window.Chess = Chess;

})();