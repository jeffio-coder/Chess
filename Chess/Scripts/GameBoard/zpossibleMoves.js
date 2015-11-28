var possibleMoves = {
    moves: {},
    squareId: '',
    forward: 1,
    backward: -1,
    left: -1,
    right: 1,
    verticalForwardMoves: {},
    verticalBackwardMoves: {},
    horitonalLeftMoves: {},
    horitonalRightMoves: {},
    diagonalForwardLeftMoves: {},
    diagonalForwardRightMoves: {},
    diagonalBackwardLeftMoves: {},
    diagonalBackwardRightMoves: {},
    kingMoves: {},
    knightMoves: {},
    pawnMoves: {},

    getMoves: function () {
        return JSON.parse(JSON.stringify(this.moves));
    },

    getKeys: function () {

        return Object.keys(this.moves);
    },

    getValue: function (movesKey) {

        if (typeof movesKey === 'number')
            return Object.keys(this.moves)[movesKey];
        else
            return this.moves[movesKey];
    },

    setValue: function (movesKey, value) {

        this.moves[movesKey] = value;
    },

    setMoves: function (value) {
        this.moves = JSON.parse(JSON.stringify(value));
    },

    deleteElement: function (movesKey) {
        
        delete this.moves[movesKey];
    },

    isPossibleMove: function (movesKey) {

        return movesKey in this.moves;
    },

    loadSquareMoves: function () {

        var squareMoves = [];
        var rank = 0;
        var file = 0;

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {
            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {
                
                squareMoves = [];
                rank = rankIndex + 1;
                while (rank <= 8) squareMoves.push((rank++).toString() + fileIndex.toString());
                this.verticalForwardMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;

                squareMoves = [];
                rank = rankIndex - 1;
                while (rank >= 1) squareMoves.push((rank--).toString() + fileIndex.toString());
                this.verticalBackwardMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;

                squareMoves = [];
                file = fileIndex + 1;
                while (file <= 8) squareMoves.push(rankIndex.toString() + (file++).toString());
                this.horitonalRightMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;

                squareMoves = [];
                file = fileIndex - 1;
                while (file >= 1) squareMoves.push(rankIndex.toString() + (file--).toString());
                this.horitonalLeftMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;

                squareMoves = [];
                rank = rankIndex + 1;
                file = fileIndex + 1;
                while (rank <= 8 && file <= 8) squareMoves.push((rank++).toString() + (file++).toString());
                this.diagonalForwardRightMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;

                squareMoves = [];
                rank = rankIndex + 1;
                file = fileIndex - 1;
                while (rank <= 8 && file >= 1) squareMoves.push((rank++).toString() + (file--).toString());
                this.diagonalForwardLeftMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;

                squareMoves = [];
                rank = rankIndex - 1;
                file = fileIndex + 1;
                while (rank >= 1 && file <= 8) squareMoves.push((rank--).toString() + (file++).toString());
                this.diagonalBackwardRightMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;

                squareMoves = [];
                rank = rankIndex - 1;
                file = fileIndex - 1;
                while (rank >= 1 && file >= 1) squareMoves.push((rank--).toString() + (file--).toString());
                this.diagonalBackwardLeftMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;

                // Load pawn moves
                squareMoves = [];
                if (rankIndex > 1 && rankIndex < 8) {
                    
                    squareMoves.push({ squareId: (rankIndex + 1).toString() + fileIndex.toString(), capture: false });
                    if (rankIndex === 2) squareMoves.push({ squareId: (rankIndex + 2).toString() + fileIndex.toString(), capture: false });
                    if (fileIndex - 1 >= 1) squareMoves.push({ squareId: (rankIndex + 1).toString() + (fileIndex - 1).toString(), capture: true });
                    if (fileIndex + 1 <= 8) squareMoves.push({ squareId: (rankIndex + 1).toString() + (fileIndex + 1).toString(), capture: true });
                }
                this.pawnMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;
            }
        }

        this.loadKingMoves();
        this.loadKnightMoves();
    },

    loadKingMoves: function () {

        var squareMoves = [];

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {
            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                squareMoves = [];

                if (rankIndex < 8 && fileIndex > 1) squareMoves.push((rankIndex + 1).toString() + (fileIndex - 1).toString());
                if (rankIndex < 8) squareMoves.push((rankIndex + 1).toString() + fileIndex.toString());
                if (rankIndex < 8 && fileIndex < 8) squareMoves.push((rankIndex + 1).toString() + (fileIndex + 1).toString());

                if (fileIndex > 1) squareMoves.push(rankIndex.toString() + (fileIndex - 1).toString());
                if (fileIndex < 8) squareMoves.push(rankIndex.toString() + (fileIndex + 1).toString());

                if (rankIndex > 1 && fileIndex > 1) squareMoves.push((rankIndex - 1).toString() + (fileIndex - 1).toString());
                if (rankIndex > 1) squareMoves.push((rankIndex - 1).toString() + fileIndex.toString());
                if (rankIndex > 1 && fileIndex < 8) squareMoves.push((rankIndex - 1).toString() + (fileIndex + 1).toString());

                this.kingMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;
            }
        }
    },

    loadKnightMoves: function() {
        
        var squareMoves = [];

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {
            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                squareMoves = [];

                if (rankIndex + 1 <= 8) {

                    if (fileIndex - 2 >= 1) squareMoves.push((rankIndex + 1).toString() + (fileIndex - 2).toString());
                    if (fileIndex + 2 <= 8) squareMoves.push((rankIndex + 1).toString() + (fileIndex + 2).toString());

                    if (rankIndex + 2 <= 8) {

                        if (fileIndex - 1 >= 1) squareMoves.push((rankIndex + 2).toString() + (fileIndex - 1).toString());
                        if (fileIndex + 1 <= 8) squareMoves.push((rankIndex + 2).toString() + (fileIndex + 1).toString());
                    }
                }

                if (rankIndex - 1 >= 1) {

                    if (fileIndex - 2 >= 1) squareMoves.push((rankIndex - 1).toString() + (fileIndex - 2).toString());
                    if (fileIndex + 2 <= 8) squareMoves.push((rankIndex - 1).toString() + (fileIndex + 2).toString());

                    if (rankIndex - 2 >= 1) {

                        if (fileIndex - 1 >= 1) squareMoves.push((rankIndex - 2).toString() + (fileIndex - 1).toString());
                        if (fileIndex + 1 <= 8) squareMoves.push((rankIndex - 2).toString() + (fileIndex + 1).toString());
                    }
                }

                this.knightMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;
            }
        }
    },

    loadPossibleMoves: function() {

        this.setMoves({});

        switch (pieceType(this.squareId)) {

            case common.pieces.king:
                this.possibleMovesForKing();
                break;
            case common.pieces.queen:
                this.possibleMovesForQueen();
                break;
            case common.pieces.rook:
                this.possibleMovesForRook();
                break;
            case common.pieces.knight:
                this.possibleMovesForKnight();
                break;
            case common.pieces.bishop:
                this.possibleMovesForBishop();
                break;
            case common.pieces.pawn:
                this.possibleMovesForPawn();
                break;
        }
    },

    possibleMovesForKing: function () {

        var targetId = '';

        for (var loopIndex = 0; loopIndex < this.kingMoves[this.squareId].length; loopIndex++) {

            targetId = this.kingMoves[this.squareId][loopIndex];

            if (squareStatus(targetId) !== statusPlayerOccupied)
                this.setValue(targetId, common.specialMoves.none);
        }

        if (common.inCheck)  // A player may not castle of of check.
            return;


        // Special code for castling.

        if (requests.currentPlayer === common.colors.white) {
            
            var whiteKing = '15';
            var whiteKingsRook = '18';
            var whiteKingsKnight = '17';
            var whiteKingsBishop = '16';
            var whiteQueensRook = '11';
            var whiteQueensKnight = '12';
            var whiteQueensBishop = '13';
            var whiteQueen = '14';

            if (this.squareId === whiteKing && !Squares().pieceHasMoved(whiteKing)) {

                if (!Squares().pieceHasMoved(whiteKingsRook)
                    &&
                    Squares().squareStatus(whiteKingsKnight) === Squares().statusOpen && !this.checkForPlayerInCheck(whiteKingsKnight)
                    &&
                    Squares().squareStatus(whiteKingsBishop) === Squares().statusOpen && !this.checkForPlayerInCheck(whiteKingsBishop)) {

                    this.setValue(whiteKingsKnight, common.specialMoves.castleKing);
                }

                if (!Squares().pieceHasMoved(whiteQueensRook)
                    &&
                    Squares().squareStatus(whiteQueensKnight) === Squares().statusOpen && !this.checkForPlayerInCheck(whiteQueensKnight)
                    &&
                    Squares().squareStatus(whiteQueensBishop) === Squares().statusOpen && !this.checkForPlayerInCheck(whiteQueensBishop)
                    &&
                    Squares().squareStatus(whiteQueen) === Squares().statusOpen && !this.checkForPlayerInCheck(whiteQueen)) {

                    this.setValue(whiteQueensBishop, common.specialMoves.castleQueen);
                }
            }
        }


        if (requests.currentPlayer === common.colors.black) {
            
            var blackKing = '14';
            var blackKingsRook = '11';
            var blackKingsKnight = '12';
            var blackKingsBishop = '13';
            var blackQueensRook = '18';
            var blackQueensKnight = '17';
            var blackQueensBishop = '16';
            var blackQueen = '15';

            if (this.squareId === blackKing && !Squares().pieceHasMoved(blackKing)) {

                if (!Squares().pieceHasMoved(blackKingsRook)
                    &&
                    Squares().squareStatus(blackKingsKnight) === Squares().statusOpen && !this.checkForPlayerInCheck(blackKingsKnight)
                    &&
                    Squares().squareStatus(blackKingsBishop) === Squares().statusOpen && !this.checkForPlayerInCheck(blackKingsBishop)) {

                    this.setValue(blackKingsKnight, common.specialMoves.castleKing);
                }

                if (!Squares().pieceHasMoved(blackQueensRook)
                    &&
                    Squares().squareStatus(blackQueensKnight) === Squares().statusOpen && !this.checkForPlayerInCheck(blackQueensKnight)
                    &&
                    Squares().squareStatus(blackQueensBishop) === Squares().statusOpen && !this.checkForPlayerInCheck(blackQueensBishop)
                    &&
                    Squares().squareStatus(blackQueen) === Squares().statusOpen && !this.checkForPlayerInCheck(blackQueen)) {

                    this.setValue(blackQueensBishop, common.specialMoves.castleQueen);
                }
            }
        }
    },

    possibleMovesForQueen: function () {

        this.possibleVerticalAndHorizonalMoves();
        this.possibleDiagonalMoves();
    },

    possibleMovesForRook: function () {

        this.possibleVerticalAndHorizonalMoves();
    },

    possibleMovesForKnight: function () {

        for (var loopIndex = 0; loopIndex < this.knightMoves[this.squareId].length; loopIndex++) {

            var targetId = this.knightMoves[this.squareId][loopIndex];

            if (Squares().squareStatus(targetId) !== Squares().statusPlayerOccupied)
                this.setValue(targetId, common.specialMoves.none);
        }
    },

    possibleMovesForBishop: function () {

        this.possibleDiagonalMoves();
    },

    possibleMovesForPawn: function () {

        // For the forward moves, the pawnMoves will be traversed one then two (if applicable). If one is blocked,
        // set a flag so two will be considered blocked.

        var targetId = '';
        var squareBehindId = '';
        var blocked = false;

        for (var loopIndex = 0; loopIndex < this.pawnMoves[this.squareId].length; loopIndex++) {

            targetId = this.pawnMoves[this.squareId][loopIndex].squareId;

            if (!this.pawnMoves[this.squareId][loopIndex].capture) {  // Move forward.

                if (Squares().squareStatus(targetId) === Squares().statusOpen) {
                    if (!blocked) this.setValue(targetId, common.specialMoves.none);
                } else {
                    blocked = true;
                }
            } else {
                if (Squares().squareStatus(targetId) === Squares().statusOpponentOccupied) {
                    this.setValue(targetId, common.specialMoves.none);
                } else {
                    squareBehindId = (common.getRank(targetId) - 1).toString() + common.getFile(targetId).toString();

                    if (Squares().pieceEnPassantEligible(squareBehindId))
                        this.setValue(targetId, common.specialMoves.enPassant);
                }
            }
        }
    },

    possibleVerticalAndHorizonalMoves: function() {

        var targetId = '';

        var moveArrays = [
            this.verticalForwardMoves[this.squareId],
            this.verticalBackwardMoves[this.squareId],
            this.horitonalLeftMoves[this.squareId],
            this.horitonalRightMoves[this.squareId]
        ];

        for (var outerLoopIndex = 0; outerLoopIndex < moveArrays.length; outerLoopIndex++) {

            for (var innerLoopIndex = 0; innerLoopIndex < moveArrays[outerLoopIndex].length; innerLoopIndex++) {

                targetId = moveArrays[outerLoopIndex][innerLoopIndex];

                if (Squares().squareStatus(targetId) === Squares().statusPlayerOccupied)
                    break;

                if (Squares().squareStatus(targetId) === Squares().statusOpponentOccupied) {
                    this.setValue(targetId, common.specialMoves.none);
                    break;
                }

                this.setValue(targetId, common.specialMoves.none);
            }
        }
    },

    possibleDiagonalMoves: function () {

        var targetId = '';

        var moveArrays = [
            this.diagonalForwardLeftMoves[this.squareId],
            this.diagonalForwardRightMoves[this.squareId],
            this.diagonalBackwardLeftMoves[this.squareId],
            this.diagonalBackwardRightMoves[this.squareId]
        ];

        for (var outerLoopIndex = 0; outerLoopIndex < moveArrays.length; outerLoopIndex++) {

            for (var innerLoopIndex = 0; innerLoopIndex < moveArrays[outerLoopIndex].length; innerLoopIndex++) {

                targetId = moveArrays[outerLoopIndex][innerLoopIndex];

                if (Squares().squareStatus(targetId) === Squares().statusPlayerOccupied)
                    break;

                if (Squares().squareStatus(targetId) === Squares().statusOpponentOccupied) {
                    this.setValue(targetId, common.specialMoves.none);
                    break;
                }

                this.setValue(targetId, common.specialMoves.none);
            }
        }
    },

    checkForPlayerInCheck: function (kingSquareId) {

        if (!kingSquareId)
            kingSquareId = Squares().getKingRankFile(requests.currentPlayer);

        if (this.checkForPawnCheck(kingSquareId))
            return true;

        if (this.checkForKnightCheck(kingSquareId))
            return true;

        if (this.checkForVerticalHorizontalDiagonalCheck(kingSquareId))
            return true;

        return false;
    },

    checkForPawnCheck: function (kingSquareId) {

        if (common.getRank(kingSquareId) === 8)
            return false;

        var targetSquareId = '';

        if (common.getFile(kingSquareId) > 1) {

            targetSquareId = (common.getRank(kingSquareId) + 1).toString() + (common.getFile(kingSquareId) - 1).toString();

            if (Squares().pieceType(targetSquareId) === common.pieces.pawn && Squares().pieceColor(targetSquareId) === requests.currentOpponent)
                return true;
        }

        if (common.getFile(kingSquareId) < 8) {

            targetSquareId = (common.getRank(kingSquareId) + 1).toString() + (common.getFile(kingSquareId) + 1).toString();

            if (Squares().pieceType(targetSquareId) === common.pieces.pawn && Squares().pieceColor(targetSquareId) === requests.currentOpponent)
                return true;
        }

        return false;
    },

    checkForKnightCheck: function (kingSquareId) {

        for (var loopIndex = 0; loopIndex < this.knightMoves[kingSquareId].length; loopIndex++) {

            if (Squares().squareStatus(this.knightMoves[kingSquareId][loopIndex]) === Squares().statusOpponentOccupied &&
                Squares().pieceType(this.knightMoves[kingSquareId][loopIndex]) === common.pieces.knight)
                return true;
        }

        return false;
    },

    checkForVerticalHorizontalDiagonalCheck: function (kingSquareId) {

        var outerLoopIndex = 0;
        var innerLoopIndex = 0;

        var moveArrays = [
            this.verticalForwardMoves[kingSquareId],
            this.verticalBackwardMoves[kingSquareId],
            this.horitonalLeftMoves[kingSquareId],
            this.horitonalRightMoves[kingSquareId]
        ];

        for (outerLoopIndex = 0; outerLoopIndex < moveArrays.length; outerLoopIndex++) {

            for (innerLoopIndex = 0; innerLoopIndex < moveArrays[outerLoopIndex].length; innerLoopIndex++) {

                if (Squares().squareStatus(moveArrays[outerLoopIndex][innerLoopIndex]) === Squares().statusOpponentOccupied) {
                    
                    if (Squares().squarePieceIsOppenentQueenOrRook(moveArrays[outerLoopIndex][innerLoopIndex]))
                        return true;
                    else
                        break;
                }

                if (Squares().squareStatus(moveArrays[outerLoopIndex][innerLoopIndex]) === Squares().statusPlayerOccupied)
                    break;
            }
        }


        moveArrays = [
            this.diagonalForwardLeftMoves[kingSquareId],
            this.diagonalForwardRightMoves[kingSquareId],
            this.diagonalBackwardLeftMoves[kingSquareId],
            this.diagonalBackwardRightMoves[kingSquareId]
        ];

        for (outerLoopIndex = 0; outerLoopIndex < moveArrays.length; outerLoopIndex++) {

            for (innerLoopIndex = 0; innerLoopIndex < moveArrays[outerLoopIndex].length; innerLoopIndex++) {

                if (Squares().squareStatus(moveArrays[outerLoopIndex][innerLoopIndex]) === Squares().statusOpponentOccupied) {

                    if (Squares().squarePieceIsOppenentQueenOrBishop(moveArrays[outerLoopIndex][innerLoopIndex]))
                        return true;
                    else
                        break;
                }

                if (Squares().squareStatus(moveArrays[outerLoopIndex][innerLoopIndex]) === Squares().statusPlayerOccupied)
                    break;
            }
        }

        return false;
    }
}