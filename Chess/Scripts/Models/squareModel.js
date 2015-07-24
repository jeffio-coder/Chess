function SquareModel () {

    var squaresAndPieces =
    {
        squares: {
            'squareId':
            {
                'color': '',
                'pieceId': ''
            }
        },

        pieces: {
            'pieceId':
            {
                'type': '',
                'color': '',
                'hasMoved': false,
                'captured': false,
                'enPassantEligible': false
            }
        }
    };

    var statusOpen = 'open';
    var statusPlayerOccupied = 'occupiedByPlayer';
    var statusOpponentOccupied = 'occupiedByOpponent';


    var getModel = function() {
        return squaresAndPieces;
    };

    var setModel = function(value) {
        squaresAndPieces = value;
    };

    var getModelCopy = function () {
        return JSON.parse(JSON.stringify(squaresAndPieces));
    };

    var squareIdExists = function (squareId) {
        return squaresAndPieces.squares[squareId];
    };
    
    var getColor = function (squareId) {
        return squaresAndPieces.squares[squareId].color;
    };

    var getPieceId = function(squareId) {
        return squaresAndPieces.squares[squareId].pieceId;
    };

    var setPieceId = function (squareId, value) {
        squaresAndPieces.squares[squareId].pieceId = value;
    };

    var getPieceType = function (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === '') return '';
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].type;
    };

    var setPieceType = function (squareId, value) {
        if (squaresAndPieces.squares[squareId].pieceId !== '' &&
            (value === '' ||
            value === globals.pieces.king ||
            value === globals.pieces.queen ||
            value === globals.pieces.rook ||
            value === globals.pieces.knight ||
            value === globals.pieces.bishop ||
            value === globals.pieces.pawn)
            )
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].type = value;
    };

    var getPieceColor = function (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === '') return '';
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].color;
    };

    var getPieceHasMoved = function (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === '') return false;
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].hasMoved;
    };

    var setPieceHasMoved = function (squareId, value) {
        if (squaresAndPieces.squares[squareId].pieceId !== '')
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].hasMoved = value;
    };

    var getPieceCaptured = function (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === '') return '';
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].captured;
    };

    var setPieceCaptured = function (squareId, value) {
        if (squaresAndPieces.squares[squareId].pieceId !== '')
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].captured = value;
    };

    var getPieceEnPassantEligible = function (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === '') return '';
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].enPassantEligible;
    };

    var setPieceEnPassantEligible = function (squareId, value) {
        if (squaresAndPieces.squares[squareId].pieceId !== '')
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].enPassantEligible = value;
    };
    
    var squareStatus = function (squareId) {
        return squaresAndPieces.squares[squareId].pieceId === '' ? statusOpen :
            squaresAndPieces.squares[squareId].color === restCalls.currentPlayer ? statusPlayerOccupied : statusOpponentOccupied;
    };

    var squarePieceIsOppenentQueenOrRook = function (squareId) {
        return (squaresAndPieces.squares[squareId].pieceId === restCalls.currentOpponent) &&
                (squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].type === globals.pieces.queen ||
                squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].type === globals.pieces.rook);
    };

    var squarePieceIsOppenentQueenOrBishop = function (squareId) {
        return (getPieceColor(squareId) === restCalls.currentOpponent) &&
                (squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].type === globals.pieces.queen ||
                squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].type === globals.pieces.bishop);
    };

    var setEnPassantIneligibleForPlayer = function () {

        var key = '';
        for (var loopIndex = 0; loopIndex < Object.keys(squaresAndPieces.pieces).length; loopIndex++) {

            key = Object.keys(squaresAndPieces.pieces)[loopIndex];

            if (squaresAndPieces.pieces[key].color === restCalls.currentPlayer && squaresAndPieces.pieces[key].type === globals.pieces.pawn)
                squaresAndPieces.pieces[key].enPassantEligible = false;
        }
    };

    var getCapturedPieces = function () {

        var key = '';
        var returnPieces = {};

        for (var loopIndex = 0; loopIndex < Object.keys(squaresAndPieces.pieces).length; loopIndex++) {

            key = Object.keys(squaresAndPieces.pieces)[loopIndex];

            if (squaresAndPieces.pieces[key].captured)
                returnPieces[key] = JSON.parse(JSON.stringify(squaresAndPieces.pieces[key]));
        }

        return returnPieces;
    };

    var changeSquareModelToOtherPlayer = function () {

        var newSquares = {};

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {

            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                newSquares[(9 - rankIndex).toString() + (9 - fileIndex).toString()] =
                {
                    color: squaresAndPieces.squares[rankIndex.toString() + fileIndex.toString()].color,
                    pieceId: squaresAndPieces.squares[rankIndex.toString() + fileIndex.toString()].pieceId
                };
            }
        }

        squaresAndPieces.squares = newSquares;
    };

    var getKingRankFile = function (color) {

        var pieceId = color === globals.colors.white ? globals.pieceIds.whiteKing : globals.pieceIds.blackKing;

        for (var loopIndex = 0; loopIndex <= Object.keys(squaresAndPieces.squares).length; loopIndex++) {

            if (squaresAndPieces.squares[Object.keys(squaresAndPieces.squares)[loopIndex]].pieceId === pieceId) {

                return Object.keys(squaresAndPieces.squares)[loopIndex];
            }
        }
        return '';
    };

    return {
        statusOpen: statusOpen,
        statusPlayerOccupied: statusPlayerOccupied,
        statusOpponentOccupied: statusOpponentOccupied,

        model: function (value) { return arguments.length === 0 ? getModel() : setModel(value); },

        modelCopy: function () { return getModelCopy(); },

        squareExists: function (squareId) { return squareIdExists(squareId); },

        color: function (squareId) { return getColor(squareId); },

        pieceId: function (squareId, value) { return arguments.length === 1 ? getPieceId(squareId) : setPieceId(squareId, value); },

        pieceType: function (squareId, value) { return arguments.length === 1 ? getPieceType(squareId) : setPieceType(squareId, value); },

        pieceColor: function (squareId) { return getPieceColor(squareId); },

        pieceHasMoved: function (squareId, value) { return arguments.length === 1 ? getPieceHasMoved(squareId) : setPieceHasMoved(squareId, value); },

        pieceCaptured: function (squareId, value) { return arguments.length === 1 ? getPieceCaptured(squareId) : setPieceCaptured(squareId, value); },

        pieceEnPassantEligible: function (squareId, value) { return arguments.length === 1 ? getPieceEnPassantEligible(squareId) : setPieceEnPassantEligible(squareId, value); },

        squareStatus: function (squareId) { return squareStatus(squareId); },

        squarePieceIsOppenentQueenOrRook: function (squareId) { return squarePieceIsOppenentQueenOrRook(squareId); },

        squarePieceIsOppenentQueenOrBishop: function (squareId) { return squarePieceIsOppenentQueenOrBishop(squareId); },

        setEnPassantIneligibleForPlayer: function () { return setEnPassantIneligibleForPlayer(); },

        getCapturedPieces: function () { return getCapturedPieces(); },

        changeSquareModelToOtherPlayer: function () { return changeSquareModelToOtherPlayer(); },

        getKingRankFile: function (color) { return getKingRankFile(color); }
    };
}
