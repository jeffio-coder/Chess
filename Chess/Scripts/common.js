var common = {

    squareModel: {},
    inCheck: false,

    colors: {
        white: 'white',
        black: 'black'
    },

    specialMoves: {
        none: '',
        enPassant: 'enPassant',
        castleKing: 'castleKing',
        castleQueen: 'castleQueen'
},

    pieces: {
        king: 'K',
        queen: 'Q',
        rook: 'R',
        knight: 'N',
        bishop: 'B',
        pawn: 'P'
    },

    pieceIds: {
        none: '',
        whiteKing: 'WK',
        blackKing: 'BK',
        whiteKingsRook: 'WKR',
        blackKingsRook: 'BKR',
        whiteQueensRook: 'WQR',
        blackQueensRook: 'BQR'
    },

    getRank: function(squareId) {

        return parseInt(squareId.substring(0, 1));
    },

    getFile: function (squareId) {

        return parseInt(squareId.substring(1, 2));
    },

    stopWatch: function () {

        var startTime = 0.0;
        var stopTime = 0.0;

        var start = function ()  {

            startTime = new Date().getTime();
        };

        var stop = function () {

            stopTime = new Date().getTime();
        };

        var elapsedTime = function () {

            return stopTime - this.startTime;
        };

        var reset = function () {

            startTime = 0.0;
            stopTime = 0.0;
        };

        var currentTime = function () {

            return startTime === 0.0 ? 0.0 : new Date().getTime() - startTime;
        };

        return {
            start: function () { return start(); },
            stop: function () { return stop(); },
            elapsedTime: function () { elapsedTime(); },
            reset: function () { return reset(); },
            currentTime: function () { return currentTime(); }
        }
    }
}