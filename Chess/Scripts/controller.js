// ToDo
//
// Make possible moves model (include "in check moves")
// in check as possible move type
// convert timer to object
// hover messages
// check Bootstrap alert
// Promote; change piece ID's?
// Tooltip for moving into check / Bootstrap alert 
// convert to rest calls
// format timer
// move timer
// web workers on check for check/checkmate -- http://keithwhor.github.io/multithread.js/  http://codersblock.com/blog/multi-threaded-javascript-with-web-workers/
// End game
// Error Handling
// Unit tests; QUnit, Jasmine
//
// Document
/*

      <script src="scripts/jquery.easyModal.js" type="text/javascript"></script>

    <div id="popup-census-info" style="width: 800px; background-color:white;background-color: rgb(204, 204, 204);">

            $('#popup-census-info').easyModal();

            $('#btnPopupYes').click(function () {

                $('#popup-census-info').trigger('closeModal');

                // Saves the proposal
                $('#ctl00_ctl00_mainContentPlaceholder_stepContentPlaceholder_topSaveProposalButton').click();
            });


            $('#btnPopupNo').click(function () {

                $('#popup-census-info').trigger('closeModal');
            });


<!DOCTYPE html>
<html>
<body>

    <p>Creating and using an object method.</p>

    <p>
        An object method is stored as a function definition,
        in an object property.
    </p>

    <p id="demo"></p>

    <script>

        var controller = function () {

            var display = [];

            var setter  = function (value) {

                display.push(value);
            };

            var getter = function(index) {
                return display[index];
            }

            var priv = "Byte me";

            return {
                setter: function (value) { return setter(value); },
                getter: function (index) { return getter(index); }
            };
        }

        var yyy = controller();
        yyy.setter("fuck me");
        yyy.setter("fuck you");

        document.getElementById("demo").innerHTML = yyy.getter(0) + '; ' + yyy.getter(1);

    </script>
</body>
</html>

*/

$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });

    board.actionInitialize();
});

var board = {

    mouseUpDivId: '',

    actionInitialize: function () {

        common.squareModel = SquareModel();

        common.squareModel.model({});

        common.stopWatch.start();
        possibleMoves.loadSquareMoves();
        common.stopWatch.stop();
        $('#timer').text(common.stopWatch.elapsedTime().toString());

        restCalls.currentPlayer = globals.colors.white;
        restCalls.currentOpponent = globals.colors.black;

        common.squareModel.model(restCalls.getSquaresAndPieces());
        
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

        if (this.mouseUpDivId === '' && 
            (!common.squareModel.squareExists(div.id) ||
            common.squareModel.squareStatus(div.id) === common.squareModel.statusOpen ||
            common.squareModel.pieceColor(div.id) !== restCalls.currentPlayer)
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

        if (this.mouseUpDivId !== '' ||
            !common.squareModel.squareExists(div.id) ||
            common.squareModel.pieceId(div.id) === '' ||
            common.squareModel.pieceColor(div.id) !== restCalls.currentPlayer
        )
            return;

        view.squareMovingSetClass(div.id);
        possibleMoves.squareId = div.id;
        possibleMoves.loadPossibleMoves();

        switch (common.squareModel.pieceType(div.id)) {

            case globals.pieces.king:
                possibleMoves.possibleMovesForKing();
                break;
            case globals.pieces.queen:
                possibleMoves.possibleMovesForQueen();
                break;
            case globals.pieces.rook:
                possibleMoves.possibleMovesForRook();
                break;
            case globals.pieces.knight:
                possibleMoves.possibleMovesForKnight();
                break;
            case globals.pieces.bishop:
                possibleMoves.possibleMovesForBishop();
                break;
            case globals.pieces.pawn:
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
            
            common.squareModel.pieceId(targetId, common.squareModel.pieceId(sourceId));
            common.squareModel.pieceId(sourceId, globals.pieceIds.none);

            common.squareModel.pieceHasMoved(targetId, true);

            common.squareModel.pieceEnPassantEligible(targetId,
                common.squareModel.pieceType(targetId) === globals.pawn && common.getRank(targetId) - common.getRank(sourceId) === 2);
        }
    },

    capturePieceIfApplicable: function (sourceId, targetId) {

        if (possibleMoves.getValue(targetId) === globals.specialMoves.none) {

            if (common.squareModel.squareStatus(targetId) !== common.squareModel.statusOpen)
                common.squareModel.pieceCaptured(targetId, true);

            return;
        }

        if (possibleMoves.getValue(targetId) === globals.specialMoves.enPassant) {

            var squareBehindId = (common.getRank(targetId) - 1).toString() + common.getFile(targetId).toString();
            common.squareModel.pieceCaptured(targetId, squareBehindId);
            common.squareModel.pieceId(squareBehindId, globals.pieceIds.none);
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

        var whiteKingTargetId = '17';
        var whiteKingsRookTargetId = '16';
        var whiteKingSourceId = '15';
        var whiteKingsRookSourceId = '18';
        var blackKingTargetId = '12';
        var blackKingsRookTargetId = '13';
        var blackKingSourceId = '14';
        var blackKingsRookSourceId = '11';

        if (targetId === whiteKingTargetId) {   

            common.squareModel.pieceId(whiteKingTargetId, globals.pieceIds.whiteKing);
            common.squareModel.pieceId(whiteKingsRookTargetId, globals.pieceIds.whiteKingsRook);
            common.squareModel.pieceId(whiteKingSourceId, globals.pieceIds.none);
            common.squareModel.pieceId(whiteKingsRookSourceId, globals.pieceIds.none);
            common.squareModel.pieceHasMoved(globals.pieceIds.whiteKing, true);
            common.squareModel.pieceHasMoved(globals.pieceIds.whiteKingsRook, true);
        }

        if (targetId === blackKingTargetId) {  

            common.squareModel.pieceId(blackKingTargetId, globals.pieceIds.blackKing);
            common.squareModel.pieceId(blackKingsRookTargetId, globals.pieceIds.blackKingsRook);
            common.squareModel.pieceId(blackKingSourceId, globals.pieceIds.none);
            common.squareModel.pieceId(blackKingsRookSourceId, globals.pieceIds.none);
            common.squareModel.pieceHasMoved(globals.pieceIds.blackKing, true);
            common.squareModel.pieceHasMoved(globals.pieceIds.blackKingsRook, true);
        }
    },

    castleQueen: function (targetId) {

        var whiteKingTargetId = '13';
        var whiteQueensRookTargetId = '14';
        var whiteKingSourceId = '15';
        var whiteQueensRookSourceId = '11';
        var blackKingTargetId = '16';
        var blackQueensRookTargetId = '15';
        var blackKingSourceId = '14';
        var blackQueensRookSourceId = '18';

        if (targetId === whiteKingTargetId) {

            common.squareModel.pieceId(whiteKingTargetId, globals.pieceIds.whiteKing);
            common.squareModel.pieceId(whiteQueensRookTargetId, globals.pieceIds.whiteQueensRook);
            common.squareModel.pieceId(whiteKingSourceId, globals.pieceIds.none);
            common.squareModel.pieceId(whiteQueensRookSourceId, globals.pieceIds.none);
            common.squareModel.pieceHasMoved(globals.pieceIds.whiteKing, true);
            common.squareModel.pieceHasMoved(globals.pieceIds.whiteQueensRook, true);
        }

        if (targetId === blackKingTargetId) {

            common.squareModel.pieceId(blackKingTargetId, globals.pieceIds.blackKing);
            common.squareModel.pieceId(blackQueensRookTargetId, globals.pieceIds.blackQueensRook);
            common.squareModel.pieceId(blackKingSourceId, globals.pieceIds.none);
            common.squareModel.pieceId(blackQueensRookSourceId, globals.pieceIds.none);
            common.squareModel.pieceHasMoved(globals.pieceIds.blackKing, true);
            common.squareModel.pieceHasMoved(globals.pieceIds.blackQueensRook, true);
        }
    },

    removeMovesThatWouldResultInCheck: function () {

        var currentSquareModel = common.squareModel.modelCopy();

        // ToDo possible moves model
        var movesToRemove = [];
        var loopIndex = 0;

        for (loopIndex = 0; loopIndex < possibleMoves.getKeys().length; loopIndex++) {

            this.movePieceToNewSquare(possibleMoves.squareId, possibleMoves.getValue(loopIndex));

            if (possibleMoves.checkForPlayerInCheck())
                movesToRemove.push(possibleMoves.getValue(loopIndex));

            common.squareModel.model(currentSquareModel);
        }

        for (loopIndex = 0; loopIndex < movesToRemove.length; loopIndex++) {

            possibleMoves.deleteElement(movesToRemove[loopIndex]);
        }
    },

    changeCurrentPlayer: function () {
        
        restCalls.playerMoveNumber++;
        restCalls.currentPlayer = (restCalls.playerMoveNumber % 2) === 0 ? globals.colors.white : globals.colors.black;
        restCalls.currentOpponent = (restCalls.playerMoveNumber % 2) === 0 ? globals.colors.black : globals.colors.white;

        common.squareModel.changeSquareModelToOtherPlayer();

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

        common.squareModel.setEnPassantIneligibleForPlayer();
    },
     
    checkForCheckMate: function () {

        var currentSquareModel = common.squareModel.modelCopy();
        var squareId = '';

        for (var outerLoopIndex = 1; outerLoopIndex <=8; outerLoopIndex++) {

            for (var middleLoopIndex = 1; middleLoopIndex <= 8; middleLoopIndex++) {

                squareId = outerLoopIndex.toString() + middleLoopIndex.toString();

                if (common.squareModel.squareStatus(squareId) !== common.squareModel.statusOpen && common.squareModel.pieceColor(squareId) === restCalls.currentPlayer) {

                    possibleMoves.squareId = squareId;
                    possibleMoves.loadPossibleMoves();

                    for (var innerLoopIndex = 0; innerLoopIndex < possibleMoves.getKeys().length; innerLoopIndex++) {

                        this.movePieceToNewSquare(squareId, possibleMoves.getValue(innerLoopIndex));

                        if (!possibleMoves.checkForPlayerInCheck()) {

                            common.squareModel.model(currentSquareModel);
                            return false;
                        }
                        common.squareModel.model(currentSquareModel);
                    }
                }
            }
        }

        return true;
    }
}
