var globals = {
    colors: {
        white: 'white',
        black: 'black'
    },

    specialMoves: {
        none: '',
        enPassant: 'enPassant',
        castleKing: 'castleKing',
        castleQueen: 'castleQueen'
    }
}

var common = {
    
    playerMoveNumber: 0,

    getRank: function(squareId) {

        return parseInt(squareId.substring(0, 1));
    },

    getFile: function (squareId) {

        return parseInt(squareId.substring(1, 2));
    },

    currentPlayer: function () {

        return (this.playerMoveNumber % 2) === 0 ? globals.colors.white : globals.colors.black;
    },

    currentOpponent: function() {

        return this.currentPlayer() === globals.colors.white ? globals.colors.black : globals.colors.white;
    } 
}