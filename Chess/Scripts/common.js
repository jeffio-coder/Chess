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

    stopWatch: {

        startTime: 0.0,
        stopTime: 0.0,

        start: function() {

            this.startTime = new Date().getTime();
        },

        stop: function () {
            //var d = new Date();
            //var n = d.getTime();
            this.stopTime = new Date().getTime();
        },

        elapsedTime: function() {

            return this.stopTime - this.startTime;
        },

        reset: function() {

            this.startTime = 0.0;
            this.stopTime = 0.0;
        }

    }
}