
(function () {

var tweensListQueue = [];
var currentTweenList = null;

Chess.addTween = function (model, position, rotation, scale) {
    startTween(model,
               Utils.vec3ToXyz(model.position),
               Utils.vec3ToXyz(model.rotation),
               Utils.vec3ToXyz(model.scale),
               position || { x: model.position.x, y: model.position.y, z: model.position.z },
               rotation || { x: model.rotation.x, y: model.rotation.y, z: model.rotation.z },
               scale    || { x: model.scale.x,    y: model.scale.y + 1,    z: model.scale.z });
};

function startTween(model, startPos, startRot, startScale, endPos, endRot, endScale) {
    tweensListQueue.push([
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
            .onComplete(function () { currentTweenList = null; })
    ]);
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