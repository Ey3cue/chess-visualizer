
// Globals
var _renderer;
var _camera;
var _scene;

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

    ChessLoader.init();
    ChessLoader.addDefaults();
    ChessLoader.loadAll(Chess.init);
};

Control.resize = function () {
    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();

    _renderer.setSize(window.innerWidth, window.innerHeight);
};

window.onload = Control.init;
window.onresize = Control.resize;

Control.animate = function () {
    requestAnimationFrame(Control.animate);

    _camera.lookAt(_scene.position);
    _renderer.render(_scene, _camera);
};


// Make available globally
window.Control = Control;

})();