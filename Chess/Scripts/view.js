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

        var captureSize = (this.squareDimension / 2).toString();

        $('[id^=captureRow]').height(captureSize);
        $('[id^=capturePiece]').attr('style', 'float:left; ');
        $('[id^=capturePiece]').height(captureSize);
        $('[id^=capturePiece]').width(captureSize);

        $('#checkWarning').height(captureSize);
        $('#checkWarning').width(maxDimension);

        this.hideCheckWarning();
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

                if (squareModel.pieceId(squareId) !== '')
                    this.setDraggable(squareId);
            }
        }


        $('[id^=capturePiece]').removeClass();
        var counterTop = 0;
        var counterBottom = 0;

        Object.keys(pieceModel.pieces).forEach(function (key) {

            if (pieceModel.pieces[key].captured) {

                if (pieceModel.pieces[key].color === restCalls.currentPlayer)  // The captured piece should go on the top because the color playing is at the bottom.
                    $('#capturePieceTop' + (++counterTop).toString()).addClass(pieceModel.pieces[key].color + '_' + pieceModel.pieces[key].pieceType);
                else 
                    $('#capturePieceBottom' + (++counterBottom).toString()).addClass(pieceModel.pieces[key].color + '_' + pieceModel.pieces[key].pieceType);
            }
        });
    },

    showPossibleMoves: function () {
        this.markSquaresAsPossibleMove();
    },

    showCheckWarning: function() {

        if (restCalls.currentPlayer === globals.colors.white) {

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

    showCheckmate: function () {

        if (restCalls.currentPlayer === globals.colors.white) {

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

        if (squareModel.pieceId(rank, file) === '')
            return squareModel.color(rank, file) + '_Square';

        return  squareModel.color(rank, file) + '_Square ' + squareModel.pieceColor(rank, file) + '_' + squareModel.pieceType(rank, file);
    },

    setDraggable: function (id) {

        $('#' + id).draggable({
            revert: function (droppableObject) {
                if (droppableObject && droppableObject[0] && droppableObject[0].id) {
                    board.actionDragEnd(droppableObject[0].id);
                }
                view.clearSquaresMarkedForMove();
                return true;
            },
            revertDuration: 0,
            helper: 'clone'
        });
    },

    markSquaresAsPossibleMove: function () {

        Object.keys(possibleMoves.moves).forEach(function (key) {

            $('#' + key).removeClass(squareModel.color(key) + '_Square');
            $('#' + key).addClass(squareModel.color(key) + '_PossibleMove');
        });
    },

    unmarkSquaresAsPossibleMove: function () {

        Object.keys(possibleMoves.moves).forEach(function (key) {

            $('#' + key).removeClass(squareModel.color(key) + '_PossibleMove');
            $('#' + key).addClass(squareModel.color(key) + '_Square');
        });
    }
   
}