
(function () {

var Utils = {};

Utils.createPointLight = function (x, y, z, color) {
	var pointLight = new THREE.PointLight(color || 0xFFFFFF);
    pointLight.position.set(x, y, z);
    return pointLight;
};

Utils.createDirectionalLight = function (x, y, z, color) {
	var directionalLight = new THREE.DirectionalLight(color || 0xFFFFFF);
    directionalLight.position.set(x, y, z).normalize();
    return directionalLight;
};

Utils.createSpotLight = function (x, y, z, target, color) {
	var spotLight = new THREE.SpotLight(color || 0xFFFFFF);
    spotLight.position.set(x, y, z);
    spotLight.target = target;
    return spotLight;
};

Utils.bidirectional = function (obj) {
    for (var key in obj) {
        obj[obj[key]] = key;
    }
    
    return obj;
};

Utils.toRads = function (degrees) {
	return degrees * Math.PI / 180;
};

Utils.xyz = function (x, y, z) {
    y = y === undefined ? x : y;
    z = z === undefined ? x : z;

    return { x: x, y: y, z: z };
};

Utils.vec3 = function (x, y, z) {
    y = y === undefined ? x : y;
    z = z === undefined ? x : z;
    
    return new THREE.Vector3(x, y, z);
};

Utils.vec3ToXyz = function (vec3) {
    return { x: vec3.x, y: vec3.y, z: vec3.z };
};

Utils.cellToXyz = function (rank, file) {
    // Given single parameter defining a cell (e.g. 'A2')
    if (file === undefined) {
        file = rank[0];
        rank = rank[1];
    }

    return {
        x: Chess.FILES[file] * Chess.PIECE_X_FACTOR,
        y: Chess.PIECE_Y,
        z: Chess.RANKS[rank] * Chess.PIECE_Z_FACTOR
    };
};

Utils.cellToVec3 = function (rank, file) {
    // Given single parameter defining a cell (e.g. 'A2')
    if (file === undefined) {
        file = rank[0];
        rank = rank[1];
    }

    return new THREE.Vector3(Chess.FILES[file] * Chess.PIECE_X_FACTOR,
                             Chess.PIECE_Y,
                             Chess.RANKS[rank] * Chess.PIECE_Z_FACTOR);
};

// Make available globally
window.Utils = Utils;

})();