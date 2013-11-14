
(function () {

var Chess = {};

var models;
var chess;

/**
 * Initializes the board.
 */
Chess.init = function () {
    models = ChessLoader.objects;

    initCamera();
    initScene();
    initLighting();
    
    Control.animate();
};

function initLighting() {
    var ambient = new THREE.AmbientLight( 0x101010 );
    _scene.add(ambient);

    addPointLight(0, 100, 0);
    addPointLight(-200, 20, -200);
    addPointLight(-200, 20,  200);
    addPointLight( 200, 20, -200);
    addPointLight( 200, 20,  200);
}

function addPointLight(x, y, z) {
    var pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.set(x, y, z);
    _scene.add(pointLight);
}

function initCamera() {
    _camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    _camera.position.set(0, 200, 350);

    new THREE.OrbitControls(_camera);
}

function initScene() {
    _scene = new THREE.Scene();

    chess = new THREE.Object3D();

    models.board.scale.set(20, 20, 20);
    models.board.position.set(-140, -20, 140);
    chess.add(models.board);
    _scene.add(chess);


    var cube = new THREE.Mesh(new THREE.CubeGeometry(40, 1, 1), new THREE.MeshNormalMaterial());
    _scene.add(cube);
}

// Make available globally
window.Chess = Chess;

})();