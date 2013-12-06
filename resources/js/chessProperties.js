
(function () {

// Rendering-specific

Chess.MOVE_DURATION = 1000;
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

Chess.SAMPLE_GAME = [
    'Pe2e4', 'Pd7d6', 'Pd2d4', 'Ng8f6', 'Nb1c3', 'Pg7g6', 'Bc1e3', 'Bf8g7', 'Qd1d2', 'Pc7c6',
    'Pf2f3', 'Pb7b5', 'Ng1e2', 'Nb8d7', 'Be3h6', 'Bg7h6', 'Qd2h6', 'Bc8b7', 'Pa2a3', 'Pe7e5',
    'Ke1c1', 'Qd8e7', 'Kc1b1', 'Pa7a6', 'Ne2c1', 'Ke8c8', 'Nc1b3', 'Pe5d4', 'Rd1d4', 'Pc6c5',
    'Rd4d1', 'Nd7b6', 'Pg2g3', 'Kc8b8', 'Nb3a5', 'Bb7a8', 'Bf1h3', 'Pd6d5', 'Qh6f4', 'Kb8a7',
    'Rh1e1', 'Pd5d4', 'Nc3d5', 'Nb6d5', 'Pe4d5', 'Qe7d6', 'Rd1d4', 'Pc5d4', 'Re1e7', 'Ka7b6',
    'Qf4d4', 'Kb6a5', 'Pb2b4', 'Ka5a4', 'Qd4c3', 'Qd6d5', 'Re7a7', 'Ba8b7', 'Ra7b7', 'Qd5c4',
    'Qc3f6', 'Ka4a3', 'Qf6a6', 'Ka3b4', 'Pc2c3', 'Kb4c3', 'Qa6a1', 'Kc3d2', 'Qa1b2', 'Kd2d1',
    'Bh3f1', 'Rd8d2', 'Rb7d7', 'Rd2d7', 'Bf1c4', 'Pb5c4', 'Qb2h8', 'Rd7d3', 'Qh8a8', 'Pc4c3',
    'Qa8a4', 'Kd1e1', 'Pf3f4', 'Pf7f5', 'Kb1c1', 'Rd3d2', 'Qa4a7'
];

})();