// ToDo
//
// Promote; change piece ID's?
// Rename and move scripts.
// convert to rest calls - possible moves; change script names; move Game.html
// End game
// web workers on check for check/checkmate -- http://keithwhor.github.io/multithread.js/  http://codersblock.com/blog/multi-threaded-javascript-with-web-workers/
// Error Handling; logging
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


*/
$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });

    boardEvents.actionInitialize();
});

var boardEvents = {

    mouseUpDivId: '',
    activeSquareId: '',

    actionInitialize: function () {

        common.squares = Squares();

        common.squares.val({});

        requests.currentPlayer = common.colors.white;
        requests.currentOpponent = common.colors.black;

        common.squares.val(requests.getSquaresAndPieces());
        common.squares.setVectorProperties();
        //removeMovesThatWouldResultInCheck();

        board.setUpBoardSize();
        board.paintBoardFromModel();

        common.stopWatch = common.StopWatch();
        common.stopWatch.start();
        board.updateClock();

        setInterval(function () {
            board.updateClock();
        }, 1000);

        $('.gameSquare').mousedown(function (event) {
            boardEvents.actionMouseDown(event, this);
        });

        // This will only fire if there is no drag event.
        $('.gameSquare').mouseup(function(event) {
            boardEvents.actionMouseUp(event, this);
        });
    },

    actionMouseDown: function (event, div) {

        common.squares.showTestData(div.id);

        if (event.which !== 1 || requests.gameOver) {
            
            return;
        }

        if (this.mouseUpDivId !== '' ||
            common.squares.squareStatus(div.id) === common.squares.statuses.open ||
            common.squares.pieceColor(div.id) !== requests.currentPlayer) {
            
            return;
        }


        this.activeSquareId = div.id;
        board.squareMovingSetClass(div.id);
        board.showPossibleMoves(div.id);
    },

    actionMouseUp: function (event, div) {

        if (event.which !== 1 || requests.gameOver) {
            
            return;
        }

        if (this.mouseUpDivId === '' &&
           (common.squares.squareStatus(div.id) === common.squares.statuses.open ||
            common.squares.pieceColor(div.id) !== requests.currentPlayer)) {

            return;
        }

        if (this.mouseUpDivId === '') {

            this.mouseUpDivId = div.id;
        } else {

            var executeMove = this.mouseUpDivId !== div.id;

            this.actionDragEnd(div.id, executeMove);
        }
    },

    actionDragEnd: function (targetId, executeMove) {
       
        board.clearSquaresMarkedForMove(this.activeSquareId);

        if (targetId && executeMove) {

            if (common.squares.movePieceToNewSquare(this.activeSquareId, targetId)) {
                
                this.changeCurrentPlayer();
            }
        }

        this.activeSquareId = '';
        this.mouseUpDivId = '';
    },
    
    changeCurrentPlayer: function () {
        
        requests.playerMoveNumber++;
        requests.currentPlayer = (requests.playerMoveNumber % 2) === 0 ? common.colors.white : common.colors.black;
        requests.currentOpponent = (requests.playerMoveNumber % 2) === 0 ? common.colors.black : common.colors.white;

        common.squares.changeSquareModelToOtherPlayer();


        // ToDo
        //if (possibleMoves.checkForPlayerInCheck()) {

        //    if (this.checkForCheckMate()) {
                
        //        board.showCheckmate();
        //        board.paintBoardFromModel();
        //        return;
        //    } else {
        //        common.inCheck = true;
        //        board.showCheckWarning();
        //    }          
        //} else {
        //    common.inCheck = false;
        //    board.hideCheckWarning();
        //}

        board.paintBoardFromModel();
        common.stopWatch.start();

        common.squares.setEnPassantIneligibleForPlayer();
    },
     
    checkForCheckMate: function () {

        var currentSquareModel = JSON.parse(JSON.stringify(common.squares.model()));
        var squareId = '';

        for (var outerLoopIndex = 1; outerLoopIndex <=8; outerLoopIndex++) {

            for (var middleLoopIndex = 1; middleLoopIndex <= 8; middleLoopIndex++) {

                squareId = outerLoopIndex.toString() + middleLoopIndex.toString();

                if (common.squares.squareStatus(squareId) === common.squares.statusPlayerOccupied) {

                    possibleMoves.squareId = squareId;
                    possibleMoves.loadPossibleMoves();

                    for (var innerLoopIndex = 0; innerLoopIndex < possibleMoves.getKeys().length; innerLoopIndex++) {

                        this.movePieceToNewSquare(squareId, possibleMoves.getValue(innerLoopIndex));

                        if (!possibleMoves.checkForPlayerInCheck()) {

                            common.squares.model(JSON.parse(JSON.stringify(currentSquareModel)));
                            return false;
                        }
                        common.squares.model(JSON.parse(JSON.stringify(currentSquareModel)));
                    }
                }
            }
        }

        return true;
    }
}
