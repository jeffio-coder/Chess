var requests = {
    playerMoveNumber: 0,
    gameOver: false,
    currentPlayer: '',
    currentOpponent: '',

    setGameOver: function() {

        this.gameOver = true;
    },

    getSquaresAndPieces: function() {
        var squaresAndPieces = {
            squares: {
                '81': { 'color': 'white', 'pieceId': 'BQR', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '82': { 'color': 'black', 'pieceId': 'BQN', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '83': { 'color': 'white', 'pieceId': 'BQB', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '84': { 'color': 'black', 'pieceId': 'BQ', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '85': { 'color': 'white', 'pieceId': 'BK', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '86': { 'color': 'black', 'pieceId': 'BKB', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '87': { 'color': 'white', 'pieceId': 'BKN', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '88': { 'color': 'black', 'pieceId': 'BKR', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },

                '71': { 'color': 'black', 'pieceId': 'BP1', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '72': { 'color': 'white', 'pieceId': 'BP2', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '73': { 'color': 'black', 'pieceId': 'BP3', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '74': { 'color': 'white', 'pieceId': 'BP4', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '75': { 'color': 'black', 'pieceId': 'BP5', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '76': { 'color': 'white', 'pieceId': 'BP6', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '77': { 'color': 'black', 'pieceId': 'BP7', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '78': { 'color': 'white', 'pieceId': 'BP8', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },

                '61': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '62': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '63': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '64': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '65': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '66': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '67': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '68': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },

                '51': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '52': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '53': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '54': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '55': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '56': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '57': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '58': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },

                '41': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '42': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '43': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '44': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '45': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '46': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '47': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '48': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },

                '31': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '32': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '33': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '34': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '35': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '36': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '37': { 'color': 'black', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '38': { 'color': 'white', 'pieceId': '', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },

                '21': { 'color': 'white', 'pieceId': 'WP1', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '22': { 'color': 'black', 'pieceId': 'WP2', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '23': { 'color': 'white', 'pieceId': 'WP3', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '24': { 'color': 'black', 'pieceId': 'WP4', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '25': { 'color': 'white', 'pieceId': 'WP5', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '26': { 'color': 'black', 'pieceId': 'WP6', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '27': { 'color': 'white', 'pieceId': 'WP7', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '28': { 'color': 'black', 'pieceId': 'WP8', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },

                '11': { 'color': 'black', 'pieceId': 'WQR', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '12': { 'color': 'white', 'pieceId': 'WQN', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '13': { 'color': 'black', 'pieceId': 'WQB', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '14': { 'color': 'white', 'pieceId': 'WQ', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '15': { 'color': 'black', 'pieceId': 'WK', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '16': { 'color': 'white', 'pieceId': 'WKB', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '17': { 'color': 'black', 'pieceId': 'WKN', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} },
                '18': { 'color': 'white', 'pieceId': 'WKR', frontVector: {}, rearVector: {}, leftVector: {}, rightVector: {}, frontLeftVector: {}, frontRightVector: {}, rearLeftVector: {}, rearRightVector: {}, knightVector: {}, kingVector: {}, possibleMoves: {}, squaresAttackedBySquare: {}, squaresAttackedBySquareButBlocked: {}, attackedByPlayer: {}, attackedByPlayerButBlocked: {}, attackedByOpponent: {}, attackedByOpponentButBlocked: {} }
            },
            pieces: {
                'WQR': { 'type': 'R', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WQN': { 'type': 'N', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WQB': { 'type': 'B', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WQ': { 'type': 'Q', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WK': { 'type': 'K', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WKB': { 'type': 'B', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WKN': { 'type': 'N', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WKR': { 'type': 'R', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WP1': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WP2': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WP3': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WP4': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WP5': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WP6': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WP7': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'WP8': { 'type': 'P', 'color': 'white', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },

                'BQR': { 'type': 'R', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BQN': { 'type': 'N', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BQB': { 'type': 'B', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BQ': { 'type': 'Q', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BK': { 'type': 'K', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BKB': { 'type': 'B', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BKN': { 'type': 'N', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BKR': { 'type': 'R', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BP1': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BP2': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BP3': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BP4': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BP5': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BP6': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BP7': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false },
                'BP8': { 'type': 'P', 'color': 'black', 'hasMoved': false, 'captured': false, 'enPassantEligible': false }
            }
        };

        var rank = 0, file = 0, outerSquareId = '';

        for (var rankOuter = 1; rankOuter <= 8; rankOuter++) {
            for (var fileOuter = 1; fileOuter <= 8; fileOuter++) {

                outerSquareId = rankOuter.toString() + fileOuter.toString();

                for (rank = rankOuter + 1; rank <= 8; rank++) { squaresAndPieces.squares[outerSquareId].frontVector[rank.toString() + fileOuter.toString()] = ''; }

                for (rank = rankOuter - 1; rank >= 1; rank--) { squaresAndPieces.squares[outerSquareId].rearVector[rank.toString() + fileOuter.toString()] = ''; }

                for (file = fileOuter - 1; file >= 1; file--) { squaresAndPieces.squares[outerSquareId].leftVector[rankOuter.toString() + file.toString()] = ''; }

                for (file = fileOuter + 1; file <= 8; file++) { squaresAndPieces.squares[outerSquareId].rightVector[rankOuter.toString() + file.toString()] = ''; }

                rank = rankOuter + 1, file = fileOuter - 1;
                while (rank <= 8 && file >= 1) {
                    
                    squaresAndPieces.squares[outerSquareId].frontLeftVector[rank.toString() + file.toString()] = '';
                    rank++, file--;
                }

                rank = rankOuter + 1, file = fileOuter + 1;
                while (rank <= 8 && file <= 8) {

                    squaresAndPieces.squares[outerSquareId].frontRightVector[rank.toString() + file.toString()] = '';
                    rank++, file++;
                }

                rank = rankOuter - 1, file = fileOuter - 1;
                while (rank >= 1 && file >= 1) {

                    squaresAndPieces.squares[outerSquareId].rearLeftVector[rank.toString() + file.toString()] = '';
                    rank--, file--;
                }

                rank = rankOuter - 1, file = fileOuter + 1;
                while (rank >= 1 && file <= 8) {

                    squaresAndPieces.squares[outerSquareId].rearRightVector[rank.toString() + file.toString()] = '';
                    rank--, file++;
                }


                if (rankOuter + 1 <= 8) {

                    if (fileOuter - 2 >= 1) squaresAndPieces.squares[outerSquareId].knightVector[(rankOuter + 1).toString() + (fileOuter - 2).toString()] = '';
                    if (fileOuter + 2 <= 8) squaresAndPieces.squares[outerSquareId].knightVector[(rankOuter + 1).toString() + (fileOuter + 2).toString()] = '';

                    if (rankOuter + 2 <= 8) {

                        if (fileOuter - 1 >= 1) squaresAndPieces.squares[outerSquareId].knightVector[(rankOuter + 2).toString() + (fileOuter - 1).toString()] = '';
                        if (fileOuter + 1 <= 8) squaresAndPieces.squares[outerSquareId].knightVector[(rankOuter + 2).toString() + (fileOuter + 1).toString()] = '';
                    }
                }

                if (rankOuter - 1 >= 1) {

                    if (fileOuter - 2 >= 1) squaresAndPieces.squares[outerSquareId].knightVector[(rankOuter - 1).toString() + (fileOuter - 2).toString()] = '';
                    if (fileOuter + 2 <= 8) squaresAndPieces.squares[outerSquareId].knightVector[(rankOuter - 1).toString() + (fileOuter + 2).toString()] = '';

                    if (rankOuter - 2 >= 1) {

                        if (fileOuter - 1 >= 1) squaresAndPieces.squares[outerSquareId].knightVector[(rankOuter - 2).toString() + (fileOuter - 1).toString()] = '';
                        if (fileOuter + 1 <= 8) squaresAndPieces.squares[outerSquareId].knightVector[(rankOuter - 2).toString() + (fileOuter + 1).toString()] = '';
                    }
                }

                if (rankOuter <= 7 && fileOuter >= 2) squaresAndPieces.squares[outerSquareId].kingVector[(rankOuter + 1).toString() + (fileOuter - 1).toString()] = '';
                if (rankOuter <= 7) squaresAndPieces.squares[outerSquareId].kingVector[(rankOuter + 1).toString() + fileOuter.toString()] = '';
                if (rankOuter <= 7 && fileOuter <= 7) squaresAndPieces.squares[outerSquareId].kingVector[(rankOuter + 1).toString() + (fileOuter + 1).toString()] = '';

                if (fileOuter >= 2) squaresAndPieces.squares[outerSquareId].kingVector[rankOuter.toString() + (fileOuter - 1).toString()] = '';
                if (fileOuter <= 7) squaresAndPieces.squares[outerSquareId].kingVector[rankOuter.toString() + (fileOuter + 1).toString()] = '';

                if (rankOuter >= 2 && fileOuter >= 2) squaresAndPieces.squares[outerSquareId].kingVector[(rankOuter - 1).toString() + (fileOuter - 1).toString()] = '';
                if (rankOuter >= 2) squaresAndPieces.squares[outerSquareId].kingVector[(rankOuter - 1).toString() + fileOuter.toString()] = '';
                if (rankOuter >= 2 && fileOuter <= 7) squaresAndPieces.squares[outerSquareId].kingVector[(rankOuter - 1).toString() + (fileOuter + 1).toString()] = '';
            }
        }
        return squaresAndPieces;
    }
}