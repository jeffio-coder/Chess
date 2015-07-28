var view = {

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

                if (!common.squareModel.squareStatus(squareId) !== common.squareModel.statusOpen)
                    this.setDraggable(squareId);
            }
        }


        $('[id^=capturePiece]').removeClass();
        var counterTop = 0;
        var counterBottom = 0;
        var key = '';
        var color = '';

        for (var loopIndex = 0; loopIndex < Object.keys(common.squareModel.getCapturedPieces()).length; loopIndex++) {

            key = Object.keys(common.squareModel.getCapturedPieces())[loopIndex];
            color = common.squareModel.getCapturedPieces()[key].color;
                
            if (color === restCalls.currentPlayer) // The captured piece should go on the top because the color playing is at the bottom.

                $('#capturePieceTop' + (++counterTop).toString()).addClass(color + '_' + common.squareModel.getCapturedPieces()[key].type);
            else
                $('#capturePieceBottom' + (++counterBottom).toString()).addClass(color + '_' + common.squareModel.getCapturedPieces()[key].type);
        }
    },

    showPossibleMoves: function () {
        this.markSquaresAsPossibleMove();
    },

    showCheckWarning: function() {

        if (restCalls.currentPlayer === common.colors.white) {

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

        if (restCalls.currentPlayer === common.colors.white) {

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

    clearSquaresMarkedForMove: function () {

        this.unmarkSquaresAsPossibleMove();

        if (possibleMoves.squareId !== '') {

            $('#' + possibleMoves.squareId).removeClass('squareMoving');
        }
    },

    getClassNameFromSquareModel: function (rank, file) {

        var squareId = rank.toString() + file.toString();

        if (common.squareModel.squareStatus(squareId) === common.squareModel.statusOpen)
            return common.squareModel.color(squareId) + '_Square';

        return common.squareModel.color(squareId) + '_Square ' + common.squareModel.pieceColor(squareId) + '_' + common.squareModel.pieceType(squareId);

    },

    setDraggable: function (id) {

        $('#' + id).draggable({
            revert: function (droppableObject) {
                if (droppableObject && droppableObject[0] && droppableObject[0].id) {
                    board.actionDragEnd(droppableObject[0].id, true);
                }
                view.clearSquaresMarkedForMove();
                return true;
            },
            revertDuration: 0,
            helper: 'clone'
        });
    },

    markSquaresAsPossibleMove: function () {

        for (var loopIndex = 0; loopIndex < possibleMoves.getKeys().length; loopIndex++) {

            $('#' + possibleMoves.getValue(loopIndex)).removeClass(common.squareModel.color(possibleMoves.getValue(loopIndex)) + '_Square');
            $('#' + possibleMoves.getValue(loopIndex)).addClass(common.squareModel.color(possibleMoves.getValue(loopIndex)) + '_PossibleMove');
        }
    },

    unmarkSquaresAsPossibleMove: function () {

        for (var loopIndex = 0; loopIndex < possibleMoves.getKeys().length; loopIndex++) {

            $('#' + possibleMoves.getValue(loopIndex)).removeClass(common.squareModel.color(possibleMoves.getValue(loopIndex)) + '_PossibleMove');
            $('#' + possibleMoves.getValue(loopIndex)).addClass(common.squareModel.color(possibleMoves.getValue(loopIndex)) + '_Square');
        }
    }
}