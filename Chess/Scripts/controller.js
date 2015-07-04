// ToDo
//
// captures
// filters
// Clear en passant
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

$(document).ready(function () {
    $.ajaxSetup({
        cache: false
    });

    board.initialize();
});

var board = {
    maxDimension: 0,
    playerMoveNumber: 0,

    initialize: function() {
        
        this.maxDimension = window.innerHeight < window.innerWidth ? innerHeight : innerWidth;

        // Make the maxDimension two thirds of the page.
        this.maxDimension = Math.floor(this.maxDimension * (2 / 3));

        // Make the maxDimension divisible by 8.
        this.maxDimension += 8 - (this.maxDimension % 8);

        common.squareDimension = this.maxDimension / 8;

        $('#mainBoard').width(this.maxDimension);
        $('#mainBoard').height(this.maxDimension);

        model.squaresModel = utils.getSquaresModel();
        model.piecesModel = utils.getPiecesModel();

        $('#mainBoard').html(view.actionPaintBoardFromModel());
        utils.setDragAndDroppable();

        $('.gameSquare').mousedown(function (event) {
            board.handleMouseDown(event, this);
        });

        // This will only fire if there is no drag event.
        $('.gameSquare').mouseup(function(event) {
            board.handlePostDrag();
        });
    },
     
    handleMouseDown: function (event, div) {

        if (event.which === 1) {

            model.mouseDownModel.squareAllProperties = common.getAllSquareProperties(utils.getRankAndFileFileFromId(div.id).rank, utils.getRankAndFileFileFromId(div.id).file);
            $('#' + div.id).addClass('squareMoving');

            if (model.mouseDownModel.squareAllProperties.pieceColor === utils.playerColor() && model.mouseDownModel.squareAllProperties.pieceId !== '')
                view.actionShowPossibleMoves();
        }
    },
   
    handlePostDrag: function (id) {

        view.actionClearSquaresMarkedForMove();

        if (id && model.possibleMovesModel[id] !== false) {

            utils.movePieceToNewSquare(model.mouseDownModel.squareAllProperties.squareId, id);
            this.playerMoveNumber++;
            utils.reverseSquaresModelForPlayerColor();
            $('#mainBoard').html(view.actionPaintBoardFromModel());
            utils.setDragAndDroppable();
            board.initialize();
        }

        model.possibleMovesModel = {};
    }
}

var utils = {
    
    movePieceToNewSquare: function (sourceId, targetId) {

        utils.capturePiece(targetId);

        model.squaresModel[targetId].piece = model.squaresModel[sourceId].piece;
        model.piecesModel[model.squaresModel[sourceId].piece].hasMoved = true;
        model.squaresModel[sourceId].piece = '';
    },

    capturePiece: function(id) {
        
    },

    getSquaresModel: function () {
        return {
            '81': { 'color': 'white', 'piece': 'BQR' },
            '82': { 'color': 'black', 'piece': 'BQN' },
            '83': { 'color': 'white', 'piece': 'BQB' },
            '84': { 'color': 'black', 'piece': 'BQ1' },
            '85': { 'color': 'white', 'piece': 'BK' },
            '86': { 'color': 'black', 'piece': 'BKB' },
            '87': { 'color': 'white', 'piece': 'BKN' },
            '88': { 'color': 'black', 'piece': 'BKR' },

            '71': { 'color': 'black', 'piece': 'BP1' },
            '72': { 'color': 'white', 'piece': 'BP2' },
            '73': { 'color': 'black', 'piece': 'BP3' },
            '74': { 'color': 'white', 'piece': 'BP4' },
            '75': { 'color': 'black', 'piece': 'BP5' },
            '76': { 'color': 'white', 'piece': 'BP6' },
            '77': { 'color': 'black', 'piece': 'BP7' },
            '78': { 'color': 'white', 'piece': 'BP8' },

            '61': { 'color': 'white', 'piece': '' },
            '62': { 'color': 'black', 'piece': '' },
            '63': { 'color': 'white', 'piece': '' },
            '64': { 'color': 'black', 'piece': '' },
            '65': { 'color': 'white', 'piece': '' },
            '66': { 'color': 'black', 'piece': '' },
            '67': { 'color': 'white', 'piece': '' },
            '68': { 'color': 'black', 'piece': '' },

            '51': { 'color': 'black', 'piece': '' },
            '52': { 'color': 'white', 'piece': '' },
            '53': { 'color': 'black', 'piece': '' },
            '54': { 'color': 'white', 'piece': '' },
            '55': { 'color': 'black', 'piece': '' },
            '56': { 'color': 'white', 'piece': '' },
            '57': { 'color': 'black', 'piece': '' },
            '58': { 'color': 'white', 'piece': '' },

            '41': { 'color': 'white', 'piece': '' },
            '42': { 'color': 'black', 'piece': '' },
            '43': { 'color': 'white', 'piece': '' },
            '44': { 'color': 'black', 'piece': '' },
            '45': { 'color': 'white', 'piece': '' },
            '46': { 'color': 'black', 'piece': '' },
            '47': { 'color': 'white', 'piece': '' },
            '48': { 'color': 'black', 'piece': '' },

            '31': { 'color': 'black', 'piece': '' },
            '32': { 'color': 'white', 'piece': '' },
            '33': { 'color': 'black', 'piece': '' },
            '34': { 'color': 'white', 'piece': '' },
            '35': { 'color': 'black', 'piece': '' },
            '36': { 'color': 'white', 'piece': '' },
            '37': { 'color': 'black', 'piece': '' },
            '38': { 'color': 'white', 'piece': '' },

            '21': { 'color': 'white', 'piece': 'WP1' },
            '22': { 'color': 'black', 'piece': 'WP2' },
            '23': { 'color': 'white', 'piece': 'WP3' },
            '24': { 'color': 'black', 'piece': 'WP4' },
            '25': { 'color': 'white', 'piece': 'WP5' },
            '26': { 'color': 'black', 'piece': 'WP6' },
            '27': { 'color': 'white', 'piece': 'WP7' },
            '28': { 'color': 'black', 'piece': 'WP8' },

            '11': { 'color': 'black', 'piece': 'WQR' },
            '12': { 'color': 'white', 'piece': 'WQN' },
            '13': { 'color': 'black', 'piece': 'WQB' },
            '14': { 'color': 'white', 'piece': 'WQ1' },
            '15': { 'color': 'black', 'piece': 'WK' },
            '16': { 'color': 'white', 'piece': 'WKB' },
            '17': { 'color': 'black', 'piece': 'WKN' },
            '18': { 'color': 'white', 'piece': 'WKR' }
        };
    },

    getPiecesModel: function () {
        return {
            'WQR': { 'pieceType': 'R', 'color': 'white', 'hasMoved': false },
            'WQN': { 'pieceType': 'N', 'color': 'white', 'hasMoved': false },
            'WQB': { 'pieceType': 'B', 'color': 'white', 'hasMoved': false },
            'WQ1': { 'pieceType': 'Q', 'color': 'white', 'hasMoved': false },
            'WK': { 'pieceType': 'K', 'color': 'white', 'hasMoved': false },
            'WKB': { 'pieceType': 'B', 'color': 'white', 'hasMoved': false },
            'WKN': { 'pieceType': 'N', 'color': 'white', 'hasMoved': false },
            'WKR': { 'pieceType': 'R', 'color': 'white', 'hasMoved': false },
            'WP1': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP2': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP3': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP4': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP5': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP6': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP7': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
            'WP8': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },

            'BQR': { 'pieceType': 'R', 'color': 'black', 'hasMoved': false },
            'BQN': { 'pieceType': 'N', 'color': 'black', 'hasMoved': false },
            'BQB': { 'pieceType': 'B', 'color': 'black', 'hasMoved': false },
            'BQ1': { 'pieceType': 'Q', 'color': 'black', 'hasMoved': false },
            'BK': { 'pieceType': 'K', 'color': 'black', 'hasMoved': false },
            'BKB': { 'pieceType': 'B', 'color': 'black', 'hasMoved': false },
            'BKN': { 'pieceType': 'N', 'color': 'black', 'hasMoved': false },
            'BKR': { 'pieceType': 'R', 'color': 'black', 'hasMoved': false },
            'BP1': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP2': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP3': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP4': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP5': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP6': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP7': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
            'BP8': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false }
        };
    },

    setDragAndDroppable: function () {

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {

            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                var allProperties = common.getAllSquareProperties(rankIndex, fileIndex);

                if (allProperties.pieceId !== '') {

                    $('#' + allProperties.squareId).draggable({
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
                }

                $('#' + allProperties.squareId).droppable();
            }
        }

    },

    reverseSquaresModelForPlayerColor: function () {

        var id = '';
        var reverseRank = 0;
        var reverseFile = 0;
        var reverseId = '';
        var newSquaresModel = {};

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {

            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                id = rankIndex.toString() + fileIndex.toString();
                reverseRank = 9 - rankIndex;
                reverseFile = 9 - fileIndex;
                reverseId = reverseRank.toString() + reverseFile.toString();

                newSquaresModel[reverseId] = { color: model.squaresModel[id].color, piece: model.squaresModel[id].piece };
            }
        }

        model.squaresModel = newSquaresModel;
    },

    getRankAndFileFileFromId: function (id) {
        return { 'rank': parseInt(id.substring(0, 1)), 'file': parseInt(id.substring(1, 2)) };
    },

    playerColor: function () {

        if ((board.playerMoveNumber % 2) === 0)
            return 'white';
        else
            return 'black';
    }
}






//var playerMoveNumber = 0;

//$(document).ready(function () {

//    controller.maxDimension = window.innerHeight < window.innerWidth ? innerHeight : innerWidth;

//    // Make the maxDimension two thirds of the page.
//    controller.maxDimension = Math.floor(controller.maxDimension * (2 / 3));

//    // Make the maxDimension divisible by 8.
//    controller.maxDimension += 8 - (controller.maxDimension % 8);

//    common.squareDimension = controller.maxDimension / 8;

//    $('#mainBoard').width(controller.maxDimension);
//    $('#mainBoard').height(controller.maxDimension);

//    model.squaresModel = getSquaresModel();
//    model.piecesModel = getPiecesModel();

//    $('#mainBoard').html(view.actionPaintBoardFromModel(playerColor()));
//    setDragAndDroppable();

//    $('.gameSquare').mousedown(function (event) {
//        handleMouseDown(event, this);
//    });

//    // This will only fire if there is no drag event.
//    $('.gameSquare').mouseup(function(event) {
//        handlePostDrag();
//    });
//});

//function handleMouseDown(event, div) {

//    if (event.which === 1) {

//        model.mouseDownModel.squareAllProperties = common.getAllSquareProperties(getRankAndFileFileFromId(div.id).rank, getRankAndFileFileFromId(div.id).file);
//        $('#' + div.id).addClass('squareMoving');

//        if (model.mouseDownModel.squareAllProperties.pieceColor === playerColor() && model.mouseDownModel.squareAllProperties.pieceId !== '')
//            view.actionShowPossibleMoves();
//    }
//};

//function handlePostDrag(id) {

//    view.actionClearSquaresMarkedForMove();

//    if (id && model.possibleMovesModel[id] !== false) {

//        movePieceToNewSquare(model.mouseDownModel.squareAllProperties.squareId, id);
//        playerMoveNumber++;
//        reverseSquaresModelForPlayerColor();
//        $('#mainBoard').html(view.actionPaintBoardFromModel(playerColor()));
//        setDragAndDroppable();
//    }

//    model.possibleMovesModel = {};
//};

//function playerColor() {

//    if ((playerMoveNumber % 2) === 0)
//        return 'white';
//    else
//        return 'black';
//};

//function setDragAndDroppable() {

//    for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {

//        for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

//            var allProperties = common.getAllSquareProperties(rankIndex, fileIndex);

//            if (allProperties.pieceId !== '') {

//                $('#' + allProperties.squareId).draggable({
//                    revert: function (droppableObject) {
//                        if (droppableObject && droppableObject[0] && droppableObject[0].id) {
//                            handlePostDrag(droppableObject[0].id);
//                        }
//                        view.actionClearSquaresMarkedForMove();
//                        return true;
//                    },
//                    revertDuration: 0,
//                    helper: 'clone'
//                });
//            }

//            $('#' + allProperties.squareId).droppable();
//        }
//    }

//};

//function movePieceToNewSquare(sourceId, targetId) {
    
//    capturePiece(targetId);

//    model.squaresModel[targetId].piece = model.squaresModel[sourceId].piece;
//    model.piecesModel[model.squaresModel[sourceId].piece].hasMoved = true;
//    model.squaresModel[sourceId].piece = '';
//};

//function capturePiece(id) {
    
//};

//function getSquaresModel() {
//    return {
//        '81': { 'color': 'white', 'piece': 'BQR' },
//        '82': { 'color': 'black', 'piece': 'BQN' },
//        '83': { 'color': 'white', 'piece': 'BQB' },
//        '84': { 'color': 'black', 'piece': 'BQ1' },
//        '85': { 'color': 'white', 'piece': 'BK' },
//        '86': { 'color': 'black', 'piece': 'BKB' },
//        '87': { 'color': 'white', 'piece': 'BKN' },
//        '88': { 'color': 'black', 'piece': 'BKR' },

//        '71': { 'color': 'black', 'piece': 'BP1' },
//        '72': { 'color': 'white', 'piece': 'BP2' },
//        '73': { 'color': 'black', 'piece': 'BP3' },
//        '74': { 'color': 'white', 'piece': 'BP4' },
//        '75': { 'color': 'black', 'piece': 'BP5' },
//        '76': { 'color': 'white', 'piece': 'BP6' },
//        '77': { 'color': 'black', 'piece': 'BP7' },
//        '78': { 'color': 'white', 'piece': 'BP8' },

//        '61': { 'color': 'white', 'piece': '' },
//        '62': { 'color': 'black', 'piece': '' },
//        '63': { 'color': 'white', 'piece': '' },
//        '64': { 'color': 'black', 'piece': '' },
//        '65': { 'color': 'white', 'piece': '' },
//        '66': { 'color': 'black', 'piece': '' },
//        '67': { 'color': 'white', 'piece': '' },
//        '68': { 'color': 'black', 'piece': '' },

//        '51': { 'color': 'black', 'piece': '' },
//        '52': { 'color': 'white', 'piece': '' },
//        '53': { 'color': 'black', 'piece': '' },
//        '54': { 'color': 'white', 'piece': '' },
//        '55': { 'color': 'black', 'piece': '' },
//        '56': { 'color': 'white', 'piece': '' },
//        '57': { 'color': 'black', 'piece': '' },
//        '58': { 'color': 'white', 'piece': '' },

//        '41': { 'color': 'white', 'piece': '' },
//        '42': { 'color': 'black', 'piece': '' },
//        '43': { 'color': 'white', 'piece': '' },
//        '44': { 'color': 'black', 'piece': '' },
//        '45': { 'color': 'white', 'piece': '' },
//        '46': { 'color': 'black', 'piece': '' },
//        '47': { 'color': 'white', 'piece': '' },
//        '48': { 'color': 'black', 'piece': '' },

//        '31': { 'color': 'black', 'piece': '' },
//        '32': { 'color': 'white', 'piece': '' },
//        '33': { 'color': 'black', 'piece': '' },
//        '34': { 'color': 'white', 'piece': '' },
//        '35': { 'color': 'black', 'piece': '' },
//        '36': { 'color': 'white', 'piece': '' },
//        '37': { 'color': 'black', 'piece': '' },
//        '38': { 'color': 'white', 'piece': '' },

//        '21': { 'color': 'white', 'piece': 'WP1' },
//        '22': { 'color': 'black', 'piece': 'WP2' },
//        '23': { 'color': 'white', 'piece': 'WP3' },
//        '24': { 'color': 'black', 'piece': 'WP4' },
//        '25': { 'color': 'white', 'piece': 'WP5' },
//        '26': { 'color': 'black', 'piece': 'WP6' },
//        '27': { 'color': 'white', 'piece': 'WP7' },
//        '28': { 'color': 'black', 'piece': 'WP8' },

//        '11': { 'color': 'black', 'piece': 'WQR' },
//        '12': { 'color': 'white', 'piece': 'WQN' },
//        '13': { 'color': 'black', 'piece': 'WQB' },
//        '14': { 'color': 'white', 'piece': 'WQ1' },
//        '15': { 'color': 'black', 'piece': 'WK' },
//        '16': { 'color': 'white', 'piece': 'WKB' },
//        '17': { 'color': 'black', 'piece': 'WKN' },
//        '18': { 'color': 'white', 'piece': 'WKR' }
//    };
//};

//function getPiecesModel () {
//    return {
//        'WQR': { 'pieceType': 'R', 'color': 'white', 'hasMoved': false },
//        'WQN': { 'pieceType': 'N', 'color': 'white', 'hasMoved': false },
//        'WQB': { 'pieceType': 'B', 'color': 'white', 'hasMoved': false },
//        'WQ1': { 'pieceType': 'Q', 'color': 'white', 'hasMoved': false },
//        'WK': { 'pieceType': 'K', 'color': 'white', 'hasMoved': false },
//        'WKB': { 'pieceType': 'B', 'color': 'white', 'hasMoved': false },
//        'WKN': { 'pieceType': 'N', 'color': 'white', 'hasMoved': false },
//        'WKR': { 'pieceType': 'R', 'color': 'white', 'hasMoved': false },
//        'WP1': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
//        'WP2': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
//        'WP3': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
//        'WP4': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
//        'WP5': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
//        'WP6': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
//        'WP7': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },
//        'WP8': { 'pieceType': 'P', 'color': 'white', 'hasMoved': false },

//        'BQR': { 'pieceType': 'R', 'color': 'black', 'hasMoved': false },
//        'BQN': { 'pieceType': 'N', 'color': 'black', 'hasMoved': false },
//        'BQB': { 'pieceType': 'B', 'color': 'black', 'hasMoved': false },
//        'BQ1': { 'pieceType': 'Q', 'color': 'black', 'hasMoved': false },
//        'BK': { 'pieceType': 'K', 'color': 'black', 'hasMoved': false },
//        'BKB': { 'pieceType': 'B', 'color': 'black', 'hasMoved': false },
//        'BKN': { 'pieceType': 'N', 'color': 'black', 'hasMoved': false },
//        'BKR': { 'pieceType': 'R', 'color': 'black', 'hasMoved': false },
//        'BP1': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
//        'BP2': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
//        'BP3': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
//        'BP4': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
//        'BP5': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
//        'BP6': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
//        'BP7': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false },
//        'BP8': { 'pieceType': 'P', 'color': 'black', 'hasMoved': false }
//    };

//};

//function reverseSquaresModelForPlayerColor() {

//    var id = '';
//    var reverseRank = 0;
//    var reverseFile = 0;
//    var reverseId = '';
//    var newSquaresModel = {};

//    for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {

//        for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

//            id = rankIndex.toString() + fileIndex.toString();
//            reverseRank = 9 - rankIndex;
//            reverseFile = 9 - fileIndex;
//            reverseId = reverseRank.toString() + reverseFile.toString();

//            newSquaresModel[reverseId] = { color: model.squaresModel[id].color, piece: model.squaresModel[id].piece };
//        }
//    }

//    model.squaresModel = newSquaresModel;
//};

//function getRankAndFileFileFromId(id) {
//    return { 'rank': parseInt(id.substring(0, 1)), 'file': parseInt(id.substring(1, 2)) };
//};