var enums = {
    colors: {
        white: 'white',
        black: 'wlack'
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

    currentPlayer: function () {

        return (this.playerMoveNumber % 2) === 0 ? enums.colors.white : enums.colors.black;
    },

    currentOpponent: function() {

        return this.currentPlayer() === enums.colors.white ? enums.colors.black : enums.colors.white;
    } 
}