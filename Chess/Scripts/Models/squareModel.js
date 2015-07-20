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

    pieces:
    {
        'pieceId':
        {
            'pieceType': '',
            'color': '',
            'hasMoved': false,
            'captured': false,
            'enPassantEligible': false
        }
    },

    king: 'K',
    queen: 'Q',
    rook: 'R',
    knight: 'N',
    bishop: 'B',
    pawn: 'P',
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

    getSquareColor: function () {

        return arguments.length > 1 ? this.squares[arguments[0].toString() + arguments[1].toString()].color : this.squares[arguments[0]].color;
    },

    getModel: function () {
        return JSON.parse(JSON.stringify(this.squares));
    },

    setModel: function (value) {
        this.squares = JSON.parse(JSON.stringify(value));
    },

    getKeys: function () {

        return Object.keys(this.squares);
    },

    // replace
    //getPieceId: function () {

    //    return arguments.length > 1 ? this.squares[arguments[0].toString() + arguments[1].toString()].pieceId : this.squares[arguments[0]].pieceId;
    //}

        // replace
    //setPieceId: function (squareId, value) {

    //    this.squares[squareId].pieceId = value;
    //},

    getPieceColor: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        if (this.squares[squareId].piece === {})
            return '';

        return this.squares[squareId].piece.color;
    },

    getPieceType: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        if (this.squares[squareId].piece === {})
            return '';

        return this.squares[squareId].piece.pieceType;
    },

    getPieceHasMoved: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        if (this.squares[squareId].piece === {})
            return '';

        return this.squares[squareId].piece.hasMoved;
    },

    getCaptured: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        if (this.squares[squareId].piece === {})
            return '';

        return this.squares[squareId].piece.captured;
    },

    getEnPassantEligible: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        if (this.squares[squareId].piece === {})
            return '';

        return this.squares[squareId].piece.enPassantEligible;
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