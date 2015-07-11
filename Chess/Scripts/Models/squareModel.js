var squareModel = {
    squares:
    {
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

    exists: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        return this.squares[squareId];
    },

    color: function () {

        if (arguments.length > 1)
            return this.squares[arguments[0].toString() + arguments[1].toString()].color;
        else
            return this.squares[arguments[0]].color;

    },

    pieceId: function () {

        if (arguments.length > 1)
            return this.squares[arguments[0].toString() + arguments[1].toString()].pieceId;
        else
            return this.squares[arguments[0]].pieceId;
    },

    pieceType: function () {

        if (arguments.length > 1)
            return pieceModel.pieces[this.squares[arguments[0].toString() + arguments[1].toString()].pieceId].pieceType;
        else
            return pieceModel.pieces[this.squares[arguments[0]].pieceId].pieceType;
    },

    pieceColor: function () {

        if (arguments.length > 1)
            return pieceModel.pieces[this.squares[arguments[0].toString() + arguments[1].toString()].pieceId].color;
        else
            return pieceModel.pieces[this.squares[arguments[0]].pieceId].color;

    },

    pieceHasMoved: function () {

        if (arguments.length > 1)
            return pieceModel.pieces[this.squares[arguments[0].toString() + arguments[1].toString()].pieceId].hasMoved;
        else
            return pieceModel.pieces[this.squares[arguments[0]].pieceId].hasMoved;
    },

    pieceEnPassantEligible: function () {

        if (arguments.length > 1)
            return pieceModel.pieces[this.squares[arguments[0].toString() + arguments[1].toString()].pieceId].enPassantEligible;
        else
            return pieceModel.pieces[this.squares[arguments[0]].pieceId].enPassantEligible;
    },

    pieceOnSquare: function() {
        
        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        return this.pieceId(squareId) === '' ? false : pieceModel.pieces[this.pieceId(squareId)];
    },

    squareStatus: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        return this.pieceId(squareId) === '' ? this.statusOpen :
            this.pieceColor(squareId) === common.currentPlayer() ? this.statusPlayerOccupied : this.statusOpponentOccupied;
    },

    squareBehindEnPassantEligible: function (squareId) {

        var rank = parseInt(squareId.substring(0, 1));
        var file = parseInt(squareId.substring(1, 2));

        return this.pieceEnPassantEligible(rank - 1, file) && this.squareStatus(rank - 1, file) === this.statusOpponentOccupied;
    }
}