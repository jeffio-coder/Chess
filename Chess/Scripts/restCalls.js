var restCalls = {

    playerMoveNumber: 0,
    gameOver: false,
    currentPlayer: '',
    currentOpponent: '',
    
    setGameOver: function() {

        this.gameOver = true;
    },

    getSquaresModel: function () {
        return {
            '81': { 'color': 'white', 'pieceId': 'BQR' },
            '82': { 'color': 'black', 'pieceId': 'BQN' },
            '83': { 'color': 'white', 'pieceId': 'BQB' },
            '84': { 'color': 'black', 'pieceId': 'BQ' },
            '85': { 'color': 'white', 'pieceId': 'BK' },
            '86': { 'color': 'black', 'pieceId': 'BKB' },
            '87': { 'color': 'white', 'pieceId': 'BKN' },
            '88': { 'color': 'black', 'pieceId': 'BKR' },

            '71': { 'color': 'black', 'pieceId': 'BP1' },
            '72': { 'color': 'white', 'pieceId': 'BP2' },
            '73': { 'color': 'black', 'pieceId': 'BP3' },
            '74': { 'color': 'white', 'pieceId': 'BP4' },
            '75': { 'color': 'black', 'pieceId': 'BP5' },
            '76': { 'color': 'white', 'pieceId': 'BP6' },
            '77': { 'color': 'black', 'pieceId': 'BP7' },
            '78': { 'color': 'white', 'pieceId': 'BP8' },   

            '61': { 'color': 'white', 'pieceId': '' },
            '62': { 'color': 'black', 'pieceId': '' },
            '63': { 'color': 'white', 'pieceId': '' },
            '64': { 'color': 'black', 'pieceId': '' },
            '65': { 'color': 'white', 'pieceId': '' },
            '66': { 'color': 'black', 'pieceId': '' },
            '67': { 'color': 'white', 'pieceId': '' },
            '68': { 'color': 'black', 'pieceId': '' },

            '51': { 'color': 'black', 'pieceId': '' },
            '52': { 'color': 'white', 'pieceId': '' },
            '53': { 'color': 'black', 'pieceId': '' },
            '54': { 'color': 'white', 'pieceId': '' },
            '55': { 'color': 'black', 'pieceId': '' },
            '56': { 'color': 'white', 'pieceId': '' },
            '57': { 'color': 'black', 'pieceId': '' },
            '58': { 'color': 'white', 'pieceId': '' },

            '41': { 'color': 'white', 'pieceId': '' },
            '42': { 'color': 'black', 'pieceId': '' },
            '43': { 'color': 'white', 'pieceId': '' },
            '44': { 'color': 'black', 'pieceId': '' },
            '45': { 'color': 'white', 'pieceId': '' },
            '46': { 'color': 'black', 'pieceId': '' },
            '47': { 'color': 'white', 'pieceId': '' },
            '48': { 'color': 'black', 'pieceId': '' },

            '31': { 'color': 'black', 'pieceId': '' },
            '32': { 'color': 'white', 'pieceId': '' },
            '33': { 'color': 'black', 'pieceId': '' },
            '34': { 'color': 'white', 'pieceId': '' },
            '35': { 'color': 'black', 'pieceId': '' },
            '36': { 'color': 'white', 'pieceId': '' },
            '37': { 'color': 'black', 'pieceId': '' },
            '38': { 'color': 'white', 'pieceId': '' },

            '21': { 'color': 'white', 'pieceId': 'WP1' },
            '22': { 'color': 'black', 'pieceId': 'WP2' },
            '23': { 'color': 'white', 'pieceId': 'WP3' },
            '24': { 'color': 'black', 'pieceId': 'WP4' },
            '25': { 'color': 'white', 'pieceId': 'WP5' },
            '26': { 'color': 'black', 'pieceId': 'WP6' },
            '27': { 'color': 'white', 'pieceId': 'WP7' },
            '28': { 'color': 'black', 'pieceId': 'WP8' },

            '11': { 'color': 'black', 'pieceId': 'WQR' },
            '12': { 'color': 'white', 'pieceId': 'WQN' },
            '13': { 'color': 'black', 'pieceId': 'WQB' },
            '14': { 'color': 'white', 'pieceId': 'WQ' },
            '15': { 'color': 'black', 'pieceId': 'WK' },
            '16': { 'color': 'white', 'pieceId': 'WKB' },
            '17': { 'color': 'black', 'pieceId': 'WKN' },
            '18': { 'color': 'white', 'pieceId': 'WKR' }
        };
    },

    getPiecesModel: function () {
        return {
            'WQR': { 'type': 'R', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WQN': { 'type': 'N', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WQB': { 'type': 'B', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WQ': { 'type': 'Q', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WK': { 'type': 'K', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WKB': { 'type': 'B', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WKN': { 'type': 'N', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WKR': { 'type': 'R', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP1': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP2': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP3': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP4': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP5': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP6': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP7': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP8': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },

            'BQR': { 'type': 'R', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BQN': { 'type': 'N', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BQB': { 'type': 'B', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BQ': { 'type': 'Q', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BK': { 'type': 'K', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BKB': { 'type': 'B', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BKN': { 'type': 'N', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BKR': { 'type': 'R', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BP1': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BP2': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BP3': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },    
            'BP4': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },  
            'BP5': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BP6': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BP7': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BP8': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false }
        };
    }
}