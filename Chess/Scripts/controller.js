var controller = {
    squareDivIdStart: 'square',
    squareDimension: 0,
    maxDimension: 0
};

// ToDo
//
// on mouse down check color
// Drop
// Update model
// Switch colors
// Clear en passant
// Redraw
//
// Refactor/Document
// castle
// captures
// en passant capture
// Promote
// check for check

var playerMoveNumber = 0;

$(document).ready(function () {

    controller.maxDimension = window.innerHeight < window.innerWidth ? innerHeight : innerWidth;

    // Make the maxDimension two thirds of the page.
    controller.maxDimension = Math.floor(controller.maxDimension * 0.66666);

    // Make the maxDimension divisible by 8.
    controller.maxDimension += 8 - (controller.maxDimension % 8);

    controller.squareDimension = controller.maxDimension / 8;

    $('#mainBoard').width(controller.maxDimension);
    $('#mainBoard').height(controller.maxDimension);


    model.squaresModel = model.getSquaresModel();
    model.piecesModel = model.getPiecesModel();

    $('#mainBoard').html(view.actionPaintBoardFromModel(playerColor()));

    $('.gameSquare').mousedown(function (event) {

        if (event.which === 1)
            showPossibleMoves(this.id);
    });

    $('.gameSquare').mouseup(function (event) {
        clearSquaresMarkedForMove();
    });
});

function showPossibleMoves(id) {
    var squareAllProperties = utilities.getAllSquareProperties(0, 0, id);

    if (squareAllProperties.pieceId !== '')
        view.actionShowPossibleMoves(squareAllProperties);
};

function clearSquaresMarkedForMove() {
    view.actionClearSquaresMarkedForMove();
    model.possibleMoves = [];
    view.actionPaintBoardFromModel(playerColor());
};

function playerColor() {
    if ((playerMoveNumber % 2) === 0)
        return 'white';
    else
        return 'black';
};