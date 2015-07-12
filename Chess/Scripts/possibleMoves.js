var possibleMoves = {
    forward: 1,
    backward: -1,
    left: -1,
    right: 1,
    squareId: '',
    moves: {},
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

        possibleMoves.moves = {};

        switch (squareModel.pieceType(this.squareId)) {

            case pieceModel.king:
                this.possibleMovesForKing();
                break;
            case pieceModel.queen:
                this.possibleMovesForQueen();
                break;
            case this.rook:
                this.possibleMovesForRook();
                break;
            case this.knight:
                this.possibleMovesForKnight();
                break;
            case this.bishop:
                this.possibleMovesForBishop();
                break;
            case pieceModel.pawn:
                this.possibleMovesForPawn();
                break;
        }
    },

    possibleMovesForKing: function () {

        var targetId = '';

        for (var loopIndex = 0; loopIndex < this.kingMoves[this.squareId].length; loopIndex++) {

            targetId = this.kingMoves[this.squareId][loopIndex];

            if (squareModel.squareStatus(targetId) !== squareModel.statusPlayerOccupied)  
                this.moves[targetId] = globals.specialMoves.none;
        }

        // Special code for castle.
        if (this.squareId === '15' && restCalls.currentPlayer === globals.colors.white && !pieceModel.pieces['WK'].hasMoved) {

            if (!pieceModel.pieces['WKR'].hasMoved &&
                squareModel.squareStatus('16') === squareModel.statusOpen &&
                !this.checkForPlayerInCheck('16') &&
                squareModel.squareStatus('17') === squareModel.statusOpen &&
                !this.checkForPlayerInCheck('17')) {

                this.moves['17'] = globals.specialMoves.castleKing;
            }

            if (!pieceModel.pieces['WQR'].hasMoved &&
                squareModel.squareStatus('12') === squareModel.statusOpen &&
                !this.checkForPlayerInCheck('12') &&
                squareModel.squareStatus('13') === squareModel.statusOpen &&
                !this.checkForPlayerInCheck('13') &&
                squareModel.squareStatus('14') === squareModel.statusOpen &&
                !this.checkForPlayerInCheck('14')) {

                this.moves['13'] = globals.specialMoves.castleQueen;
            }
        }

        if (this.squareId === '14' && restCalls.currentPlayer === globals.colors.black && !pieceModel.pieces['BK'].hasMoved) {

            if (!pieceModel.pieces['BKR'].hasMoved &&
                squareModel.squareStatus('12') === squareModel.statusOpen &&
                !this.checkForPlayerInCheck('12') &&
                squareModel.squareStatus('13') === squareModel.statusOpen &&
                !this.checkForPlayerInCheck('13')) {

                this.moves['12'] = globals.specialMoves.castleKing;
            }

            if (!pieceModel.pieces['BQR'].hasMoved &&
                squareModel.squareStatus('15') === squareModel.statusOpen &&
                !this.checkForPlayerInCheck('15') &&
                squareModel.squareStatus('16') === squareModel.statusOpen &&
                !this.checkForPlayerInCheck('16') &&
                squareModel.squareStatus('17') === squareModel.statusOpen &&
                !this.checkForPlayerInCheck('17')) {

                this.moves['16'] = globals.specialMoves.castleQueen;
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

            if (squareModel.squareStatus(targetId) !== squareModel.statusPlayerOccupied) 
                this.moves[targetId] = globals.specialMoves.none;
        }
    },

    possibleMovesForBishop: function () {

        this.possibleDiagonalMoves();
    },

    possibleMovesForPawn: function () {

        // For the forward moves, the pawnMoves will be traversed one then two (if applicable). If one is blocked,
        // set a flag so two will be considered blocked.

        var targetId = '';
        var blocked = false;

        for (var loopIndex = 0; loopIndex < this.pawnMoves[this.squareId].length; loopIndex++) {

            targetId = this.pawnMoves[this.squareId][loopIndex].squareId;

            if (!this.pawnMoves[this.squareId][loopIndex].capture) {  // Move forward.

                if (squareModel.squareStatus(targetId) === squareModel.statusOpen) {
                    if (!blocked) this.moves[targetId] = globals.specialMoves.none;
                } else {
                    blocked = true;
                }
            } else {
                if (squareModel.squareStatus(targetId) === squareModel.statusOpponentOccupied) {
                    this.moves[targetId] = globals.specialMoves.none;
                } else {
                    if (squareModel.squareBehindEnPassantEligible(targetId))
                        this.moves[targetId] = globals.specialMoves.enPassant;
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

                if (squareModel.squareStatus(targetId) === squareModel.statusPlayerOccupied)
                    break;

                if (squareModel.squareStatus(targetId) === squareModel.statusOpponentOccupied) {
                    this.moves[targetId] = globals.specialMoves.none;
                    break;
                }

                this.moves[targetId] = globals.specialMoves.none;
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

                if (squareModel.squareStatus(targetId) === squareModel.statusPlayerOccupied)
                    break;

                if (squareModel.squareStatus(targetId) === squareModel.statusOpponentOccupied) {
                    this.moves[targetId] = globals.specialMoves.none;
                    break;
                }

                this.moves[targetId] = globals.specialMoves.none;
            }
        }
    },

    checkForPlayerInCheck: function (kingSquareId) {

        if (!kingSquareId)
            kingSquareId = this.getKingRankFile();   

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

            if (squareModel.pieceType(targetSquareId) === pieceModel.pawn && squareModel.pieceColor(targetSquareId) === restCalls.currentOpponent)
                return true;
        }

        if (common.getFile(kingSquareId) < 8) {

            targetSquareId = (common.getRank(kingSquareId) + 1).toString() + (common.getFile(kingSquareId) + 1).toString();

            if (squareModel.pieceType(targetSquareId) === pieceModel.pawn && squareModel.pieceColor(targetSquareId) === restCalls.currentOpponent)
                return true;
        }

        return false;
    },

    checkForKnightCheck: function (kingSquareId) {

        for (var loopIndex = 0; loopIndex < this.knightMoves[kingSquareId].length; loopIndex++) {

            if (squareModel.squareStatus(this.knightMoves[kingSquareId][loopIndex]) === squareModel.statusOpponentOccupied)
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

                if (squareModel.squareStatus(moveArrays[outerLoopIndex][innerLoopIndex]) === squareModel.statusOpponentOccupied) {
                    
                    if (squareModel.squarePieceIsOppenentQueenOrRook(moveArrays[outerLoopIndex][innerLoopIndex]))
                        return true;
                    else
                        break;
                }

                if (squareModel.squareStatus(moveArrays[outerLoopIndex][innerLoopIndex]) === squareModel.statusPlayerOccupied)
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

                if (squareModel.squareStatus(moveArrays[outerLoopIndex][innerLoopIndex]) === squareModel.statusOpponentOccupied) {

                    if (squareModel.squarePieceIsOppenentQueenOrBishop(moveArrays[outerLoopIndex][innerLoopIndex]))
                        return true;
                    else
                        break;
                }

                if (squareModel.squareStatus(moveArrays[outerLoopIndex][innerLoopIndex]) === squareModel.statusPlayerOccupied)
                    break;
            }
        }

        return false;
    },

    getKingRankFile: function () {

        var pieceId = restCalls.currentPlayer.substring(0, 1).toUpperCase() + 'K';

        for (var loopIndex = 0; loopIndex <= Object.keys(squareModel.squares).length; loopIndex++) {
            
            if (squareModel.squares[Object.keys(squareModel.squares)[loopIndex]].pieceId === pieceId) {

                return Object.keys(squareModel.squares)[loopIndex];
            }
        }
        return '';
    }
}