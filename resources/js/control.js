
// Globals
var _renderer;
var _camera;
var _scene;

var _chess;
var _board;

var _gui;
var _stats;

var _state;

(function () {

var Control = {};

/**
 * Performs various initialization steps for the application.
 */
Control.init = function () {
    _renderer = new THREE.WebGLRenderer();
    _renderer.setSize(window.innerWidth, window.innerHeight);
    $('#chessVisualizer')[0].appendChild(_renderer.domElement);

    _state = new ChessState();

    _gui = new dat.GUI();
    _gui.width = 280;

    Alert.init();

    ChessLoader.init();
    ChessLoader.addDefaults();
    ChessLoader.loadAll(Chess.init);

    Control.initStats();
    ControlGame.init();
};

Control.initStats = function () {
    _stats = new Stats();

    // Align top-left
    _stats.domElement.style.position = 'absolute';
    _stats.domElement.style.left = '0px';
    _stats.domElement.style.top = '0px';

    document.body.appendChild(_stats.domElement);
};

Control.resize = function () {
    Alert.resizeLoader();

    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();

    _renderer.setSize(window.innerWidth, window.innerHeight);
};

window.onload = Control.init;
window.onresize = Control.resize;

Control.animate = function () {
    requestAnimationFrame(Control.animate);
    
    _stats.begin();

    Chess.update();

    _renderer.render(_scene, _camera);

    _stats.end();
};

// Make available globally
window.Control = Control;

})();