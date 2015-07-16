// ToDo
//
// hide possibleMoves.
// Make models private??
// Move timer
// debug check
// check Bootstrap alert
// End game
// Promote; change piece ID's?
// Tooltip for moving into check / Bootstrap alert 
// Error Handling
// convert to rest calls
// Unit tests; QUnit, Jasmine
//
// Use IIFE for globals
//
// Refactor/Document

$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });

    board.actionInitialize();
});

var board = {

    mouseUpDivId: '',

    actionInitialize: function () {

        squareModel.setModel({});
        pieceModel.setModel({});

        common.stopWatch.start();
        possibleMoves.loadSquareMoves();
        common.stopWatch.stop();
        $('#timer').text(common.stopWatch.elapsedTime().toString());

        //////////////////////// replace
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
            board.actionMouseUp(event, this);
        });
    },

    actionMouseUp: function (event, div) {

        if (event.which !== 1 || restCalls.gameOver)
            return;

        if (this.mouseUpDivId === '' && (
            !squareModel.exists(div.id) || squareModel.getPieceId(div.id) === '' || pieceModel.getColorFromSquare(div.id) !== restCalls.currentPlayer)
            )
            return;


        if (this.mouseUpDivId === '') {
            this.mouseUpDivId = div.id;
        } else {
            if (this.mouseUpDivId !== div.id) {

                view.clearSquaresMarkedForMove();

                if (possibleMoves.inMoves(div.id)) {
                    
                    this.movePieceToNewSquare(this.mouseUpDivId, div.id);
                    this.changeCurrentPlayer();
                }
                
                possibleMoves.setMoves({});
                this.mouseUpDivId = '';
            }
            board.actionDragEnd(div.id);
        }
    },
     
    actionMouseDown: function (event, div) {

        if (event.which !== 1 || restCalls.gameOver)
            return;

        if (this.mouseUpDivId !== '' || !squareModel.exists(div.id) || squareModel.getPieceId(div.id) === '' || pieceModel.getColorFromSquare(div.id) !== restCalls.currentPlayer)
            return;

        view.squareMovingSetClass(div.id);
        possibleMoves.squareId = div.id;
        possibleMoves.loadPossibleMoves();

        switch (pieceModel.getPieceTypeFromSquare(div.id)) {

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

        this.removeMovesThatWouldResultInCheck();
        view.showPossibleMoves();
    },
   
    actionDragEnd: function (targetId) {
       
        view.clearSquaresMarkedForMove();

        if (targetId && (possibleMoves.inMoves(targetId))) {

            this.movePieceToNewSquare(possibleMoves.squareId, targetId);
            this.changeCurrentPlayer();
        }

        possibleMoves.setMoves({});
        this.mouseUpDivId = '';
    },
    
    movePieceToNewSquare: function (sourceId, targetId) {

        this.capturePieceIfApplicable(sourceId, targetId);

        if (possibleMoves.getValue(targetId) === globals.specialMoves.none || possibleMoves.getValue(targetId) === globals.specialMoves.enPassant) {
            
            squareModel.setPieceId(targetId, squareModel.getPieceId(sourceId));
            squareModel.setPieceId(sourceId, '');

            pieceModel.setHasMoved(squareModel.getPieceId(targetId), true);

            pieceModel.setEnPassantEligible(squareModel.getPieceId(targetId),
                pieceModel.getPieceTypeFromSquare(targetId) === pieceModel.pawn && common.getRank(targetId) - common.getRank(sourceId) === 2);
        }
    },

    capturePieceIfApplicable: function (sourceId, targetId) {

        if (possibleMoves.getValue(targetId) === globals.specialMoves.none) {

            if (squareModel.getPieceId(targetId) !== '')
                pieceModel.setCaptured(squareModel.getPieceId(targetId), true);

            return;
        }

        if (possibleMoves.getValue(targetId) === globals.specialMoves.enPassant) {

            var squareBehindId = (common.getRank(targetId) - 1).toString() + common.getFile(targetId).toString();
            pieceModel.setCaptured(squareModel.getPieceId(squareBehindId), true);
            squareModel.setPieceId(squareBehindId, '');
            return;
        }

        if (possibleMoves.getValue(targetId) === globals.specialMoves.castleKing) {
            
            this.castleKing(targetId);
            return;
        }

        if (possibleMoves.getValue(targetId) === globals.specialMoves.castleQueen)
            this.castleQueen(targetId);
    },

    castleKing: function (targetId) {

        if (targetId === '17') {  // White king

            squareModel.setPieceId('17', 'WK');
            squareModel.setPieceId('16', 'WKR');
            squareModel.setPieceId('15', '');
            squareModel.setPieceId('18', '');
            pieceModel.setHasMoved('WK', true);
            pieceModel.setHasMoved('WKR', true);
        }

        if (targetId === '12') {  // Black king

            squareModel.setPieceId('12', 'BK');
            squareModel.setPieceId('13', 'BKR');
            squareModel.setPieceId('14', '');
            squareModel.setPieceId('11', '');
            pieceModel.setHasMoved('BK', true);
            pieceModel.setHasMoved('BKR', true);
        }
    },

    castleQueen: function (targetId) {

        if (targetId === '13') {  // White king

            squareModel.setPieceId('13', 'WK');
            squareModel.setPieceId('14', 'WQR');
            squareModel.setPieceId('15', '');
            squareModel.setPieceId('11', '');
            pieceModel.setHasMoved('WK', true);
            pieceModel.setHasMoved('WQR', true);
        }

        if (targetId === '16') {  // Black king

            squareModel.setPieceId('16', 'BK');
            squareModel.setPieceId('15', 'BQR');
            squareModel.setPieceId('14', '');
            squareModel.setPieceId('18', '');
            pieceModel.setHasMoved('BK', true);
            pieceModel.setHasMoved('BQR', true);
        }
    },

    removeMovesThatWouldResultInCheck: function () {

        var currentSquareModel = squareModel.getModel();
        var currentPieceModel = pieceModel.getModel();

        var movesToRemove = [];
        var loopIndex = 0;

        for (loopIndex = 0; loopIndex < possibleMoves.getKeys().length; loopIndex++) {

            this.movePieceToNewSquare(possibleMoves.squareId, possibleMoves.getValue(loopIndex));

            if (possibleMoves.checkForPlayerInCheck())
                movesToRemove.push(possibleMoves.getValue(loopIndex));

            squareModel.setModel(currentSquareModel);
            pieceModel.setModel(currentPieceModel);
        }

        for (loopIndex = 0; loopIndex < movesToRemove.length; loopIndex++) {

            possibleMoves.deleteElement(movesToRemove[loopIndex]);
        }
    },

    changeCurrentPlayer: function () {
        
        restCalls.playerMoveNumber++;
        restCalls.currentPlayer = (restCalls.playerMoveNumber % 2) === 0 ? globals.colors.white : globals.colors.black;
        restCalls.currentOpponent = (restCalls.playerMoveNumber % 2) === 0 ? globals.colors.black : globals.colors.white;

        this.changeSquareModelToOtherPlayer();

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

        pieceModel.setEnPassantIneligibleForAll();
    },
     
    checkForCheckMate: function () {

        var currentSquareModel = squareModel.getModel();
        var currentPieceModel = pieceModel.getModel();
        var squareId = '';

        for (var outerLoopIndex = 0; outerLoopIndex < Object.keys(squareModel.squares).length; outerLoopIndex++) {

            squareId = Object.keys(squareModel.squares)[outerLoopIndex];

            if (squareModel.getPieceId(squareId) !== '' && pieceModel.getColorFromSquare(squareId) === restCalls.currentPlayer) {
                
                possibleMoves.squareId = squareId;
                possibleMoves.loadPossibleMoves();

                for (var innerLoopIndex = 0; innerLoopIndex < possibleMoves.getKeys().length; innerLoopIndex++) {

                    this.movePieceToNewSquare(squareId, possibleMoves.getValue(innerLoopIndex));

                    if (!possibleMoves.checkForPlayerInCheck()) {
                        
                        squareModel.setModel(currentSquareModel);
                        pieceModel.setModel(currentPieceModel);
                        pieceModel.squareId = '';
                        return false;
                    }
                    squareModel.setModel(currentSquareModel);
                    pieceModel.setModel(currentPieceModel);
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
                    { color: squareModel.getColor(rankIndex, fileIndex), pieceId: squareModel.getPieceId(rankIndex, fileIndex) };
            }
        }

        squareModel.squares = newSquaresModel;
    }
}