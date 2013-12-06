
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
	this.init();
}

/**
 * Initializes the state.
 */
ChessState.prototype.init = ChessState.prototype.reset = function () {
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
        space and time are not an issue when representing the state, and this makes the code a lot 
        more legible as ranks and files correspond directly to their counterparts on the board.

        If this were an AI, I'd represent the state with bitmaps, shown in the state I worked on
        here: https://github.com/mew2057/Shallow-Red/blob/master/scripts/chessNode.js
    */

    var P = Chess.PIECES;

    this.board = {
       8: { A: P.bR, B: P.bN, C: P.bB, D: P.bQ, E: P.bK, F: P.bB, G: P.bN, H: P.bR },
       7: { A: P.bP, B: P.bP, C: P.bP, D: P.bP, E: P.bP, F: P.bP, G: P.bP, H: P.bP },
       6: { A:    0, B:    0, C:    0, D:    0, E:    0, F:    0, G:    0, H:    0 },
       5: { A:    0, B:    0, C:    0, D:    0, E:    0, F:    0, G:    0, H:    0 },
       4: { A:    0, B:    0, C:    0, D:    0, E:    0, F:    0, G:    0, H:    0 },
       3: { A:    0, B:    0, C:    0, D:    0, E:    0, F:    0, G:    0, H:    0 },
       2: { A: P.wP, B: P.wP, C: P.wP, D: P.wP, E: P.wP, F: P.wP, G: P.wP, H: P.wP },
       1: { A: P.wR, B: P.wN, C: P.wB, D: P.wQ, E: P.wK, F: P.wB, G: P.wN, H: P.wR }
    };
};

ChessState.prototype.clone = function () {
    var state = new ChessState();
    for (var rank in state.board) {
        for (var file in state.board[rank]) {
            state.board[rank][file] = this.board[rank][file];
        }
    }
    return state;
};

ChessState.prototype.empty = function () {
    for (var rank in this.board) {
        for (var file in this.board[rank]) {
            this.board[rank][file] = 0;
        }
    }
};

ChessState.prototype.move = function (move) {
    move = move.toUpperCase();
    // Move string: <Piece><src_file><src_rank><dest_file><dest_rank>
    var sourcePiece = this.board[move[2]][move[1]];
    var destPiece = this.board[move[4]][move[3]];

    this.board[move[4]][move[3]] = sourcePiece;
    this.board[move[2]][move[1]] = 0;

    var sourceCell = move[1] + move[2];
    var destCell = move[3] + move[4];

    // Check for castling (i.e. if the king moves more than 1 file)
    if (isType('K', sourcePiece) && Math.abs(Chess.FILES[move[1]] - Chess.FILES[move[3]]) > 1) {
        switch (destCell) {
        // White king-side
        case 'G1': return new MoveDefinition.Castle('E1', 'G1', 'H1', 'F1');
        // White queen-side
        case 'C1': return new MoveDefinition.Castle('E1', 'C1', 'A1', 'D1');
        // Black king-side
        case 'G8': return new MoveDefinition.Castle('E8', 'G8', 'H8', 'F8');
        // Black queen-side
        case 'C8': return new MoveDefinition.Castle('E8', 'C8', 'A8', 'D8');
        }
    }

    // Check for promotions
    var promotion = move[5];
    if (promotion) {
        promotion = (isWhite(sourcePiece) ? 'w' : 'b') + promotion;
        this.board[move[4]][move[3]] = Chess.PIECES[promotion];
    }

    // Check for en passant - pawn changes files, but it's not a capture
    if (isType('P', sourcePiece) && !destPiece && Chess.FILES[move[1]] !== Chess.FILES[move[3]]) {
        return new MoveDefinition.EnPassant(sourceCell, destCell,
                move[3] + (parseInt(move[4]) + (isWhite(sourcePiece) ? -1 : 1)), promotion);
    }

    // Check for captures
    if (destPiece) {
        return new MoveDefinition.Capture(sourceCell, destCell, promotion);
    }
    
    return new MoveDefinition.Normal(sourceCell, destCell, promotion);
};

MoveDefinition = {};

MoveDefinition.Normal = function (start, end, promotion) {
    this.start = start;
    this.end = end;
    this.promotion = promotion;
};

MoveDefinition.Capture = function (start, end, promotion) {
    this.start = start;
    this.end = end;
    this.promotion = promotion;
};

MoveDefinition.EnPassant = function (start, end, remove, promotion) {
    this.start = start;
    this.end = end;
    this.remove = remove;
    this.promotion = promotion;
};

MoveDefinition.Castle = function (kingStart, kingEnd, rookStart, rookEnd) {
    this.kingStart = kingStart;
    this.kingEnd = kingEnd;
    this.rookStart = rookStart;
    this.rookEnd = rookEnd;
};

function isType(key, piece) {
    return (piece & 7) === Chess.PIECES['w' + key];
}

function isBlack(piece) {
    return piece & 8;
}

function isWhite(piece) {
    return !(piece & 8);
}

// Make available globally
window.ChessState = ChessState;
window.MoveDefinition = MoveDefinition;

})();