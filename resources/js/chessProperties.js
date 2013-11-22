
(function () {

// Rendering-specific

Chess.MOVE_DURATION = 500;
Chess.DEFAULT_EASING = TWEEN.Easing.Quadratic.InOut;

Chess.BOARD_SCALE_FACTOR = 20;

Chess.PIECE_X_FACTOR = 2;
Chess.PIECE_Z_FACTOR = -2;
Chess.PIECE_Y = 0.2;

Chess.PIECE_SCALE_FACTOR = {
	// White
    wP: 0.6,
    wR: 0.7,
    wN: 0.7,
    wQ: 0.7,
    wK: 0.7,
    wB: 0.65,
    // Black
    bP: 0.6,
    bR: 0.7,
    bN: 0.7,
    bQ: 0.7,
    bK: 0.7,
    bB: 0.65
};

Chess.PIECE_ROTATIONS = {
    // White
    wP: 0,
    wR: 0,
    wN: Utils.toRads(180),
    wQ: 0,
    wK: Utils.toRads(90),
    wB: Utils.toRads(90),
    // Black
    bP: 0,
    bR: 0,
    bN: 0,
    bQ: 0,
    bK: Utils.toRads(90),
    bB: Utils.toRads(-90)
};

// State-specific

Chess.PIECES = Utils.bidirectional({
    // Empty space
    na: 0,
    // White
    wP: 1,
    wR: 2,
    wN: 3,
    wQ: 4,
    wK: 5,
    wB: 6,
    // Black
    bP: 9,
    bR: 10,
    bN: 11,
    bQ: 12,
    bK: 13,
    bB: 14
});

Chess.FILES = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'H': 7
};

Chess.RANKS = {
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7
};

})();