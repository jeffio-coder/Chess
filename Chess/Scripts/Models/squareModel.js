var squareModel = function() {

    var squares =
    {
        'squareId':
        {
            'color': '',
            'pieceId': ''
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
       
        exists: function () {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];
            return squares[squareId];
        },

        getModel: function () {
            return JSON.parse(JSON.stringify(squares));
        },

        setModel: function (value) {
            squares = JSON.parse(JSON.stringify(value));
        },

        getColor: function () {
            return arguments.length > 1 ? squares[arguments[0].toString() + arguments[1].toString()].color : squares[arguments[0]].color;
        },

        getPieceType: function () {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];
            if (squares[squareId].pieceId === '') return '';
            return pieceModel.getType(squares[squareId].pieceId);
        },

        setPieceType: function (value) {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];
            if (squares[squareId].pieceId !== '')
                pieceModel.setType(squares[squareId].pieceId, value);
        },

        getPieceColor: function () {
            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];
            if (squares[squareId].pieceId === '') return '';
            return pieceModel.getColor(squares[squareId].pieceId);
        },

        getPieceHasMoved: function () {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];
            if (squares[squareId].pieceId === '') return '';
            return pieceModel.getHasMoved(squares[squareId].pieceId);
        },

        setPieceHasMoved: function (value) {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];
            if (squares[squareId].pieceId !== '')
                pieceModel.setHasMoved(squares[squareId].pieceId, value);
        },

        getPieceCaptured: function () {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];
            if (squares[squareId].pieceId === '') return '';
            return pieceModel.getCaptured(squares[squareId].pieceId);
        },

        setPieceCaptured: function(value) {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];
            if (squares[squareId].pieceId !== '')
                pieceModel.setCaptured(squares[squareId].pieceId, value);
        },

        getPieceEnPassantEligible: function () {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];
            if (squares[squareId].pieceId === '') return '';
            return pieceModel.getEnPassantEligible(squares[squareId].pieceId);
        },

        setPieceEnPassantEligible: function(value) {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];
            if (squares[squareId].pieceId !== '')
                pieceModel.setEnPassantEligible(squares[squareId].pieceId, value);
        },

        squareStatus: function () {

            var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

            return squares[squareId].pieceId === '' ? statusOpen :
                getPieceColor(squareId) === restCalls.currentPlayer ? statusPlayerOccupied : statusOpponentOccupied;
        },

        squarePieceIsOppenentQueenOrRook: function (squareId) {

            return (getPieceColor(squareId) === restCalls.currentOpponent) &&
                (getPieceType(squareId) === pieceModel.queen || getPieceType(squareId) === pieceModel.rook);
        },

        squarePieceIsOppenentQueenOrBishop: function (squareId) {

            return (getPieceColor(squareId) === restCalls.currentOpponent) &&
                (getPieceType(squareId) === pieceModel.queen || getPieceType(squareId) === pieceModel.bishop);
        }

    };
}
