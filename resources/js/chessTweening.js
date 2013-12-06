
(function () {

var tweenQueues = [];

function TweenQueue() {
    this.tweenOptionsListQueue = [];
    this.currentTweenOptionsList = null;

    this.tweenOptionsSetupList = [];

    tweenQueues.push(this);
}

TweenQueue.prototype.addTween = function (options) {
    this.tweenOptionsSetupList.push(options);
};

TweenQueue.prototype.startTweens = function () {
    this.tweenOptionsListQueue.push(this.tweenOptionsSetupList);
    this.tweenOptionsSetupList = [];
};

TweenQueue.prototype.stopTweens = function () {
    this.tweenOptionsListQueue = [];
    this.tweenOptionsSetupList = [];
};

function startTweenSet(self, options) {
    var model      = options.model,
        startPos   = Utils.vec3ToXyz(options.model.position),
        startRot   = Utils.vec3ToXyz(options.model.rotation),
        startScale = Utils.vec3ToXyz(options.model.scale),
        endPos     = options.position || { x: options.model.position.x, y: options.model.position.y, z: options.model.position.z },
        endRot     = options.rotation || { x: options.model.rotation.x, y: options.model.rotation.y, z: options.model.rotation.z },
        endScale   = options.scale    || { x: options.model.scale.x,    y: options.model.scale.y,    z: options.model.scale.z    },
        callback   = options.callback || function () {},
        delay      = _gameParams.waitBetweenMoves * 1000;
     
    new TWEEN.Tween(startPos)
                .to(endPos, Chess.MOVE_DURATION)
                .easing(Chess.DEFAULT_EASING)
                .delay(delay)
                .onUpdate(function () { model.position.set(startPos.x, startPos.y, startPos.z); })
                .start();
    new TWEEN.Tween(startRot)
                .to(endRot, Chess.MOVE_DURATION)
                .easing(Chess.DEFAULT_EASING)
                .delay(delay)
                .onUpdate(function () { model.rotation.set(startRot.x, startRot.y, startRot.z); })
                .start();
    new TWEEN.Tween(startScale)
                .to(endScale, Chess.MOVE_DURATION)
                .easing(Chess.DEFAULT_EASING)
                .delay(delay)
                .onUpdate(function () { model.scale.set(Math.max(startScale.x, 0.01), Math.max(startScale.y, 0.01), Math.max(startScale.z, 0.01)); })
                .onComplete(function () {
                    self.currentTweenOptionsList = null;
                    callback();
                })
                .start();
}

TweenQueue.prototype.updateTweens = function () {
    if (!this.currentTweenOptionsList && this.tweenOptionsListQueue.length) {
        this.currentTweenOptionsList = this.tweenOptionsListQueue.shift();

        // Putting this in a setTimeout seemes to prevent a heizenbug in which sometimes more than
        //   one piece will animate at once. Whenever I try to add debugging statements to attempt
        //   to fix it, it disappears...
        var self = this;
        setTimeout(function () {
            for (var i = self.currentTweenOptionsList.length - 1; i >= 0; i--) {
                startTweenSet(self, self.currentTweenOptionsList[i]);
            }
        }, 0);
    }
};

TweenQueue.updateTweens = function () {
    for (var i = tweenQueues.length - 1; i >= 0; i--) {
        tweenQueues[i].updateTweens();
    }
};

// Make available globally
window.TweenQueue = TweenQueue;

})();