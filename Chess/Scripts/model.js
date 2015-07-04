﻿var model = {
    squaresModel: {},
    piecesModel: {},
    possibleMovesModel: {},
    mouseDown: {},

    getSquaresModel: function() {
        return {
            '81': { 'color': 'white', 'piece': 'BQR' },
            '82': { 'color': 'black', 'piece': 'BQN' },
            '83': { 'color': 'white', 'piece': 'BQB' },
            '84': { 'color': 'black', 'piece': 'BQ1' },
            '85': { 'color': 'white', 'piece': 'BK' },
            '86': { 'color': 'black', 'piece': 'BKB' },
            '87': { 'color': 'white', 'piece': 'BKN' },
            '88': { 'color': 'black', 'piece': 'BKR' },

            '71': { 'color': 'black', 'piece': 'BP1' },
            '72': { 'color': 'white', 'piece': 'BP2' },
            '73': { 'color': 'black', 'piece': 'BP3' },
            '74': { 'color': 'white', 'piece': 'BP4' },
            '75': { 'color': 'black', 'piece': 'BP5' },
            '76': { 'color': 'white', 'piece': 'BP6' },
            '77': { 'color': 'black', 'piece': 'BP7' },
            '78': { 'color': 'white', 'piece': 'BP8' },

            '61': { 'color': 'white', 'piece': '' },
            '62': { 'color': 'black', 'piece': '' },
            '63': { 'color': 'white', 'piece': '' },
            '64': { 'color': 'black', 'piece': '' },
            '65': { 'color': 'white', 'piece': '' },
            '66': { 'color': 'black', 'piece': '' },
            '67': { 'color': 'white', 'piece': '' },
            '68': { 'color': 'black', 'piece': '' },

            '51': { 'color': 'black', 'piece': '' },
            '52': { 'color': 'white', 'piece': '' },
            '53': { 'color': 'black', 'piece': '' },
            '54': { 'color': 'white', 'piece': '' },
            '55': { 'color': 'black', 'piece': '' },
            '56': { 'color': 'white', 'piece': '' },
            '57': { 'color': 'black', 'piece': '' },
            '58': { 'color': 'white', 'piece': '' },

            '41': { 'color': 'white', 'piece': '' },
            '42': { 'color': 'black', 'piece': '' },
            '43': { 'color': 'white', 'piece': '' },
            '44': { 'color': 'black', 'piece': 'WQ1' },
            '45': { 'color': 'white', 'piece': '' },
            '46': { 'color': 'black', 'piece': '' },
            '47': { 'color': 'white', 'piece': '' },
            '48': { 'color': 'black', 'piece': '' },

            '31': { 'color': 'black', 'piece': '' },
            '32': { 'color': 'white', 'piece': '' },
            '33': { 'color': 'black', 'piece': '' },
            '34': { 'color': 'white', 'piece': '' },
            '35': { 'color': 'black', 'piece': '' },
            '36': { 'color': 'white', 'piece': '' },
            '37': { 'color': 'black', 'piece': '' },
            '38': { 'color': 'white', 'piece': '' },

            '21': { 'color': 'white', 'piece': 'WP1' },
            '22': { 'color': 'black', 'piece': 'WP2' },
            '23': { 'color': 'white', 'piece': 'WP3' },
            '24': { 'color': 'black', 'piece': 'WP4' },
            '25': { 'color': 'white', 'piece': 'WP5' },
            '26': { 'color': 'black', 'piece': 'WP6' },
            '27': { 'color': 'white', 'piece': 'WP7' },
            '28': { 'color': 'black', 'piece': 'WP8' },

            '11': { 'color': 'black', 'piece': 'WQR' },
            '12': { 'color': 'white', 'piece': 'WQN' },
            '13': { 'color': 'black', 'piece': 'WQB' },
            '14': { 'color': 'white', 'piece': '' },
            '15': { 'color': 'black', 'piece': 'WK' },
            '16': { 'color': 'white', 'piece': 'WKB' },
            '17': { 'color': 'black', 'piece': 'WKN' },
            '18': { 'color': 'white', 'piece': 'WKR' }
        };
    },

    getPiecesModel: function () {
        return {
            'WQR': { 'pieceType': 'R', 'color': 'white', 'hasMoved': false },
            'WQN': { 'pieceType': 'N', 'color': 'white', 'hasMoved': false },
            'WQB': { 'pieceType': 'B', 'color': 'white', 'hasMoved': false },
            'WQ1': { 'pieceType': 'Q', 'color': 'white', 'hasMoved': false },
            'WK': { 'pieceType': 'K', 'color': 'white', 'hasMoved': false },
            'WKB': { 'pieceType': 'B', 'color': 'white', 'hasMoved': false },
            'WKN': { 'pieceType': 'N', 'color': 'white', 'hasMoved': false },
            'WKR': { 'pieceType': 'R', 'color': 'white', 'hasMoved': false },
            'WP1': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP2': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP3': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP4': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP5': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP6': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP7': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP8': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },

            'BQR': { 'pieceType': 'R', 'color': 'black', 'hasMoved': false },
            'BQN': { 'pieceType': 'N', 'color': 'black', 'hasMoved': false },
            'BQB': { 'pieceType': 'B', 'color': 'black', 'hasMoved': false },
            'BQ1': { 'pieceType': 'Q', 'color': 'black', 'hasMoved': false },
            'BK': { 'pieceType': 'K', 'color': 'black', 'hasMoved': false },
            'BKB': { 'pieceType': 'B', 'color': 'black', 'hasMoved': false },
            'BKN': { 'pieceType': 'N', 'color': 'black', 'hasMoved': false },
            'BKR': { 'pieceType': 'R', 'color': 'black', 'hasMoved': false },
            'BP1': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP2': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP3': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP4': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP5': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP6': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP7': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP8': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false }
        };

    },

    addToPossibleMoves: function(rank, file) {
        model.possibleMovesModel[rank.toString() + file.toString()] = '';
    }
}
