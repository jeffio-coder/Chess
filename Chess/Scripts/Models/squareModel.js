var squareModel = {
    squares: {
        'squareId':
        {
            'color': '',
            'pieceId': ''
        }
    },

    statusOpen: 'open',
    statusPlayerOccupied: 'occupiedByPlayer',
    statusOpponentOccupied: 'occupiedByOpponent',

    // For the sake of speed, there is no argument checking done.
    // The functions below assume that if arguments.length === 1, a valid squareId is passed. 
    // Otherwise, a valid rank and file have been passed.
    // Since this isn't publc code or non-deterministic code, that should be a safe assumtion.

    color: function () {

        return arguments.length > 1 ? this.sqaures[arguments[0].toString() + arguments[1].toString()].color : this.sqaures[arguments[0]].color;
    },

    pieceId: function () {

        return arguments.length > 1 ? this.sqaures[arguments[0].toString() + arguments[1].toString()].pieceId : this.sqaures[arguments[0]].pieceId;
    },

    pieceType: function () {

        return this.pieceId(arguments) === '' ? '' : piecesModel.pieces[this.pieceId(arguments)].pieceType;
    },

    pieceColor: function () {

        return this.pieceId(arguments) === '' ? '' : piecesModel.pieces[this.pieceId(arguments)].color;
    },

    pieceHasMoved: function () {

        return this.pieceId(arguments) === '' ? false : piecesModel.pieces[this.pieceId(arguments)].hasMoved;
    },

    pieceEnPassantEligible: function () {

        return this.pieceId(arguments) === '' ? false : piecesModel.pieces[this.pieceId(arguments)].enPassantEligible;
    },

    squareStatus: pieceId(arguments) === '' ? statusOpen :
            pieceColor(arguments) === common.currentPlayer ? statusPlayerOccupied : statusOpponentOccupied
}