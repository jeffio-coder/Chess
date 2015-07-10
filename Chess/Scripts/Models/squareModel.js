﻿var squareModel = {
    squares:
    {
        'squareId':
        {
            'color': '',
            'pieceId': ''
        }
    },

    statusOpen: 'open',
    statusPlayerOccupied: 'occupiedByPlayer',
    statusOpponentOccupied: 'occupiedByOpponent',

    // For the sake of speed, there is no argument checking done.
    // The functions below assume that if arguments.length === 1, a valid squareId is passed. 
    // Otherwise, a valid rank and file have been passed.
    // Since this isn't publc code or non-deterministic code, that should be a safe assumtion.

    exists: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        return this.squares[squareId];
    },

    color: function () {

        return arguments.length > 1 ? this.squares[arguments[0].toString() + arguments[1].toString()].color : this.squares[arguments[0]].color;
    },

    pieceId: function () {

        return arguments.length > 1 ? this.squares[arguments[0].toString() + arguments[1].toString()].pieceId : this.squares[arguments[0]].pieceId;
    },

    pieceType: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        return this.pieceId(squareId) === '' ? '' : pieceModel.pieces[this.pieceId(squareId)].pieceType;
    },

    pieceColor: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        return this.pieceId(squareId) === '' ? '' : pieceModel.pieces[this.pieceId(squareId)].color;
    },

    pieceHasMoved: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        return this.pieceId(squareId) === '' ? false : pieceModel.pieces[this.pieceId(squareId)].hasMoved;
    },

    pieceEnPassantEligible: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        return this.pieceId(squareId) === '' ? false : pieceModel.pieces[this.pieceId(squareId)].enPassantEligible;
    },

    pieceOnSquare: function() {
        
        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        return this.pieceId(squareId) === '' ? false : pieceModel.pieces[this.pieceId(squareId)];
    },

    squareStatus: function () {

        var squareId = arguments.length > 1 ? arguments[0].toString() + arguments[1].toString() : arguments[0];

        return this.pieceId(squareId) === '' ? this.statusOpen :
            this.pieceColor(squareId) === common.currentPlayer() ? this.statusPlayerOccupied : this.statusOpponentOccupied;
    }
}