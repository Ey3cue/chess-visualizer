
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
    return spotLight
};


// Make available globally
window.Utils = Utils;

})();