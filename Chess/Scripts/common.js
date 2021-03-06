﻿var common = {

    squareModel: {},
    inCheck: false,
    stopWatch: {},

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

    StopWatch: function () {

        var startTime = 0;
        var stopTime = 0;

        var start = function ()  {

            startTime = new Date().getTime();
        };

        var stop = function () {

            stopTime = new Date().getTime();
        };

        var elapsedTime = function () {

            return this.stopTime - this.startTime;
        };

        var reset = function () {

            startTime = 0;
            stopTime = 0;
        };

        var currentTime = function () {

            return startTime === 0 ? 0 : new Date().getTime() - startTime;
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

var xyxyxy =
{
    squares: {
        'squareId':
        {
            'color': '',
            'pieceId': ''
        }
    },

    pieces: {
        'pieceId':
        {
            'type': '',
            'color': '',
            'hasMoved': false,
            'captured': false,
            'enPassantEligible': false
        }
    },

    frontVector: {},
    rearVector: {},
    leftVector: {},
    rightVector: {},
    frontLeftVector: {},
    frontRightVector: {},
    rearLeftVector: {},
    rearRightVector: {},
    knightVector: {},
    pawnVector: {},
    kingMoves: {},
    queenMoves: {},
    rookMoves: {},
    knightMoves: {},
    bishopMoves: {},
    pawnMoves: {},
    whiteKingMoves: {},
    blackKingMoves: {},
    possibleMoves: {},
    attacking: {},
    attackedBy: {},
    blockingAttack: {},
    blockingAttackBy: {}
};