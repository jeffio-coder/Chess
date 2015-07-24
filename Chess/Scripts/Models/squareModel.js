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

    // For the sake of speed, there is no argument checking done.
    // The functions below assume that if arguments.length === 1, a valid squareId is passed. 
    // Otherwise, a valid rank and file have been passed.
    // Since this isn't publc code or non-deterministic code, that should be a safe assumtion.

    return {
        statusOpen: 'open',
        statusPlayerOccupied: 'occupiedByPlayer',
        statusOpponentOccupied: 'occupiedByOpponent',

        squareIdExists: function() {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];
            return squaresAndPieces.squares[squareId];
        },

        getModel: function() {
            return squaresAndPieces;
        },

        getModelCopy: function() {

            return JSON.parse(JSON.stringify(squaresAndPieces));
        },

        setModel: function(value) {
            squaresAndPieces = value;
        },

        getColor: function() {
            return arguments.length > 1 ?
                squaresAndPieces.squares[arguments[0].toString() + arguments[1].toString()].color : squaresAndPieces.squares[arguments[0]].color;
        },

        getPieceId: function() {
            return arguments.length > 1 ?
                squaresAndPieces.squares[arguments[0].toString() + arguments[1].toString()].pieceId : squaresAndPieces.squares[arguments[0]].pieceId;
        },

        setPieceId: function(value) {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

            if (value === '' || value === 'K' || value === 'Q' || value === 'R' || value === 'N' || value === 'B' || value === 'P')
                squaresAndPieces.squares[squareId].pieceId = value;
        },

        getPieceType: function() {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

            if (squaresAndPieces.squares[squareId].pieceId === '') return '';

            return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].type;
        },

        setPieceType: function(value) {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

            if (squaresAndPieces.squares[squareId].pieceId !== '')
                squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].type = value;
        },

        getPieceColor: function() {
            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

            if (squaresAndPieces.squares[squareId].pieceId === '') return '';

            return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].color;
        },

        getPieceHasMoved: function() {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

            if (squaresAndPieces.squares[squareId].pieceId === '') return '';

            return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].hasMoved;
        },

        setPieceHasMoved: function(value) {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

            if (squaresAndPieces.squares[squareId].pieceId !== '')
                squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].hasMoved = value;
        },

        getPieceCaptured: function() {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

            if (squaresAndPieces.squares[squareId].pieceId === '') return '';

            return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].captured;
        },

        setPieceCaptured: function(value) {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

            if (squaresAndPieces.squares[squareId].pieceId !== '')
                squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].captured = value;
        },

        getPieceEnPassantEligible: function() {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

            if (squaresAndPieces.squares[squareId].pieceId === '') return '';

            return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].enPassantEligible;
        },

        setPieceEnPassantEligible: function(value) {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

            if (squaresAndPieces.squares[squareId].pieceId !== '')
                squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].enPassantEligible = value;
        },

        squareStatus: function() {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

            return squaresAndPieces.squares[squareId].pieceId === '' ? statusOpen :
                getPieceColor(squareId) === restCalls.currentPlayer ? statusPlayerOccupied : statusOpponentOccupied;
        },

        squarePieceIsOppenentQueenOrRook: function(squareId) {

            return (getPieceColor(squareId) === restCalls.currentOpponent) &&
            (getPieceType(squareId) === 'Q' || getPieceType(squareId) === 'R');
        },

        squarePieceIsOppenentQueenOrBishop: function(squareId) {

            return (getPieceColor(squareId) === restCalls.currentOpponent) &&
            (getPieceType(squareId) === 'Q' || getPieceType(squareId) === 'B');
        },

        setEnPassantIneligibleForPlayer: function() {

            var key = '';
            for (var loopIndex = 0; loopIndex < Object.keys(squaresAndPieces.pieces).length; loopIndex++) {

                key = Object.keys(squaresAndPieces.pieces)[loopIndex];

                if (squaresAndPieces.pieces[key].color === restCalls.currentPlayer && squaresAndPieces.pieces[key].type === 'P')
                    squaresAndPieces.pieces[key].enPassantEligible = false;
            }
        },

        getCapturedPieces: function() {

            var key = '';
            var returnPieces = {};

            for (var loopIndex = 0; loopIndex < Object.keys(squaresAndPieces.pieces).length; loopIndex++) {

                key = Object.keys(squaresAndPieces.pieces)[loopIndex];

                if (squaresAndPieces.pieces[key].captured)
                    returnPieces[key] = JSON.parse(JSON.stringify(squaresAndPieces.pieces[key]));
            }

            return returnPieces;
        },

        changeSquareModelToOtherPlayer: function() {

            var newSquares = {};

            for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {

                for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                    newSquares[(9 - rankIndex).toString() + (9 - fileIndex).toString()] =
                    { color: squareModel.getColor(rankIndex, fileIndex), pieceId: squareModel.getPieceId(rankIndex, fileIndex) };
                }
            }

            squaresAndPieces.squares = newSquares;
        }
    };
}
