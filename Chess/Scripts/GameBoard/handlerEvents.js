// ToDo
//
// Promote; change piece ID's?
// convert to rest calls - possible moves; change script names; move Game.html
// End game
// Error Handling; logging
// Unit tests; QUnit, Jasmine
//
// Document
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

        common.squaresObj = Squares();

        common.squaresObj.val({});

        requests.currentPlayer = common.colors.white;
        requests.currentOpponent = common.colors.black;

        common.squaresObj.val(requests.getSquaresAndPieces());

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

        common.squaresObj.showTestData(div.id);

        if (event.which !== 1 || requests.gameOver) {
            
            return;
        }

        if (this.mouseUpDivId !== '' ||
            common.squaresObj.squareStatus(div.id) === common.squaresObj.statuses.open ||
            common.squaresObj.pieceColor(div.id) !== requests.currentPlayer) {
            
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
           (common.squaresObj.squareStatus(div.id) === common.squaresObj.statuses.open ||
            common.squaresObj.pieceColor(div.id) !== requests.currentPlayer)) {

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

            if (common.squaresObj.movePieceToNewSquare(this.activeSquareId, targetId)) {
                
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

        changeSquareModelToOtherPlayer();


        // ToDo
        //if (getPossibleMoves.checkForPlayerInCheck()) {

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

        setEnPassantIneligibleForPlayer();
    },
     
    checkForCheckMate: function () {

        var currentSquareModel = JSON.parse(JSON.stringify(model()));
        var squareId = '';

        for (var outerLoopIndex = 1; outerLoopIndex <=8; outerLoopIndex++) {

            for (var middleLoopIndex = 1; middleLoopIndex <= 8; middleLoopIndex++) {

                squareId = outerLoopIndex.toString() + middleLoopIndex.toString();

                if (common.squaresObj.squareStatus(squareId) === common.squaresObj.statuses.occupiedByPlayer) {

                    common.squaresObj.possibleMoves.squareId = squareId;
                    common.squaresObj.possibleMoves.loadPossibleMoves();

                    for (var innerLoopIndex = 0; innerLoopIndex < common.squaresObj.possibleMoves.getKeys().length; innerLoopIndex++) {

                        this.movePieceToNewSquare(squareId, common.squaresObj.possibleMoves.getValue(innerLoopIndex));

                        if (!getPossibleMoves.checkForPlayerInCheck()) {

                            model(JSON.parse(JSON.stringify(currentSquareModel)));
                            return false;
                        }
                        model(JSON.parse(JSON.stringify(currentSquareModel)));
                    }
                }
            }
        }

        return true;
    }
}
