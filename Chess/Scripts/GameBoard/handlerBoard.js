var board = {

    squareDimension: 0,

    setUpBoardSize: function() {

        var maxDimension = window.innerHeight < window.innerWidth ? innerHeight : innerWidth;

        // Make the maxDimension two thirds of the page.
        maxDimension = Math.floor(maxDimension * (2 / 3));

        // Make the maxDimension divisible by 8.
        maxDimension += 8 - (maxDimension % 8);

        this.squareDimension = maxDimension / 8;

        $('#mainBoard').width(maxDimension);
        $('#mainBoard').height(maxDimension);

        $('#divTimer').width(maxDimension);

        var captureSize = (this.squareDimension / 2).toString();

        $('[id^=captureRow]').height(captureSize);
        $('[id^=capturePiece]').attr('style', 'float:left; ');
        $('[id^=capturePiece]').height(captureSize);
        $('[id^=capturePiece]').width(captureSize);

        $('#checkWarning').height(captureSize);
        $('#checkWarning').width(maxDimension);

        $('#divShowMessage').width(maxDimension);

        this.hideCheckWarning();
        this.hideMessage();
    },

    updateClock: function() {

        var seconds = Math.floor(common.stopWatch.currentTime() / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        var displayTime = (days === 0 ? '' : days === 1 ? days.toString() + ' day, ' : days.toString() + ' days, ').toString() +
            hours.toString() + ':' +
            (minutes < 10 ? '0' + minutes.toString() : minutes.toString()).toString() + ':' +
            (seconds < 10 ? '0' + seconds.toString() : seconds.toString()).toString();

        $('#timer').text(displayTime);
    },

    paintBoardFromModel: function() {

        var squareId = '';

        for (var rankIndex = 8; rankIndex >= 1; rankIndex--) {

            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                squareId = rankIndex.toString() + fileIndex.toString();

                $('#' + squareId).removeClass();
                $('#' + squareId).removeAttr('style');

                $('#' + squareId).width(this.squareDimension);
                $('#' + squareId).height(this.squareDimension);
                $('#' + squareId).addClass('gameSquare ' + this.getClassNameFromSquareModel(rankIndex, fileIndex));
                $('#' + squareId).droppable();

                if (requests.showTestData) {

                    $('#' + squareId).text(squareId);
                }

                if (!common.squares.squareStatus(squareId) !== common.squares.statuses.open)
                    this.setDraggable(squareId);
            }
        }


        $('[id^=capturePiece]').removeClass();
        var counterTop = 0;
        var counterBottom = 0;
        var key = '';
        var color = '';

        for (var loopIndex = 0; loopIndex < Object.keys(common.squares.getCapturedPieces()).length; loopIndex++) {

            key = Object.keys(common.squares.getCapturedPieces())[loopIndex];
            color = common.squares.getCapturedPieces()[key].color;
                
            if (color === requests.currentPlayer) // The captured piece should go on the top because the color playing is at the bottom.

                $('#capturePieceTop' + (++counterTop).toString()).addClass(color + '_' + common.squares.getCapturedPieces()[key].type);
            else
                $('#capturePieceBottom' + (++counterBottom).toString()).addClass(color + '_' + common.squares.getCapturedPieces()[key].type);
        }
    },

    showPossibleMoves: function (squareId) {
        this.markSquaresAsPossibleMove(squareId);
    },

    showCheckWarning: function() {

        if (requests.currentPlayer === common.colors.white) {

            $('#spanCheckWarning').text('White is in Check!');
            $('#spanCheckWarning').attr('style', 'color:#ffffff; ' + 'font-size:' + ((this.squareDimension / 2) - 4).toString() + 'px; ');
        } else {
            $('#spanCheckWarning').text('Black is in Check!');
            $('#spanCheckWarning').attr('style', 'color:#000000; ' + 'font-size:' + ((this.squareDimension / 2) - 4).toString() + 'px; ');
        }

        $('#checkWarning').show();
    },

    hideCheckWarning: function () {

        $('#checkWarning').hide();
        $('#spanCheckWarning').text();
    },

    showMessage: function (message) {

        $('#showMessage').text(message);
        $('#showMessage').removeClass('gameMessageHide');
        $('#showMessage').addClass('gameMessageShow');
    },

    hideMessage: function () {

        $('#showMessage').text('');
        $('#showMessage').removeClass('gameMessageShow');
        $('#showMessage').addClass('gameMessageHide');
    },

    showCheckmate: function () {

        if (requests.currentPlayer === common.colors.white) {

            $('#spanCheckWarning').text('Checkmate, Black wins!');
            $('#spanCheckWarning').attr('style', 'color:#ffffff; ' + 'font-size:' + ((this.squareDimension / 2) - 4).toString() + 'px; ');
        } else {
            $('#spanCheckWarning').text('Checkmate, Black wins!');
            $('#spanCheckWarning').attr('style', 'color:#000000; ' + 'font-size:' + ((this.squareDimension / 2) - 4).toString() + 'px; ');
        }

        $('#checkWarning').show();
    },

    squareMovingSetClass: function (divId) {

        $('#' + divId).addClass('squareMoving');
    },

    clearSquaresMarkedForMove: function (squareId) {

        this.unmarkSquaresAsPossibleMove(squareId);

        if (squareId !== '') {

            $('#' + squareId).removeClass('squareMoving');
        }
    },

    getClassNameFromSquareModel: function (rank, file) {

        var squareId = rank.toString() + file.toString();

        if (common.squares.squareStatus(squareId) === common.squares.statuses.open)
            return common.squares.color(squareId) + '_Square';

        return common.squares.color(squareId) + '_Square ' + common.squares.pieceColor(squareId) + '_' + common.squares.pieceType(squareId);

    },

    setDraggable: function (id) {

        $('#' + id).draggable({
            revert: function (droppableObject) {
                if (droppableObject && droppableObject[0] && droppableObject[0].id) {
                    boardEvents.actionDragEnd(droppableObject[0].id, true);
                }
                board.clearSquaresMarkedForMove(id);
                return true;
            },
            revertDuration: 0,
            helper: 'clone'
        });
    },

    markSquaresAsPossibleMove: function (squareId) {

        var keys = common.squares.getPossibleMoves(squareId);

        for (var loopIndex = 0; loopIndex < keys.length; loopIndex++) {

            $('#' + keys[loopIndex]).removeClass(common.squares.color(keys[loopIndex]) + '_Square');
            $('#' + keys[loopIndex]).addClass(common.squares.color(keys[loopIndex]) + '_PossibleMove');
        }
    },

    unmarkSquaresAsPossibleMove: function (squareId) {

        var keys = common.squares.getPossibleMoves(squareId);

        for (var loopIndex = 0; loopIndex < keys.length; loopIndex++) {

            $('#' + keys[loopIndex]).removeClass(common.squares.color(keys[loopIndex]) + '_PossibleMove');
            $('#' + keys[loopIndex]).addClass(common.squares.color(keys[loopIndex]) + '_Square');
        }
    }
}