var view = {
    actionPaintBoardFromModel: function() {

        for (var rankIndex = 8; rankIndex >= 1; rankIndex--) {

            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                id = rankIndex.toString() + fileIndex.toString();

                $('#' + id).removeClass();
                $('#' + id).removeAttr('style');

                $('#' + id).width(common.squareDimension);
                $('#' + id).height(common.squareDimension);
                $('#' + id).addClass('gameSquare ' + view.utils.getClassNameFromSquareModel(rankIndex, fileIndex));
                $('#' + id).droppable();

                if (model.squaresModel[id].piece !== '')
                    view.utils.setDraggable(id);
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

    actionClearSquaresMarkedForMove: function () {

        view.utils.unmarkSquaresAsPossibleMove();

        if (model.mouseDownModel.squareAllProperties !== {} && model.mouseDownModel.squareAllProperties.squareId) {

            $('#' + model.mouseDownModel.squareAllProperties.squareId).removeClass('squareMoving');
        }
    },

    utils: {

        getClassNameFromSquareModel: function (rank, file) {

            var squareAllProperties = common.getAllSquareProperties(rank, file);

            if (squareAllProperties.pieceId === '')
                return squareAllProperties.squareColor + 'Empty';
            else
                return squareAllProperties.pieceColor + '_' + squareAllProperties.pieceType + '_on_' + squareAllProperties.squareColor;
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