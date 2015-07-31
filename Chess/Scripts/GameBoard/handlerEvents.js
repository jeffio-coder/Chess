// ToDo
//
// Promote; change piece ID's?
// Ckeckmate issues (queen covered by bishop)
// IIS  http://www.iis.net/learn/get-started/planning-for-security/how-to-use-locking-in-iis-configuration
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

    events.actionInitialize();
});

var events = {

    mouseDownDivId: '',
    movesResultingInCheck: {},

    actionInitialize: function () {

        common.squares = Squares();

        common.squares.model({});

        possibleMoves.loadSquareMoves();

        requests.currentPlayer = common.colors.white;
        requests.currentOpponent = common.colors.black;

        common.squares.model(requests.getSquaresAndPieces());
        
        board.setUpBoardSize();
        board.paintBoardFromModel();

        common.stopWatch = common.StopWatch();
        common.stopWatch.start();
        board.updateClock();

        setInterval(function () {
            board.updateClock();
        }, 1000);

        $('.gameSquare').mousedown(function (event) {
            events.actionMouseDown(event, this);
        });

        // This will only fire if there is no drag event.
        $('.gameSquare').mouseup(function(event) {
            events.actionMouseUp(event, this);
        });
    },

    actionMouseDown: function (event, div) {

        if (event.which !== 1 || requests.gameOver) {
            
            return;
        }

        if (this.mouseDownDivId !== '' ||
            !common.squares.squareExists(div.id) || ///////////////// ToDo: Whack squareExists
            common.squares.squareStatus(div.id) === common.squares.statusOpen ||
            common.squares.pieceColor(div.id) !== requests.currentPlayer) {
            
            return;
        }


        board.squareMovingSetClass(div.id);
        possibleMoves.squareId = div.id;
        possibleMoves.loadPossibleMoves();

        this.removeMovesThatWouldResultInCheck();
        board.showPossibleMoves();
    },

    actionMouseUp: function (event, div) {

        if (event.which !== 1 || requests.gameOver)
            return;

        if (this.mouseDownDivId === '' &&
            (!common.squares.squareExists(div.id) ||
            common.squares.squareStatus(div.id) === common.squares.statusOpen ||
            common.squares.pieceColor(div.id) !== requests.currentPlayer)
        )
            return;

        if (this.mouseDownDivId === '') {

            this.mouseDownDivId = div.id;
        } else {

            var executeMove = this.mouseDownDivId !== div.id;

            this.actionDragEnd(div.id, executeMove);
        }
    },

    actionDragEnd: function (targetId, executeMove) {
       
        board.clearSquaresMarkedForMove();

        if (targetId && (possibleMoves.isPossibleMove(targetId)) && executeMove) {

            this.movePieceToNewSquare(possibleMoves.squareId, targetId);
            this.changeCurrentPlayer();
        }

        possibleMoves.setMoves({});
        this.mouseDownDivId = '';
        board.hideMessage();
    },
    
    movePieceToNewSquare: function (sourceId, targetId) {

        this.capturePieceIfApplicable(sourceId, targetId);

        if (possibleMoves.getValue(targetId) === common.specialMoves.none || possibleMoves.getValue(targetId) === common.specialMoves.enPassant) {
            
            common.squares.pieceId(targetId, common.squares.pieceId(sourceId));
            common.squares.pieceId(sourceId, common.pieceIds.none);

            common.squares.pieceHasMoved(targetId, true);

            common.squares.pieceEnPassantEligible(targetId,
                common.squares.pieceType(targetId) === common.pieces.pawn && common.getRank(targetId) - common.getRank(sourceId) === 2);
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

            if (common.squares.squareStatus(targetId) !== common.squares.statusOpen)
                common.squares.pieceCaptured(targetId, true);

            return;
        }

        if (possibleMoves.getValue(targetId) === common.specialMoves.enPassant) {

            var squareBehindId = (common.getRank(targetId) - 1).toString() + common.getFile(targetId).toString();
            common.squares.pieceCaptured(squareBehindId, true);
            common.squares.pieceId(squareBehindId, common.pieceIds.none);
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

            common.squares.pieceId(whiteKingTargetId, common.pieceIds.whiteKing);
            common.squares.pieceId(whiteKingsRookTargetId, common.pieceIds.whiteKingsRook);
            common.squares.pieceId(whiteKingSourceId, common.pieceIds.none);
            common.squares.pieceId(whiteKingsRookSourceId, common.pieceIds.none);
            common.squares.pieceHasMoved(whiteKingTargetId, true);
            common.squares.pieceHasMoved(whiteKingsRookTargetId, true);
        }

        if (targetId === blackKingTargetId) {  

            common.squares.pieceId(blackKingTargetId, common.pieceIds.blackKing);
            common.squares.pieceId(blackKingsRookTargetId, common.pieceIds.blackKingsRook);
            common.squares.pieceId(blackKingSourceId, common.pieceIds.none);
            common.squares.pieceId(blackKingsRookSourceId, common.pieceIds.none);
            common.squares.pieceHasMoved(blackKingTargetId, true);
            common.squares.pieceHasMoved(blackKingsRookTargetId, true);
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

            common.squares.pieceId(whiteKingTargetId, common.pieceIds.whiteKing);
            common.squares.pieceId(whiteQueensRookTargetId, common.pieceIds.whiteQueensRook);
            common.squares.pieceId(whiteKingSourceId, common.pieceIds.none);
            common.squares.pieceId(whiteQueensRookSourceId, common.pieceIds.none);
            common.squares.pieceHasMoved(whiteKingTargetId, true);
            common.squares.pieceHasMoved(whiteQueensRookTargetId, true);
        }

        if (targetId === blackKingTargetId) {

            common.squares.pieceId(blackKingTargetId, common.pieceIds.blackKing);
            common.squares.pieceId(blackQueensRookTargetId, common.pieceIds.blackQueensRook);
            common.squares.pieceId(blackKingSourceId, common.pieceIds.none);
            common.squares.pieceId(blackQueensRookSourceId, common.pieceIds.none);
            common.squares.pieceHasMoved(blackKingTargetId, true);
            common.squares.pieceHasMoved(blackQueensRookTargetId, true);
        }
    },

    removeMovesThatWouldResultInCheck: function () {

        var currentSquareModel = JSON.parse(JSON.stringify(common.squares.model()));

        this.movesResultingInCheck = {};
        var loopIndex = 0;

        for (loopIndex = 0; loopIndex < possibleMoves.getKeys().length; loopIndex++) {

            this.movePieceToNewSquare(possibleMoves.squareId, possibleMoves.getValue(loopIndex));

            if (possibleMoves.checkForPlayerInCheck())
                this.movesResultingInCheck[possibleMoves.getValue(loopIndex)] = '';

            common.squares.model(JSON.parse(JSON.stringify(currentSquareModel)));
        }

        for (loopIndex = 0; loopIndex < Object.keys(this.movesResultingInCheck).length ; loopIndex++) {

            possibleMoves.deleteElement(Object.keys(this.movesResultingInCheck)[loopIndex]);
        }
    },

    changeCurrentPlayer: function () {
        
        requests.playerMoveNumber++;
        requests.currentPlayer = (requests.playerMoveNumber % 2) === 0 ? common.colors.white : common.colors.black;
        requests.currentOpponent = (requests.playerMoveNumber % 2) === 0 ? common.colors.black : common.colors.white;

        common.squares.changeSquareModelToOtherPlayer();

        if (possibleMoves.checkForPlayerInCheck()) {

            if (this.checkForCheckMate()) {
                
                board.showCheckmate();
                board.paintBoardFromModel();
                return;
            } else {
                common.inCheck = true;
                board.showCheckWarning();
            }          
        } else {
            common.inCheck = false;
            board.hideCheckWarning();
        }

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
