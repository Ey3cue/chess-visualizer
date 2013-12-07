(function () {

var ChessAppearance = {};

ChessAppearance.initBoard = function () {
    _board = new THREE.Object3D();

    var materials = [];
    var boardMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('resources/textures/board-1.jpg'),
        specular: '#FFFFFF',
        color: '#FFFFFF',
        emissive: '#000000',
        shininess: 100
    });
    for (var i = 0; i < 6; i++) {
        materials.push(i === 2 ? boardMaterial : new THREE.MeshBasicMaterial({ color: 0xA3A3AA }));
    }
    var boardSurface = new THREE.Mesh(new THREE.CubeGeometry(16, 0.1, 16), new THREE.MeshFaceMaterial(materials));

    boardSurface.position.set(7, 0.15, -7);
    _board.add(boardSurface);

    _board.scale.set(Chess.BOARD_SCALE_FACTOR, Chess.BOARD_SCALE_FACTOR, Chess.BOARD_SCALE_FACTOR);
    _board.position.set(-7 * Chess.BOARD_SCALE_FACTOR, -20, 7 * Chess.BOARD_SCALE_FACTOR);

    _chess.add(_board);
    _scene.add(_chess);
};

ChessAppearance.initBoardBase = function () {
    // Marble texture outline
    var materials = [];
    var baseTexture = THREE.ImageUtils.loadTexture('resources/textures/board-1-base.jpg');
    for (var i = 0; i < 6; i++) {
        switch (i) {
        case 2:
            materials.push(new THREE.MeshPhongMaterial({
                map: baseTexture,
                specular: 0xFFFFFF,
                color: 0xFFFFFF,
                emissive: 0,
                shininess: 100
            }));
            break;
        case 3:
            materials.push(new THREE.MeshPhongMaterial({
                map: baseTexture,
                specular: 0xFFFFFF,
                color: 0xFFFFFF,
                emissive: 0xFFFFFF,
                shininess: 100
            }));
            break;
        default:
            materials.push(new THREE.MeshBasicMaterial({ color: 0xA3A3AA }));
        }
    }
    var boardBase = new THREE.Mesh(new THREE.CubeGeometry(20, 0.3, 20), new THREE.MeshFaceMaterial(materials));

    boardBase.position.set(7, 0, -7);
    _board.add(boardBase);
};


ChessAppearance.woodOld = function () {
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
    base.position.set(7, 0, -7);
    //board.add(base);
};


// Make available globally
window.ChessAppearance = ChessAppearance;

})();