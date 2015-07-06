// ToDo
//
// castle
// check for check
//
// filters
//
// Promote
// 
// Unit tests; QUnit, Jasmine
// Error Handling
// Refactor/Document

var model = {
    squaresModel: {},
    piecesModel: {},
    possibleMovesModel: {},
    mouseDownModel: {}
}

$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });

    board.initialize();
});

var board = {

    initialize: function() {

        var maxDimension = window.innerHeight < window.innerWidth ? innerHeight : innerWidth;

        // Make the maxDimension two thirds of the page.
        maxDimension = Math.floor(maxDimension * (2 / 3));

        // Make the maxDimension divisible by 8.
        maxDimension += 8 - (maxDimension % 8);

        common.squareDimension = maxDimension / 8;

        $('#mainBoard').width(maxDimension);
        $('#mainBoard').height(maxDimension);

        var captureSize = (common.squareDimension / 2).toString();

        $('[id^=captureRow]').attr('style', 'height: ' + captureSize + 'px; ');
        $('[id^=capturePiece]').attr('style', 'float: left; height: ' + captureSize + 'px; width: ' + captureSize + 'px; ');


        model.squaresModel = utils.getSquaresModel();
        model.piecesModel = utils.getPiecesModel();

        view.actionPaintBoardFromModel();

        $('.gameSquare').mousedown(function (event) {
            board.handleMouseDown(event, this);
        });

        // This will only fire if there is no drag event.
        $('.gameSquare').mouseup(function(event) {
            board.handlePostDrag();
        });
    },
     
    handleMouseDown: function (event, div) {

        if (event.which === 1) {

            model.mouseDownModel.squareAllProperties = common.getAllSquareProperties(utils.getRankAndFileFileFromId(div.id).rank, utils.getRankAndFileFileFromId(div.id).file);

            $('#' + div.id).addClass('squareMoving');

            if (model.mouseDownModel.squareAllProperties.pieceColor === common.colorCurrentlyPlaying() &&
                model.mouseDownModel.squareAllProperties.pieceId !== '') {
                
                switch (model.mouseDownModel.squareAllProperties.pieceType) {
                    case 'R':
                        possibleMoves.possibleMovesForRook();
                        break;
                    case 'N':
                        possibleMoves.possibleMovesForKnight();
                        break;
                    case 'B':
                        possibleMoves.possibleMovesForBishop();
                        break;
                    case 'Q':
                        possibleMoves.possibleMovesForQueen();
                        break;
                    case 'K':
                        possibleMoves.possibleMovesForKing();
                        break;
                    case 'P':
                        possibleMoves.possibleMovesForPawn();
                        break;
                }

                view.actionShowPossibleMoves();
            }
        }
    },
   
    handlePostDrag: function (id) {

        view.actionClearSquaresMarkedForMove();
        
        if (id && (id in model.possibleMovesModel)) {  

            utils.movePieceToNewSquare(model.mouseDownModel.squareAllProperties.squareId, id);
            common.playerMoveNumber++;
            utils.reverseSquaresModelForPlayerColor();
            view.actionPaintBoardFromModel();

            // Clear en passant pieces for the current color.
            Object.keys(model.piecesModel).forEach(function (key) {

                if (model.piecesModel[key].color === common.colorCurrentlyPlaying())
                    model.piecesModel[key].enPassantEligible = false;
            });
        }

        model.possibleMovesModel = {};
    }
}

var utils = {
    
    movePieceToNewSquare: function (sourceId, targetId) {

        var sourceSquare = model.squaresModel[sourceId];
        var sourcePiece = model.piecesModel[sourceSquare.piece];
        var targetSquare = model.squaresModel[targetId];

        this.capturePieceIfApplicable(targetSquare, targetId);

        targetSquare.piece = sourceSquare.piece;
        sourceSquare.piece = '';

        sourcePiece.hasMoved = true;

        // enPassantEligible is set when calculating possible moves. It only applies to pawns moving two squares on their first move.
        sourcePiece.enPassantEligible = model.possibleMovesModel[targetId].willBeEnPassantEligible;
    },

    capturePieceIfApplicable: function (targetSquare, targetId) {

        if (targetSquare.piece !== '') {
            model.piecesModel[targetSquare.piece].captured = true;
            return;
        }

        if (model.possibleMovesModel[targetId].enPassantEligible) {
            
            // Get the square behind the target square.
            var squareBehindId = (this.getRankAndFileFileFromId(targetId).rank - 1).toString() + this.getRankAndFileFileFromId(targetId).file.toString();

            var behindTargetSquare = model.squaresModel[squareBehindId];
            model.piecesModel[behindTargetSquare.piece].captured = true;
            behindTargetSquare.piece = '';
        }
    },

    getSquaresModel: function () {
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
            '44': { 'color': 'black', 'piece': '' },
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
            '14': { 'color': 'white', 'piece': 'WQ1' },
            '15': { 'color': 'black', 'piece': 'WK' },
            '16': { 'color': 'white', 'piece': 'WKB' },
            '17': { 'color': 'black', 'piece': 'WKN' },
            '18': { 'color': 'white', 'piece': 'WKR' }
        };
    },

    getPiecesModel: function () {
        return {
            'WQR': { 'pieceType': 'R', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WQN': { 'pieceType': 'N', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WQB': { 'pieceType': 'B', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
            'WQ1': { 'pieceType': 'Q', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
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
            'BQ1': { 'pieceType': 'Q', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
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
    },

    reverseSquaresModelForPlayerColor: function () {

        var id = '';
        var reverseRank = 0;
        var reverseFile = 0;
        var reverseId = '';
        var newSquaresModel = {};

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {

            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                id = rankIndex.toString() + fileIndex.toString();
                reverseRank = 9 - rankIndex;
                reverseFile = 9 - fileIndex;
                reverseId = reverseRank.toString() + reverseFile.toString();

                newSquaresModel[reverseId] = { color: model.squaresModel[id].color, piece: model.squaresModel[id].piece };
            }
        }

        model.squaresModel = newSquaresModel;
    },

    getRankAndFileFileFromId: function (id) {
        return { 'rank': parseInt(id.substring(0, 1)), 'file': parseInt(id.substring(1, 2)) };
    }
}