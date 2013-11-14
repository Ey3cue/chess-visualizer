
(function () {

var Chess = {};

var models;
var chess;

var centerObject;

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

    //_scene.add(Utils.createPointLight(0, 100, 0));
    var distanceFactor = 300;
    var height = 100;

    for (var i = -1; i < 2; i += 2) {
        for (var j = -1; j < 2; j += 2) {
            console.log(i * distanceFactor, height, j * distanceFactor);
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

    models.board.scale.set(20, 20, 20);
    models.board.position.set(-140, -20, 140);
    _scene.add(centerObject);
    chess.add(models.board);
    _scene.add(chess);

    var texture = THREE.ImageUtils.loadTexture('resources/textures/wood-1.png');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    texture.anisotropy = _renderer.getMaxAnisotropy();
    var material = new THREE.MeshPhongMaterial({ 
        map: texture,
        // light
        specular: '#ffffff',
        // intermediate
        color: '#555555',
        // dark
        emissive: '#ffffff',
        shininess: 100 
    });
    var base = new THREE.Mesh(new THREE.CubeGeometry(20, 0.2, 20), material);
    base.position.set(7, -0.1, -7);
    models.board.add(base);
}



// Make available globally
window.Chess = Chess;

})();