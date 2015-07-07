var enums = {
    colors: {
        white: 'white',
        black: 'black'
    }
}

var common = {
    
    playerMoveNumber: 0,

    colorCurrentlyPlaying: function () {

        if ((this.playerMoveNumber % 2) === 0)
            return enums.colors.white;
        else
            return enums.colors.black;
    },

    idFromRankFile: function (rank, file) {
        return rank.toString() + file.toString();
    }
}