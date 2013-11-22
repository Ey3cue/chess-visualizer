
(function () {

var tweensListQueue = [];
var currentTweenList = null;

var tweenSetupList = [];

Chess.addTween = function (options) {
    addTween(
        options.model,
        Utils.vec3ToXyz(options.model.position),
        Utils.vec3ToXyz(options.model.rotation),
        Utils.vec3ToXyz(options.model.scale),
        options.position || { x: options.model.position.x, y: options.model.position.y, z: options.model.position.z },
        options.rotation || { x: options.model.rotation.x, y: options.model.rotation.y, z: options.model.rotation.z },
        options.scale    || { x: options.model.scale.x,    y: options.model.scale.y,    z: options.model.scale.z    },
        options.callback || function () {}
    );
};

Chess.startTweens = function () {
    tweensListQueue.push(tweenSetupList);
    tweenSetupList = [];
};

function addTween(model, startPos, startRot, startScale, endPos, endRot, endScale, callback) {
    tweenSetupList.push(
        new TWEEN.Tween(startPos)
                .to(endPos, Chess.MOVE_DURATION)
                .easing(Chess.DEFAULT_EASING)
                .onUpdate(function () { model.position.set(startPos.x, startPos.y, startPos.z); }),
        new TWEEN.Tween(startRot)
                .to(endRot, Chess.MOVE_DURATION)
                .easing(Chess.DEFAULT_EASING)
                .onUpdate(function () { model.rotation.set(startRot.x, startRot.y, startRot.z); }),
        new TWEEN.Tween(startScale)
                .to(endScale, Chess.MOVE_DURATION)
                .easing(Chess.DEFAULT_EASING)
                .onUpdate(function () { model.scale.set(startScale.x, startScale.y, startScale.z); })
            .onComplete(function () {
                currentTweenList = null;
                callback();
            })
    );
}

Chess.updateTweens = function () {
    if (!currentTweenList && tweensListQueue.length) {
        currentTweenList = tweensListQueue.shift();

        for (var i = currentTweenList.length - 1; i >= 0; i--) {
            currentTweenList[i].start();
        }
    }
};

})();