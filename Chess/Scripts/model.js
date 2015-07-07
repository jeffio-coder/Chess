var model = {

    squaresModel: {
        'key':
            {
                'color': '',
                'piece': ''
            }
    },

    piecesModel: {
        'key':
        {
            'pieceType': '',
            'color': '',
            'hasMoved': false,
            'captured': false,
            'enPassantEligible': false
        }
    },

    possibleMovesModel: {
        'key':
        {
            enPassantEligible: enPassantEligible ? true : false,
            willBeEnPassantEligible: willBeEnPassantEligible ? true : false
        }
    },

    mouseDownModel: {}
}
