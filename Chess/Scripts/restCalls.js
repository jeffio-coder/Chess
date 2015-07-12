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
            'WQR': { 'pieceType': 'R', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WQN': { 'pieceType': 'N', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WQB': { 'pieceType': 'B', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WQ': { 'pieceType': 'Q', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WK': { 'pieceType': 'K', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WKB': { 'pieceType': 'B', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WKN': { 'pieceType': 'N', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WKR': { 'pieceType': 'R', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP1': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP2': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP3': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP4': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP5': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP6': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP7': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WP8': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },

            'BQR': { 'pieceType': 'R', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BQN': { 'pieceType': 'N', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BQB': { 'pieceType': 'B', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BQ': { 'pieceType': 'Q', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BK': { 'pieceType': 'K', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BKB': { 'pieceType': 'B', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BKN': { 'pieceType': 'N', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BKR': { 'pieceType': 'R', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BP1': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BP2': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BP3': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },    
            'BP4': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },  
            'BP5': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BP6': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BP7': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'BP8': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false }
        };
    }
}