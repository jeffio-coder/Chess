var view = {

    squareDimension: 0,

    actionSetUpBoardSize: function() {

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
    },

    actionPaintBoardFromModel: function() {

        var squareId = '';

        for (var rankIndex = 8; rankIndex >= 1; rankIndex--) {

            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                squareId = common.idFromRankFile(rankIndex.toString(), fileIndex.toString());

                $('#' + squareId).removeClass();
                $('#' + squareId).removeAttr('style');

                $('#' + squareId).width(this.squareDimension);
                $('#' + squareId).height(this.squareDimension);
                $('#' + squareId).addClass('gameSquare ' + view.utils.getClassNameFromSquareModel(rankIndex, fileIndex));
                $('#' + squareId).droppable();

                if (model.squaresModel[squareId].piece !== '')
                    view.utils.setDraggable(squareId);
            }
        }


        $('[id^=capturePiece]').removeClass();
        var counterTop = 0;
        var counterBottom = 0;

        Object.keys(model.piecesModel).forEach(function (key) {

            if (model.piecesModel[key].captured) {

                if (common.colorCurrentlyPlaying() === model.piecesModel[key].color)  // The captured piece should go on the top because the color playing is at the bottom.
                    $('#capturePieceTop' + (++counterTop).toString()).addClass(model.piecesModel[key].color + '_' + model.piecesModel[key].pieceType);
                else 
                    $('#capturePieceBottom' + (++counterBottom).toString()).addClass(model.piecesModel[key].color + '_' + model.piecesModel[key].pieceType);
            }
        });
    },

    actionShowPossibleMoves: function () {
        view.utils.markSquaresAsPossibleMove();
    },

    actionSquareMovingSetClass: function (divId) {

        $('#' + divId).addClass('squareMoving');
    },

    actionClearSquaresMarkedForMove: function () {

        view.utils.unmarkSquaresAsPossibleMove();

        if (possibleMoves.squareId !== '') {

            $('#' + possibleMoves.squareId).removeClass('squareMoving');
        }
    },

    utils: {

        getClassNameFromSquareModel: function (rank, file) {

            var squareId = common.idFromRankFile(rank, file);

            if (model.squaresModel[squareId].piece === '')
                return model.squaresModel[squareId].color + 'Empty';

            var pieceId = model.squaresModel[squareId].piece;
            return model.piecesModel[pieceId].color + '_' + model.piecesModel[pieceId].pieceType + '_on_' + model.squaresModel[squareId].color;
        },

        setDraggable: function (id) {

            $('#' + id).draggable({
                revert: function (droppableObject) {
                    if (droppableObject && droppableObject[0] && droppableObject[0].id) {
                        board.handlePostDrag(droppableObject[0].id);
                    }
                    view.actionClearSquaresMarkedForMove();
                    return true;
                },
                revertDuration: 0,
                helper: 'clone'
            });
        },

        markSquaresAsPossibleMove: function () {

            $.each(model.possibleMovesModel, function (key, value) {
                $('#' + key).addClass('possibleMove');
            });
        },

        unmarkSquaresAsPossibleMove: function () {

            Object.keys(model.possibleMovesModel).forEach(function (key) {
                $('#' + key).removeClass('possibleMove');
            });
        }
    }
}