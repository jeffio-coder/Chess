// ToDo
//
// Finish hover
// show move timer
//     
//     http://www.elated.com/articles/creating-a-javascript-clock/
// Promote; change piece ID's?
// IIS  http://www.iis.net/learn/get-started/planning-for-security/how-to-use-locking-in-iis-configuration
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

    board.actionInitialize();
});

var board = {

    mouseDownDivId: '',
    droppableInvoked: false,
    movesResultingInCheck: {},

    actionInitialize: function () {

        common.squareModel = SquareModel();

        common.squareModel.model({});

        possibleMoves.loadSquareMoves();

        restCalls.currentPlayer = common.colors.white;
        restCalls.currentOpponent = common.colors.black;

        common.squareModel.model(restCalls.getSquaresAndPieces());
        
        view.setUpBoardSize();
        view.paintBoardFromModel();

        //setInterval(function () {
        //    $('.Timer').text((new Date - start) / 1000 + " Seconds");
        //}, 1000);
        //intervalId = setInterval(function () {
        //    incrementOrDecrementValue = 1;
        //    setPic();
        //}, interval);

        $('.gameSquare').mousedown(function (event) {
            board.actionMouseDown(event, this);
        });

        // This will only fire if there is no drag event.
        $('.gameSquare').mouseup(function(event) {
            board.actionMouseUp(event, this);
        });

        $('.gameSquare').mouseenter(function() {

            board.actionMouseEnter(this.id);
        });

        $('.gameSquare').mouseleave(function () {

            board.actionMouseLeave();
        });
    },

    actionMouseDown: function (event, div) {

        if (event.which !== 1 || restCalls.gameOver)
            return;

        if (this.mouseDownDivId !== '' ||
            !common.squareModel.squareExists(div.id) ||
            common.squareModel.squareStatus(div.id) === common.squareModel.statusOpen ||
            common.squareModel.pieceColor(div.id) !== restCalls.currentPlayer
        )
            return;


        view.squareMovingSetClass(div.id);
        possibleMoves.squareId = div.id;
        possibleMoves.loadPossibleMoves();

        this.removeMovesThatWouldResultInCheck();
        view.showPossibleMoves();
    },

    actionMouseUp: function (event, div) {

        if (event.which !== 1 || restCalls.gameOver)
            return;

        if (this.mouseDownDivId === '' &&
            (!common.squareModel.squareExists(div.id) ||
            common.squareModel.squareStatus(div.id) === common.squareModel.statusOpen ||
            common.squareModel.pieceColor(div.id) !== restCalls.currentPlayer)
        )
            return;

        if (this.mouseDownDivId === '') {

            this.mouseDownDivId = div.id;
        } else {

            // this.actionDragEnd's second parameter indicates whether to execute a move.
            // this.mouseDownDivId !== div.id is true if the mouse up is in a diffent square than the mouse down.

            this.actionDragEnd(div.id, this.mouseDownDivId !== div.id);
        }
    },
   
    actionMouseEnter: function (divId) {

        if (this.mouseDownDivId === '' && !this.droppableInvoked)
            return;

        if (possibleMoves.isPossibleMove(divId) || this.mouseDownDivId === divId) {

            view.hideMessage();
            return;
        }

        if (divId in this.movesResultingInCheck) {

            view.showMessage('You may not move into check.');
            return;
        }

        view.showMessage('Invalid move.');
    },

    actionMouseLeave: function() {

        view.hideMessage();
    },

    actionInvokeDroppable: function (divId) {

        this.droppableInvoked = true;
        this.actionMouseEnter(divId);
    },

    actionDragEnd: function (targetId, executeMove) {
       
        view.clearSquaresMarkedForMove();
        this.droppableInvoked = false;

        if (targetId && (possibleMoves.isPossibleMove(targetId)) && executeMove) {

            this.movePieceToNewSquare(possibleMoves.squareId, targetId);
            this.changeCurrentPlayer();
        }

        possibleMoves.setMoves({});
        this.mouseDownDivId = '';
        view.hideMessage();
    },
    
    movePieceToNewSquare: function (sourceId, targetId) {

        this.capturePieceIfApplicable(sourceId, targetId);

        if (possibleMoves.getValue(targetId) === common.specialMoves.none || possibleMoves.getValue(targetId) === common.specialMoves.enPassant) {
            
            common.squareModel.pieceId(targetId, common.squareModel.pieceId(sourceId));
            common.squareModel.pieceId(sourceId, common.pieceIds.none);

            common.squareModel.pieceHasMoved(targetId, true);

            common.squareModel.pieceEnPassantEligible(targetId,
                common.squareModel.pieceType(targetId) === common.pieces.pawn && common.getRank(targetId) - common.getRank(sourceId) === 2);
        }

        if (possibleMoves.getValue(targetId) === common.specialMoves.castleKing) {

            this.castleKing(targetId);
            return;
        }

        if (possibleMoves.getValue(targetId) === common.specialMoves.castleQueen)
            this.castleQueen(targetId);
    },

    capturePieceIfApplicable: function (sourceId, targetId) {

        if (possibleMoves.getValue(targetId) === common.specialMoves.none) {

            if (common.squareModel.squareStatus(targetId) !== common.squareModel.statusOpen)
                common.squareModel.pieceCaptured(targetId, true);

            return;
        }

        if (possibleMoves.getValue(targetId) === common.specialMoves.enPassant) {

            var squareBehindId = (common.getRank(targetId) - 1).toString() + common.getFile(targetId).toString();
            common.squareModel.pieceCaptured(squareBehindId, true);
            common.squareModel.pieceId(squareBehindId, common.pieceIds.none);
            return;
        }
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

            common.squareModel.pieceId(whiteKingTargetId, common.pieceIds.whiteKing);
            common.squareModel.pieceId(whiteKingsRookTargetId, common.pieceIds.whiteKingsRook);
            common.squareModel.pieceId(whiteKingSourceId, common.pieceIds.none);
            common.squareModel.pieceId(whiteKingsRookSourceId, common.pieceIds.none);
            common.squareModel.pieceHasMoved(whiteKingTargetId, true);
            common.squareModel.pieceHasMoved(whiteKingsRookTargetId, true);
        }

        if (targetId === blackKingTargetId) {  

            common.squareModel.pieceId(blackKingTargetId, common.pieceIds.blackKing);
            common.squareModel.pieceId(blackKingsRookTargetId, common.pieceIds.blackKingsRook);
            common.squareModel.pieceId(blackKingSourceId, common.pieceIds.none);
            common.squareModel.pieceId(blackKingsRookSourceId, common.pieceIds.none);
            common.squareModel.pieceHasMoved(blackKingTargetId, true);
            common.squareModel.pieceHasMoved(blackKingsRookTargetId, true);
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

            common.squareModel.pieceId(whiteKingTargetId, common.pieceIds.whiteKing);
            common.squareModel.pieceId(whiteQueensRookTargetId, common.pieceIds.whiteQueensRook);
            common.squareModel.pieceId(whiteKingSourceId, common.pieceIds.none);
            common.squareModel.pieceId(whiteQueensRookSourceId, common.pieceIds.none);
            common.squareModel.pieceHasMoved(whiteKingTargetId, true);
            common.squareModel.pieceHasMoved(whiteQueensRookTargetId, true);
        }

        if (targetId === blackKingTargetId) {

            common.squareModel.pieceId(blackKingTargetId, common.pieceIds.blackKing);
            common.squareModel.pieceId(blackQueensRookTargetId, common.pieceIds.blackQueensRook);
            common.squareModel.pieceId(blackKingSourceId, common.pieceIds.none);
            common.squareModel.pieceId(blackQueensRookSourceId, common.pieceIds.none);
            common.squareModel.pieceHasMoved(blackKingTargetId, true);
            common.squareModel.pieceHasMoved(blackQueensRookTargetId, true);
        }
    },

    removeMovesThatWouldResultInCheck: function () {

        var currentSquareModel = JSON.parse(JSON.stringify(common.squareModel.model()));

        this.movesResultingInCheck = {};
        var loopIndex = 0;

        for (loopIndex = 0; loopIndex < possibleMoves.getKeys().length; loopIndex++) {

            this.movePieceToNewSquare(possibleMoves.squareId, possibleMoves.getValue(loopIndex));

            if (possibleMoves.checkForPlayerInCheck())
                this.movesResultingInCheck[possibleMoves.getValue(loopIndex)] = '';

            common.squareModel.model(JSON.parse(JSON.stringify(currentSquareModel)));
        }

        for (loopIndex = 0; loopIndex < Object.keys(this.movesResultingInCheck).length ; loopIndex++) {

            possibleMoves.deleteElement(Object.keys(this.movesResultingInCheck)[loopIndex]);
        }
    },

    changeCurrentPlayer: function () {
        
        restCalls.playerMoveNumber++;
        restCalls.currentPlayer = (restCalls.playerMoveNumber % 2) === 0 ? common.colors.white : common.colors.black;
        restCalls.currentOpponent = (restCalls.playerMoveNumber % 2) === 0 ? common.colors.black : common.colors.white;

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

        var currentSquareModel = JSON.parse(JSON.stringify(common.squareModel.model()));
        var squareId = '';

        for (var outerLoopIndex = 1; outerLoopIndex <=8; outerLoopIndex++) {

            for (var middleLoopIndex = 1; middleLoopIndex <= 8; middleLoopIndex++) {

                squareId = outerLoopIndex.toString() + middleLoopIndex.toString();

                if (common.squareModel.squareStatus(squareId) === common.squareModel.statusPlayerOccupied) {

                    possibleMoves.squareId = squareId;
                    possibleMoves.loadPossibleMoves();

                    for (var innerLoopIndex = 0; innerLoopIndex < possibleMoves.getKeys().length; innerLoopIndex++) {

                        this.movePieceToNewSquare(squareId, possibleMoves.getValue(innerLoopIndex));

                        if (!possibleMoves.checkForPlayerInCheck()) {

                            common.squareModel.model(JSON.parse(JSON.stringify(currentSquareModel)));
                            return false;
                        }
                        common.squareModel.model(JSON.parse(JSON.stringify(currentSquareModel)));
                    }
                }
            }
        }

        return true;
    }
}
