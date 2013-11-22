
// Globals
var _renderer;
var _camera;
var _scene;

var _gui;

var _state;

(function () {

var Control = {};

var stats;

/**
 * Performs various initialization steps for the application.
 */
Control.init = function () {
    _renderer = new THREE.WebGLRenderer();
    _renderer.setSize(window.innerWidth, window.innerHeight);
    $('#chessVisualizer')[0].appendChild(_renderer.domElement);

    _state = new ChessState();
    _gui = new dat.GUI();

    ChessLoader.init();
    ChessLoader.addDefaults();
    ChessLoader.loadAll(Chess.init);

    Control.initStats();
    ControlGame.init();
};

Control.initStats = function () {
    stats = new Stats();

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);
};

Control.resize = function () {
    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();

    _renderer.setSize(window.innerWidth, window.innerHeight);
};

window.onload = Control.init;
window.onresize = Control.resize;

Control.animate = function () {
    stats.begin();

    requestAnimationFrame(Control.animate);

    Chess.update();

    _renderer.render(_scene, _camera);

    stats.end();
};

// Make available globally
window.Control = Control;

})();