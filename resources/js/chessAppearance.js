(function () {

var ChessAppearance = {};

var boardSurfaces = {};
var boardBases = {};

var currentBoardTheme;
var currentBaseTheme;

ChessAppearance.backgrounds = {
    background1: 'resources/textures/background-1.jpg',
    background2: 'resources/textures/background-2.jpg'
};

ChessAppearance.themes = ['marble', 'wood'];

ChessAppearance.init = function () {
    _board = new THREE.Object3D();

    boardSurfaces.marble = createBoard('resources/textures/board-1.jpg', 0xA3A3AA);
    boardBases.marble = createBoardBase('resources/textures/board-1-base.jpg', 0xA3A3AA);

    boardSurfaces.wood = createBoard('resources/textures/board-2.jpg', 0x230E00);
    boardBases.wood = createBoardBase('resources/textures/board-2-base.jpg', 0x230E00);

    _board.add(boardSurfaces[ChessAppearance.themes[0]]);
    _board.add(boardBases[ChessAppearance.themes[0]]);

    currentBoardTheme = ChessAppearance.themes[0];
    currentBaseTheme = ChessAppearance.themes[0];

    _chess.add(_board);
    _scene.add(_chess);
};

ChessAppearance.setBoard = function (theme) {
    theme = theme || _generalParams.boardTheme;

    _board.remove(boardSurfaces[currentBoardTheme]);
    _board.add(boardSurfaces[theme]);

    currentBoardTheme = theme;
};

ChessAppearance.setBase = function (theme) {
    theme = theme || _generalParams.baseTheme;

    _board.remove(boardBases[currentBaseTheme]);
    _board.add(boardBases[theme]);

    currentBaseTheme = theme;
};

ChessAppearance.setBackground = function (background) {
    background = background || _generalParams.background;

    $('canvas').css('background-image', 'url(' + ChessAppearance.backgrounds[background] + ')');
};

function createBoard(image, color) {
    var materials = [];
    var boardMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(image),
        specular: '#FFFFFF',
        color: '#FFFFFF',
        emissive: '#000000',
        shininess: 100
    });
    for (var i = 0; i < 6; i++) {
        materials.push(i === 2 ? boardMaterial : new THREE.MeshBasicMaterial({ color: color }));
    }
    var boardSurface = new THREE.Mesh(new THREE.CubeGeometry(16, 0.1, 16), new THREE.MeshFaceMaterial(materials));

    boardSurface.position.set(7, 0.15, -7);

    return boardSurface;
}

function createBoardBase(image, color) {
    var materials = [];
    var baseTexture = THREE.ImageUtils.loadTexture(image);
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
            materials.push(new THREE.MeshBasicMaterial({ color: color }));
        }
    }
    var boardBase = new THREE.Mesh(new THREE.CubeGeometry(20, 0.3, 20), new THREE.MeshFaceMaterial(materials));

    boardBase.position.set(7, 0, -7);

    return boardBase;
}


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