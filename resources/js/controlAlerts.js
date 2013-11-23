
(function () {

var Alert = {};

Alert.init = function () {
    $.noty.defaults.layout = 'topCenter';
    $.noty.defaults.timeout = 5000;
    Alert.resizeLoader();
    Alert.done();
};

Alert.alert       = function (message) { deafaultMessage(message, 'alert',        5000); };
Alert.success     = function (message) { deafaultMessage(message, 'success',      5000); };
Alert.error       = function (message) { deafaultMessage(message, 'error',       10000); };
Alert.warn        = function (message) { deafaultMessage(message, 'warning',     10000); };
Alert.info        = function (message) { deafaultMessage(message, 'information',  5000); };

function deafaultMessage(message, type, timeout) {
    noty({
        text: message,
        type: type || 'alert',
        timeout: timeout || 5000
    });
}

Alert.loading = function () {
	$('#loader').hide().show();
};

Alert.done = function () {
	$('#loader').hide();
};

Alert.resizeLoader = function () {
	$('#loader').css({
        top: window.innerHeight - $('#loader').height() - 50,
        left: window.innerWidth - $('#loader').width() - 70
    });
};


// Make available globally
window.Alert = Alert;

})();