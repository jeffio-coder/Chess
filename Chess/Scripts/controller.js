// ToDo
//
// remove utils
// debug check
// Click And Click Again
// check Bootstrap alert
// End game
// Promote; change piece ID's?
// Use IIFE for globals
// Use closures for privates
//
// Tooltip for moving into check / Bootstrap alert 
// background for possible moves
// 
// Error Handling
// Refactor/Document
// Unit tests; QUnit, Jasmine
// Blog

$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });

    board.actionInitialize();
});

var board = {

    actionInitialize: function () {

        squareModel.squares = {};
        pieceModel.pieces = {};
        possibleMoves.loadSquareMoves();

        restCalls.currentPlayer = globals.colors.white;
        restCalls.currentOpponent = globals.colors.black;

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
            //board.actionMouseUp(event, this);
        });
    },

    actionMouseUp: function (event, div) {

        if (event.which !== 1 || restCalls.gameOver)
            return;

        if (common.mouseDownDivId === '') {
            common.mouseDownDivId = div.id;
            actionMouseDown(event, div);
        } else {
            if (common.mouseDownDivId !== div.id)
            board.actionDragEnd(div.id);
        }
    },
     
    actionMouseDown: function (event, div) {

        if (event.which !== 1 || restCalls.gameOver)
            return;

        if (!squareModel.exists(div.id) || squareModel.pieceId(div.id) === '' || squareModel.pieceColor(div.id) !== restCalls.currentPlayer)
            return;

        view.squareMovingSetClass(div.id);
        possibleMoves.squareId = div.id;
        possibleMoves.loadPossibleMoves();

        switch (squareModel.pieceType(div.id)) {

            case pieceModel.king:
                possibleMoves.possibleMovesForKing();
                break;
            case pieceModel.queen:
                possibleMoves.possibleMovesForQueen();
                break;
            case pieceModel.rook:
                possibleMoves.possibleMovesForRook();
                break;
            case pieceModel.knight:
                possibleMoves.possibleMovesForKnight();
                break;
            case pieceModel.bishop:
                possibleMoves.possibleMovesForBishop();
                break;
            case pieceModel.pawn:
                possibleMoves.possibleMovesForPawn();
                break;
        }

        utils.removeMovesThatWouldResultInCheck();
        view.showPossibleMoves();
    },
   
    actionDragEnd: function (targetId) {

        view.clearSquaresMarkedForMove();
        
        if (targetId && (targetId in possibleMoves.moves)) {

            utils.movePieceToNewSquare(possibleMoves.squareId, targetId);
            utils.changeCurrentPlayer();
        }

        possibleMoves.moves = {};
    }
}

var utils = {
    
    movePieceToNewSquare: function (sourceId, targetId) {

        this.capturePieceIfApplicable(sourceId, targetId);

        if (possibleMoves.moves[targetId] === globals.specialMoves.none || possibleMoves.moves[targetId] === globals.specialMoves.enPassant) {
            
            squareModel.setSquarePieceId(targetId, squareModel.pieceId(sourceId));
            squareModel.setSquarePieceId(sourceId, '');

            squareModel.pieceOnSquare(targetId).hasMoved = true;

            squareModel.pieceOnSquare(targetId).enPassantEligible =
                squareModel.pieceType(targetId) === pieceModel.pawn &&
                common.getRank(targetId) - common.getRank(sourceId) === 2;
        }
    },

    capturePieceIfApplicable: function (sourceId, targetId) {

        if (possibleMoves.moves[targetId] === globals.specialMoves.none) {

            if (squareModel.pieceId(targetId) !== '')
                squareModel.pieceOnSquare(targetId).captured = true;
            return;
        }

        if (possibleMoves.moves[targetId] === globals.specialMoves.enPassant) {

            var squareBehindId = (common.getRank(targetId) - 1).toString() + common.getFile(targetId).toString();
            squareModel.pieceOnSquare(squareBehindId).captured = true;
            squareModel.setSquarePieceId(squareBehindId, '');
            return;
        }

        if (possibleMoves.moves[targetId] === globals.specialMoves.castleKing) {
            
            this.castleKing(targetId);
            return;
        }

        if (possibleMoves.moves[targetId] === globals.specialMoves.castleQueen)
            this.castleQueen(targetId);
    },

    castleKing: function (targetId) {

        if (targetId === '17') {  // White king

            squareModel.setSquarePieceId('17', 'WK');
            squareModel.setSquarePieceId('16', 'WKR');
            squareModel.setSquarePieceId('15', '');
            squareModel.setSquarePieceId('18', '');
            pieceModel.pieces['WK'].hasMoved = true;
            pieceModel.pieces['WKR'].hasMoved = true;
        }

        if (targetId === '12') {  // Black king

            squareModel.setSquarePieceId('12', 'BK');
            squareModel.setSquarePieceId('13', 'BKR');
            squareModel.setSquarePieceId('14', '');
            squareModel.setSquarePieceId('11', '');
            pieceModel.pieces['BK'].hasMoved = true;
            pieceModel.pieces['BKR'].hasMoved = true;
        }
    },

    castleQueen: function (targetId) {

        if (targetId === '13') {  // White king

            squareModel.setSquarePieceId('13', 'WK');
            squareModel.setSquarePieceId('14', 'WQR');
            squareModel.setSquarePieceId('15', '');
            squareModel.setSquarePieceId('11', '');
            pieceModel.pieces['WK'].hasMoved = true;
            pieceModel.pieces['WQR'].hasMoved = true;
        }

        if (targetId === '16') {  // Black king

            squareModel.setSquarePieceId('16', 'BK');
            squareModel.setSquarePieceId('15', 'BQR');
            squareModel.setSquarePieceId('14', '');
            squareModel.setSquarePieceId('18', '');
            pieceModel.pieces['BK'].hasMoved = true;
            pieceModel.pieces['BQR'].hasMoved = true;
        }
    },

    removeMovesThatWouldResultInCheck: function () {

        var currentSquareModel = JSON.stringify(squareModel.squares);
        var currentPieceModel = JSON.stringify(pieceModel.pieces);

        var movesToRemove = [];
        var loopIndex = 0;

        for (loopIndex = 0; loopIndex < Object.keys(possibleMoves.moves).length; loopIndex++) {

            this.movePieceToNewSquare(possibleMoves.squareId, Object.keys(possibleMoves.moves)[loopIndex]);

            if (possibleMoves.checkForPlayerInCheck())
                movesToRemove.push(Object.keys(possibleMoves.moves)[loopIndex]);

            squareModel.squares = JSON.parse(currentSquareModel);
            pieceModel.pieces = JSON.parse(currentPieceModel);
        }

        for (loopIndex = 0; loopIndex < movesToRemove.length; loopIndex++) {

            delete possibleMoves.moves[movesToRemove[loopIndex]];
        }
    },

    changeCurrentPlayer: function () {
        
        restCalls.playerMoveNumber++;
        restCalls.currentPlayer = (restCalls.playerMoveNumber % 2) === 0 ? globals.colors.white : globals.colors.black;
        restCalls.currentOpponent = (restCalls.playerMoveNumber % 2) === 0 ? globals.colors.black : globals.colors.white;

        utils.changeSquareModelToOtherPlayer();

        if (possibleMoves.checkForPlayerInCheck()) {

            if (this.checkForCheckMate()) {
                
                view.showCheckmate();
                view.paintBoardFromModel();
                return;
            } else {
                common.inCheck = true;
                view.showCheckWarning();
            }          
        } else {
            common.inCheck = false;
            view.hideCheckWarning();
        }

        view.paintBoardFromModel();

        // Clear en passant pieces for the current player.
        Object.keys(pieceModel.pieces).forEach(function (key) {

            if (pieceModel.pieces[key].color === restCalls.currentPlayer)
                pieceModel.pieces[key].enPassantEligible = false;
        });
    },
     
    checkForCheckMate: function () {

        var currentSquareModel = JSON.stringify(squareModel.squares);
        var currentPieceModel = JSON.stringify(pieceModel.pieces);
        var squareId = '';

        for (var outerLoopIndex = 0; outerLoopIndex < Object.keys(squareModel.squares).length; outerLoopIndex++) {

            squareId = Object.keys(squareModel.squares)[outerLoopIndex];

            if (squareModel.pieceId(squareId) !== '' && squareModel.pieceColor(squareId) === restCalls.currentPlayer) {
                
                possibleMoves.squareId = squareId;
                possibleMoves.loadPossibleMoves();

                for (var innerLoopIndex = 0; innerLoopIndex < Object.keys(possibleMoves.moves).length; innerLoopIndex++) {

                    this.movePieceToNewSquare(squareId, Object.keys(possibleMoves.moves)[innerLoopIndex]);

                    if (!possibleMoves.checkForPlayerInCheck()) {
                        
                        squareModel.squares = JSON.parse(currentSquareModel);
                        pieceModel.pieces = JSON.parse(currentPieceModel);
                        pieceModel.squareId = '';
                        return false;
                    }
                    squareModel.squares = JSON.parse(currentSquareModel);
                    pieceModel.pieces = JSON.parse(currentPieceModel);
                }
            }
        }

        pieceModel.squareId = '';
        return true;
    },

    changeSquareModelToOtherPlayer: function () {

        var newSquaresModel = {};

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {

            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                newSquaresModel[(9 - rankIndex).toString() + (9 - fileIndex).toString()] =
                    { color: squareModel.color(rankIndex, fileIndex), pieceId: squareModel.pieceId(rankIndex, fileIndex) };
            }
        }

        squareModel.squares = newSquaresModel;
    }
}