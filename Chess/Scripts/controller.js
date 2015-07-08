// ToDo
//
// check for check calls; set rankFile
// castle
// checkmate
// Promote; change piece ID's?
//
// filters
//
// 
// Error Handling
// Refactor/Document
// Unit tests; QUnit, Jasmine
// Blog

$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });

    board.initialize();
});

var board = {

    initialize: function () {

        squareModel.squares = {};
        pieceModel.pieces = {};
        model.possibleMovesModel = {};

        view.setUpBoardSize();

        model.squaresModel = restCalls.getSquaresModel();
        model.piecesModel = restCalls.getPiecesModel();

        view.paintBoardFromModel();

        $('.gameSquare').mousedown(function (event) {
            board.handleMouseDown(event, this);
        });

        // This will only fire if there is no drag event.
        $('.gameSquare').mouseup(function(event) {
            board.handlePostDrag();
        });
    },
     
    //////////////////////////////////////////////////// Refactor: too long.
    handleMouseDown: function (event, div) {

        if (event.which !== 1)
            return;

        if (!model.squaresModel[div.id] || model.squaresModel[div.id].piece === '')
            return;

        possibleMoves.squareAllProperties = possibleMoves.getAllSquareProperties(utils.getRankAndFileFileFromId(div.id).rank, utils.getRankAndFileFileFromId(div.id).file);

        possibleMoves.squareId = div.id;
        var movingPiece = model.piecesModel[model.squaresModel[div.id].piece];

        view.squareMovingSetClass(div.id);

        if (movingPiece && movingPiece.color === common.colorCurrentlyPlaying()) {
                
            switch (movingPiece.pieceType) {
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

            // ToDo Remove squares in check.

            view.showPossibleMoves();
        }
    },
   
    handlePostDrag: function (id) {

        view.clearSquaresMarkedForMove();
        
        if (id && (id in model.possibleMovesModel)) {  

            utils.movePieceToNewSquare(possibleMoves.squareId, id);

            common.playerMoveNumber++;
            utils.reverseSquaresModelForPlayerColor();
            view.paintBoardFromModel();

            possibleMoves.checkForCheck(false) ? view.showCheckWarning() : view.hideCheckWarning();

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

    reverseSquaresModelForPlayerColor: function () {

        var id = '';
        var reverseRank = 0;
        var reverseFile = 0;
        var reverseId = '';
        var newSquaresModel = {};

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {

            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                id = common.idFromRankFile(rankIndex.toString(), fileIndex.toString());
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