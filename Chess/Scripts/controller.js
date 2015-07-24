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

        var squareModel = SquareModel();
        var setModel = squareModel.setModel;
        setModel({});

        common.stopWatch.start();
        possibleMoves.loadSquareMoves();
        common.stopWatch.stop();
        $('#timer').text(common.stopWatch.elapsedTime().toString());

        restCalls.currentPlayer = globals.colors.white;
        restCalls.currentOpponent = globals.colors.black;

        squareModel.setModel()(restCalls.getSquaresAndPieces());
        
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
            (!squareModel.squareIdExists(div.id) ||
            squareModel.squareStatus(div.id) === squareModel.statusOpen ||
            squareModel.getPieceColor(div.id) !== restCalls.currentPlayer)
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
            !squareModel.squareIdExists(div.id) ||
            squareModel.getPieceId(div.id) === '' ||
            squareModel.getPieceColor(div.id) !== restCalls.currentPlayer
        )
            return;

        view.squareMovingSetClass(div.id);
        possibleMoves.squareId = div.id;
        possibleMoves.loadPossibleMoves();

        switch (squareModel.getPieceType(div.id)) {

            case globals.king:
                possibleMoves.possibleMovesForKing();
                break;
            case globals.queen:
                possibleMoves.possibleMovesForQueen();
                break;
            case globals.rook:
                possibleMoves.possibleMovesForRook();
                break;
            case globals.knight:
                possibleMoves.possibleMovesForKnight();
                break;
            case globals.bishop:
                possibleMoves.possibleMovesForBishop();
                break;
            case globals.pawn:
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

            squareModel.setPieceHasMoved(targetId, true);

            squareModel.setPieceEnPassantEligible(targetId, 
                squareModel.getPieceType(targetId) === globals.pawn && common.getRank(targetId) - common.getRank(sourceId) === 2);
        }
    },

    capturePieceIfApplicable: function (sourceId, targetId) {

        if (possibleMoves.getValue(targetId) === globals.specialMoves.none) {

            if (squareModel.squareStatus(targetId) !== squareModel.statusOpen)
                squareModel.setPieceCaptured(targetId, true);

            return;
        }

        if (possibleMoves.getValue(targetId) === globals.specialMoves.enPassant) {

            var squareBehindId = (common.getRank(targetId) - 1).toString() + common.getFile(targetId).toString();
            squareModel.setPieceCaptured(targetId, squareBehindId);
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
            squareModel.setPieceHasMoved('WK', true);
            squareModel.setPieceHasMoved('WKR', true);
        }

        if (targetId === '12') {  // Black king

            squareModel.setPieceId('12', 'BK');
            squareModel.setPieceId('13', 'BKR');
            squareModel.setPieceId('14', '');
            squareModel.setPieceId('11', '');
            squareModel.setPieceHasMoved('BK', true);
            squareModel.setPieceHasMoved('BKR', true);
        }
    },

    castleQueen: function (targetId) {

        if (targetId === '13') {  // White king

            squareModel.setPieceId('13', 'WK');
            squareModel.setPieceId('14', 'WQR');
            squareModel.setPieceId('15', '');
            squareModel.setPieceId('11', '');
            squareModel.setPieceHasMoved('WK', true);
            squareModel.setPieceHasMoved('WQR', true);
        }

        if (targetId === '16') {  // Black king

            squareModel.setPieceId('16', 'BK');
            squareModel.setPieceId('15', 'BQR');
            squareModel.setPieceId('14', '');
            squareModel.setPieceId('18', '');
            squareModel.setPieceHasMoved('BK', true);
            squareModel.setPieceHasMoved('BQR', true);
        }
    },

    removeMovesThatWouldResultInCheck: function () {

        var currentSquareModel = squareModel.getModelCopy();

        // ToDo possible moves model
        var movesToRemove = [];
        var loopIndex = 0;

        for (loopIndex = 0; loopIndex < possibleMoves.getKeys().length; loopIndex++) {

            this.movePieceToNewSquare(possibleMoves.squareId, possibleMoves.getValue(loopIndex));

            if (possibleMoves.checkForPlayerInCheck())
                movesToRemove.push(possibleMoves.getValue(loopIndex));

            squareModel.setModel(currentSquareModel);
        }

        for (loopIndex = 0; loopIndex < movesToRemove.length; loopIndex++) {

            possibleMoves.deleteElement(movesToRemove[loopIndex]);
        }
    },

    changeCurrentPlayer: function () {
        
        restCalls.playerMoveNumber++;
        restCalls.currentPlayer = (restCalls.playerMoveNumber % 2) === 0 ? globals.colors.white : globals.colors.black;
        restCalls.currentOpponent = (restCalls.playerMoveNumber % 2) === 0 ? globals.colors.black : globals.colors.white;

        squareModel.changeSquareModelToOtherPlayer();

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

        squareModel.setEnPassantIneligibleForPlayer();
    },
     
    checkForCheckMate: function () {

        var currentSquareModel = squareModel.getModelCopy();
        var squareId = '';

        for (var outerLoopIndex = 1; outerLoopIndex <=8; outerLoopIndex++) {

            for (var middleLoopIndex = 1; middleLoopIndex <= 8; middleLoopIndex++) {

                squareId = outerLoopIndex.toString() + middleLoopIndex.toString();

                if (squareModel.squareStatus(squareId) !== squareModel.statusOpen && squareModel.getPieceColor(squareId) === restCalls.currentPlayer) {

                    possibleMoves.squareId = squareId;
                    possibleMoves.loadPossibleMoves();

                    for (var innerLoopIndex = 0; innerLoopIndex < possibleMoves.getKeys().length; innerLoopIndex++) {

                        this.movePieceToNewSquare(squareId, possibleMoves.getValue(innerLoopIndex));

                        if (!possibleMoves.checkForPlayerInCheck()) {

                            squareModel.setModel(currentSquareModel);
                            return false;
                        }
                        squareModel.setModel(currentSquareModel);
                    }
                }
            }
        }

        return true;
    },
}
