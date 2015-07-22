var pieceModel = function () {

    var pieces =
    {
        'pieceId':
        {
            'type': '',
            'color': '',
            'hasMoved': false,
            'captured': false,
            'enPassantEligible': false
        }
    };

    return {
        king: 'K',
        queen: 'Q',
        rook: 'R',
        knight: 'N',
        bishop: 'B',
        pawn: 'P',

        getModel: function () { JSON.parse(JSON.stringify(pieces)); },
        setModel: function (jsonObject) { pieces = JSON.parse(JSON.stringify(jsonObject)) },

        getType: function (pieceId) { return pieces[pieceId].type; },
        setType: function (pieceId, value) { pieces[pieceId].type = value; },

        getColor: function (pieceId) { return pieces[pieceId].color; },

        getHasMoved: function (pieceId) { return pieces[pieceId].hasMoved; },
        setHasMoved: function (pieceId, value) { pieces[pieceId].hasMoved = value; },

        getCaptured: function (pieceId) { return pieces[pieceId].captured; },
        setCaptured: function (pieceId, value) { pieces[pieceId].captured = value; },

        getEnPassantEligible: function (pieceId) { return pieces[pieceId].enPassantEligible; },
        setEnPassantEligible: function (pieceId, value) { pieces[pieceId].enPassantEligible = value; },

        setEnPassantIneligibleForPlayer: function() {
            
            for (var loopIndex = 0; loopIndex < Object.keys(pieces).length; loopIndex++) {

                if (pieces[Object.keys(pieces)[loopIndex]].color === restCalls.currentPlayer && pieces[Object.keys(pieces)[loopIndex]].type === 'P')
                    pieces[Object.keys(pieces)[loopIndex]].enPassantEligible = false;
            }
        }
    };
}