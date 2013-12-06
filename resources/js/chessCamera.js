(function () {

var Camera = {};

var WHITE_POSITION = Utils.xyz(0, 280, 316);
var WHITE_ROTATION = Utils.xyz(-0.728105271191492, 0, 0);

var BLACK_POSITION = Utils.xyz(WHITE_POSITION.x, WHITE_POSITION.y, -WHITE_POSITION.z);
var BLACK_ROTATION = Utils.xyz(-2.4021128856088727, 0, Math.PI);

var TOPDOWN_POSITION = Utils.xyz(0, 424.3293551733956, 0);
var TOPDOWN_ROTATION = Utils.xyz(-1.5707953267953991, 0, 0);

var NUETRAL_POSITION = Utils.xyz(324.74082412419443, 273.127806730089, 0);
var NUETRAL_ROTATION = Utils.xyz(-1.5707963267948997, 0.8787185009667825, 1.5707963267949008);

var cameraTweens;

Camera.init = function () {
	_camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    _camera.position.set(WHITE_POSITION.x, WHITE_POSITION.y, WHITE_POSITION.z);
    _camera.lookAt(_scene.position);

    new THREE.OrbitControls(_camera, $('#chessVisualizer')[0]);

    cameraTweens = new TweenQueue();
};

Camera.viewWhite = function () {
	view(WHITE_POSITION, WHITE_ROTATION);
};

Camera.viewBlack = function () {
	view(BLACK_POSITION, BLACK_ROTATION);
};

Camera.viewTopDown = function () {
	view(TOPDOWN_POSITION, TOPDOWN_ROTATION);
};

Camera.viewNuetral = function () {
	view(NUETRAL_POSITION, NUETRAL_ROTATION);
};

function view(position, rotation) {
	cameraTweens.addTween({
		model: _camera,
		position: position,
		rotation: rotation
	});
	cameraTweens.startTweens();
}

// Make available globally
window.Camera = Camera;

})();