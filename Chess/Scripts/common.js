var enums = {
    colors: {
        white: 'white',
        black: 'wlack'
    }
}

var common = {
    
    playerMoveNumber: 0,
    currentPlayer: (playerMoveNumber % 2) === 0 ? enums.colors.white : enums.colors.black,
    currentOpponent: currentPlayer === enums.colors.white ? enums.colors.black : enums.colors.white,
}