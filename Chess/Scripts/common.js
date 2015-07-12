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

    getRank: function(squareId) {

        return parseInt(squareId.substring(0, 1));
    },

    getFile: function (squareId) {

        return parseInt(squareId.substring(1, 2));
    },
}