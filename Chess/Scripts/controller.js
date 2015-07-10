// ToDo
//
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
        possibleMovesModel.loadSquareMoves();


        squareModel.squares = restCalls.getSquaresModel();
        pieceModel.pieces = restCalls.getPiecesModel();

        view.setUpBoardSize();
        view.paintBoardFromModel();

        $('.gameSquare').mousedown(function (event) {
            board.actionMouseDown(event, this);
        });

        // This will only fire if there is no drag event.
        $('.gameSquare').mouseup(function(event) {
            board.actionDragEnd();
        });
    },
     
    actionMouseDown: function (event, div) {

        if (event.which !== 1)
            return;

        if (!squareModel.exists(div.id) || squareModel.pieceId(div.id).piece === '' || squareModel.pieceColor(div.id) !== common.currentPlayer())
            return;

        possibleMovesModel.squareId = div.id;
        view.squareMovingSetClass(div.id);
        possibleMovesModel.moves = {};

        switch (squareModel.pieceType(div.id)) {

            case pieceModel.king:
                possibleMovesModel.possibleMovesForKing();
                break;
            case pieceModel.queen:
                possibleMovesModel.possibleMovesForQueen();
                break;
            case pieceModel.rook:
                possibleMovesModel.possibleMovesForRook();
                break;
            case pieceModel.knight:
                possibleMovesModel.possibleMovesForKnight();
                break;
            case pieceModel.bishop:
                possibleMovesModel.possibleMovesForBishop();
                break;
            case pieceModel.pawn:
                possibleMovesModel.possibleMovesForPawn();
                break;
        }

        // ToDo Remove squares in check.

        view.showPossibleMoves();
    },
   
    actionDragEnd: function (targetId) {

        view.clearSquaresMarkedForMove();
        
        if (targetId && squareModel.exists(targetId)) {

            utils.movePieceToNewSquare(possibleMovesModel.squareId, targetId);

            // Incrementing common.playerMoveNumber switches current player.
            common.playerMoveNumber++;

            utils.reverseSquaresModel();
            view.paintBoardFromModel();

            possibleMovesModel.checkForCheck(false) ? view.showCheckWarning() : view.hideCheckWarning();

            // Clear en passant pieces for the current player.
            Object.keys(pieceModel.pieces).forEach(function (key) {

                if (pieceModel.pieces[key].color === common.currentPlayer())
                    pieceModel.pieces[key].enPassantEligible = false;
            });
        }
    }
}

var utils = {
    
    movePieceToNewSquare: function (sourceId, targetId) {

        this.capturePieceIfApplicable(sourceId, targetId);

        squareModel.squares[targetId].pieceId = squareModel.squares[sourceId].pieceId;
        squareModel.squares[sourceId].pieceId = '';

        squareModel.pieceOnSquare(targetId).hasMoved = true;

        // enPassantEligible is set in the possibleMovesModel.moves object when calculating possible moves. It only applies to pawns moving two squares on their first move.
        squareModel.pieceOnSquare(targetId).enPassantEligible = possibleMovesModel.moves[targetId].willBeEnPassantEligible;
    },

    capturePieceIfApplicable: function (targetId) {

        if (squareModel.pieceId(targetId) !== '') {
            squareModel.pieceOnSquare(targetId).captured = true;
            return;
        }

        if (possibleMovesModel.moves[targetId].enPassantEligible) {
            
            // Get the squareId of the square behind the target square.
            var squareBehindId = (this.getRankAndFileFileFromId(targetId).rank - 1).toString() + this.getRankAndFileFileFromId(targetId).file.toString();

            squareModel.pieceOnSquare(squareBehindId).captured = true;
            squareModel.squares[squareBehindId].pieceId = '';
        }
    },

    reverseSquaresModel: function () {

        var newSquaresModel = {};

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {

            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                newSquaresModel[(9 - rankIndex).toString() + (9 - fileIndex).toString()] =
                    { color: squareModel.color(rank, file), piece: squareModel.pieceId(rank, file) };
            }
        }

        squareModel.squares = newSquaresModel;
    },

    getRankAndFileFileFromId: function (id) {
        return { 'rank': parseInt(id.substring(0, 1)), 'file': parseInt(id.substring(1, 2)) };
    }
}