var controller = {
    squareDivIdStart: 'square',
    squareDimension: 0,
    maxDimension: 0
};

// ToDo
//
// stop ??????????????????
// filters
// captures
// Update model
// Switch colors
// Clear en passant
// Redraw
// IIS
//
// castle
// en passant capture
// Promote
// check for check
// Fen
// Unit tests; QUnit, Jasmine
// Error Handling
// Refactor/Document

//ui-widget-content

var playerMoveNumber = 0;

$(document).ready(function () {

    controller.maxDimension = window.innerHeight < window.innerWidth ? innerHeight : innerWidth;

    // Make the maxDimension two thirds of the page.
    controller.maxDimension = Math.floor(controller.maxDimension * (2 / 3));

    // Make the maxDimension divisible by 8.
    controller.maxDimension += 8 - (controller.maxDimension % 8);

    controller.squareDimension = controller.maxDimension / 8;

    $('#mainBoard').width(controller.maxDimension);
    $('#mainBoard').height(controller.maxDimension);

    model.squaresModel = model.getSquaresModel();
    model.piecesModel = model.getPiecesModel();

    $('#draggable').draggable();

    $('#mainBoard').html(view.actionPaintBoardFromModel(playerColor()));

    for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {
        
        for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

            var allProperties = common.getAllSquareProperties(rankIndex, fileIndex);

            if (allProperties.pieceId !== '') {
                
                $('#' + allProperties.squareId).draggable({
                    revert: function (droppableObject) {
                        if (droppableObject && droppableObject[0] && droppableObject[0].id) {
                            view.actionClearSquaresMarkedForMove();
                            clearSquaresMarkedForMove(droppableObject[0].id);
                        }
                        return true;
                    },
                    revertDuration: 0,
                    snapTolerance: 0,
                    helper: 'clone'
                });
            }

            $('#' + allProperties.squareId).droppable();
        }
    }


    $('.gameSquare').mousedown(function (event) {

        if (event.which === 1) {

            model.mouseDown.squareAllProperties = common.getAllSquareProperties(common.getRankAndFileFileFromId(this.id).rank, common.getRankAndFileFileFromId(this.id).file);
            $('#' + model.mouseDown.squareAllProperties.squareId).addClass('squareMoving');

            if (model.mouseDown.squareAllProperties.pieceColor === playerColor()) 
                handleMouseDown();
        }
    });

    $('.gameSquare').mouseup(function (event) {
        view.actionClearSquaresMarkedForMove();
    });
});

function handleMouseDown() {
    
    if (model.mouseDown.squareAllProperties.pieceId !== '')
        view.actionShowPossibleMoves();
};

function clearSquaresMarkedForMove(id) {

    if (id) {
        
        model.possibleMovesModel = {};
        view.actionPaintBoardFromModel(playerColor());
    }
};

function playerColor() {

    if ((playerMoveNumber % 2) === 0)
        return 'white';
    else
        return 'black';
};