
(function () {


/**
 * Creates a new ches board state.
 *
 * Random note:
 * If this were AI, I'd use an array of size 8, using bitmaps to represent each rank, but since we
 * don't need to create a large number of states, space isn't an issue and we can resort to the
 * standard 2D array of board[rank][file].
 */
function ChessState() {
	this.initState();
}

ChessState.prototype.initState = function () {
    /*
        Starting State:
           A  B  C  D  E  F  G  H
        8  bR bN bB bQ bK bB bN bR  8
        7  bP bP bP bP bP bP bP bP  7
        6  -- -- -- -- -- -- -- --  6
        5  -- -- -- -- -- -- -- --  5
        4  -- -- -- -- -- -- -- --  4
        3  -- -- -- -- -- -- -- --  3
        2  wP wP wP wP wP wP wP wP  2
        1  wR wN bB wQ wK wB wN wR  1
           A  B  C  D  E  F  G  H

        Using objects here adds a good amount of overhead to each state, but since this isn't AI,
        space and time are not an issue, and this makes the code a lot more legible as ranks and 
        files correspond directly to their counterparts on the board.

        If this were an AI, I'd represent the state with bitmaps, shown in the state I worked on
        here: https://github.com/mew2057/Shallow-Red/blob/master/scripts/chessNode.js
    */

    var P = PIECES;

    this.board = {
       8: { A: P.bR, B: P.bN, C: P.bB, D: P.bK, E: P.bQ, F: P.bB, G: P.bN, H: P.bR },
       7: { A: P.bP, B: P.bP, C: P.bP, D: P.bP, E: P.bP, F: P.bP, G: P.bP, H: P.bP },
       6: { A:    0, B:    0, C:    0, D:    0, E:    0, F:    0, G:    0, H:    0 },
       5: { A:    0, B:    0, C:    0, D:    0, E:    0, F:    0, G:    0, H:    0 },
       4: { A:    0, B:    0, C:    0, D:    0, E:    0, F:    0, G:    0, H:    0 },
       3: { A:    0, B:    0, C:    0, D:    0, E:    0, F:    0, G:    0, H:    0 },
       2: { A: P.wP, B: P.wP, C: P.wP, D: P.wP, E: P.wP, F: P.wP, G: P.wP, H: P.wP },
       1: { A: P.wR, B: P.wN, C: P.wB, D: P.wK, E: P.wQ, F: P.wB, G: P.wN, H: P.wR }
    };
};

ChessState.prototype.move = function (move) {
    // Move string: <Piece><src_file><src_rank><dest_file><dest_rank>
    var sourceFile = move[1], sourceRank = parseInt(move[2]);
    var destFile = move[3], destRank = parseInt(move[4]);
    var piece = this.board[sourceRank][sourceFile];

    // TODO Check for castling, and en passant

    this.board[destRank][destFile] = piece;
};

var PIECES = ChessState.PIECES = {
    // Empty space
    na: 0,
    // General
    P: 1,
    R: 2,
    N: 3,
    Q: 4,
    K: 5,
    B: 6,
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
};

// Make available globally
window.ChessState = ChessState;

})();