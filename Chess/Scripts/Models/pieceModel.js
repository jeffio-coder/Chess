var pieceModel = {
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

    // For the sake of speed, there is no argument checking done.
    // The functions below assume that if arguments.length === 1, a valid squareId is passed. 
    // Otherwise, a valid rank and file have been passed.
    // Since this isn't publc code or non-deterministic code, that should be a safe assumtion.

    getColor: function(pieceId) {

        return this.pieces[pieceId].color;
    },

    getColorFromSquare: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        if (squareModel.getPieceId(squareId) === '')
            return '';

        return this.pieces[squareModel.getPieceId(squareId)].color;
    },

    getPieceType: function(pieceId) {

        return this.pieces[pieceId].pieceType;
    },

    getPieceTypeFromSquare: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        if (squareModel.getPieceId(squareId) === '')
            return '';

        return this.pieces[squareModel.getPieceId(squareId)].pieceType;
    },

    getHasMoved: function(pieceId) {

        return this.pieces[pieceId].hasMoved;
    },

    getHasMovedFromSquare: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        if (squareModel.getPieceId(squareId) === '')
            return '';

        return this.pieces[squareModel.getPieceId(squareId)].hasMoved;
    },

    getCaptured: function(pieceId) {

        return this.pieces[pieceId].captured;
    },

    getCapturedFromSquare: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        if (squareModel.getPieceId(squareId) === '')
            return '';

        return this.pieces[squareModel.getPieceId(squareId)].captured;
    },

    getEnPassantEligible: function(pieceId) {

        return this.pieces[pieceId].enPassantEligible;
    },

    getEnPassantEligibleSquare: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        if (squareModel.getPieceId(squareId) === '')
            return '';

        return this.pieces[squareModel.getPieceId(squareId)].enPassantEligible;
    },

    getModel: function() {
        return JSON.parse(JSON.stringify(this.pieces));
    },

    getKeys: function() {

        return Object.keys(this.pieces);
    },

    setPieceType: function(pieceId, value) {

        this.pieces[pieceId].pieceType = value;
    },

    setHasMoved: function(pieceId, value) {

        this.pieces[pieceId].hasMoved = value;
    },

    setCaptured: function(pieceId, value) {

        this.pieces[pieceId].captured = value;
    },

    setEnPassantEligible: function(pieceId, value) {

        this.pieces[pieceId].enPassantEligible = value;
    },

    setModel: function(value) {
        this.pieces = JSON.parse(JSON.stringify(value));
    },

    setEnPassantIneligibleForAll: function () {

        for (var loopIndex = 0; loopIndex < this.getKeys().length; loopIndex++) {

            if (this.getColor(this.getKeys()[loopIndex]) === restCalls.currentPlayer)
                this.setEnPassantEligible(this.getKeys()[loopIndex], true);
        }
    }
}