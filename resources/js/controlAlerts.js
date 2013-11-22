
(function () {

var Alert = {};

Alert.init = function () {
    $.noty.defaults.layout = 'topCenter';
    $.noty.defaults.timeout = 5000;
    Alert.resizeLoader();
    Alert.done();
};

Alert.alert       = function (message) { deafaultMessage(message, 'alert'      ); };
Alert.success     = function (message) { deafaultMessage(message, 'success'    ); };
Alert.error       = function (message) { deafaultMessage(message, 'error'      ); };
Alert.warn        = function (message) { deafaultMessage(message, 'warning'    ); };
Alert.info        = function (message) { deafaultMessage(message, 'information'); };

function deafaultMessage(message, type) {
    noty({
        text: message,
        type: type
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
        top: window.innerHeight - 169,
        left: window.innerWidth - 160
    });
};


// Make available globally
window.Alert = Alert;

})();