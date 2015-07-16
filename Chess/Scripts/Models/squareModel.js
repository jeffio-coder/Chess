var squareModel =
    {
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

    getColor: function () {

        return arguments.length > 1 ? this.squares[arguments[0].toString() + arguments[1].toString()].color : this.squares[arguments[0]].color;
    },

    getPieceId: function () {

        return arguments.length > 1 ? this.squares[arguments[0].toString() + arguments[1].toString()].pieceId : this.squares[arguments[0]].pieceId;
    },

    getModel: function () {
        return JSON.parse(JSON.stringify(this.squares));
    },

    getKeys: function () {

        return Object.keys(this.squares);
    },

    setPieceId: function (squareId, value) {

        this.squares[squareId].pieceId = value;
    },

    setModel: function (value) {
        this.squares = JSON.parse(JSON.stringify(value));
    },

    squareStatus: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        return this.getPieceId(squareId) === '' ? this.statusOpen :
            pieceModel.getColorFromSquare(squareId) === restCalls.currentPlayer ? this.statusPlayerOccupied : this.statusOpponentOccupied;
    },

    squareBehindEnPassantEligible: function (squareId) {

        return pieceModel.getEnPassantEligibleSquare(common.getRank(squareId) - 1, common.getFile(squareId)) &&
            this.squareStatus(common.getRank(squareId) - 1, common.getFile(squareId)) === this.statusOpponentOccupied;
    },

    squarePieceIsOppenentQueenOrRook: function (squareId) {

        return (pieceModel.getColorFromSquare(squareId) === restCalls.currentOpponent) &&
            (pieceModel.getPieceType(this.getPieceId(squareId)) === pieceModel.queen || pieceModel.getPieceType(this.getPieceId(squareId)) === pieceModel.rook);
    },

    squarePieceIsOppenentQueenOrBishop: function (squareId) {

        return (pieceModel.getColorFromSquare(squareId) === restCalls.currentOpponent) &&
            (pieceModel.getPieceType(this.getPieceId(squareId)) === pieceModel.queen || pieceModel.getPieceType(this.getPieceId(squareId)) === pieceModel.bishop);
    }
}