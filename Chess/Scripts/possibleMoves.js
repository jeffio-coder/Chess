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

    possibleMovesForKing: function () {

        var targetId = '';

        for (var loopIndex = 0; loopIndex < this.kingMoves[this.squareId].length; loopIndex++) {

            targetId = this.kingMoves[this.squareId][loopIndex];

            if (squareModel.squareStatus(targetId) !== squareModel.statusPlayerOccupied)  
                this.moves[targetId] = enums.specialMoves.none;
        }

        // Special code for castle.
        if (this.squareId === '15' && common.currentPlayer() === enums.colors.white && !pieceModel.pieces['WK'].hasMoved) {

            if (!pieceModel.pieces['WKR'].hasMoved &&
                squareModel.squareStatus('16') === squareModel.statusOpen &&
                squareModel.squareStatus('17') === squareModel.statusOpen) {

                this.moves['17'] = enums.specialMoves.castleQueen;
            }

            if (!pieceModel.pieces['WQR'].hasMoved &&
                squareModel.squareStatus('12') === squareModel.statusOpen &&
                squareModel.squareStatus('13') === squareModel.statusOpen &&
                squareModel.squareStatus('14') === squareModel.statusOpen) {

                this.moves['13'] = enums.specialMoves.castleQueen;
            }
        }

        if (this.squareId === '14' && common.currentPlayer() === enums.colors.black && !pieceModel.pieces['BK'].hasMoved) {

            if (!pieceModel.pieces['BKR'].hasMoved &&
                squareModel.squareStatus('12') === squareModel.statusOpen &&
                squareModel.squareStatus('13') === squareModel.statusOpen) {

                this.moves['12'] = enums.specialMoves.castleQueen;
            }

            if (!pieceModel.pieces['BQR'].hasMoved &&
                squareModel.squareStatus('15') === squareModel.statusOpen &&
                squareModel.squareStatus('16') === squareModel.statusOpen &&
                squareModel.squareStatus('17') === squareModel.statusOpen) {

                this.moves['16'] = enums.specialMoves.castleQueen;
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
                this.moves[targetId] = enums.specialMoves.none;
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
                    if (!blocked) this.moves[targetId] = enums.specialMoves.none;
                } else {
                    blocked = true;
                }
            } else {
                if (squareModel.squareStatus(targetId) === squareModel.statusOpponentOccupied) {
                    this.moves[targetId] = enums.specialMoves.none;
                } else {
                    if (squareModel.squareBehindEnPassantEligible(targetId))
                        this.moves[targetId] = enums.specialMoves.enPassant;
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
                    this.moves[targetId] = enums.specialMoves.none;
                    break;
                }

                this.moves[targetId] = enums.specialMoves.none;
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
                    this.moves[targetId] = enums.specialMoves.none;
                    break;
                }

                this.moves[targetId] = enums.specialMoves.none;
            }
        }
    },

    checkForCheck: function (calculatingPossibleMoves) {

        // Note: There's no reason to check for possible pawn or knight moves when this function is called
        // while calculating possible moves. A player can't move into a pawn check or a knight check.

        var rankFile = this.getKingRankFile();  // Returns a rankFile object containing rankFile.rank and rankFile.file.

        if (!calculatingPossibleMoves && this.checkForPawnCheck(rankFile)) return true;

        if (!calculatingPossibleMoves && this.checkForKnightCheck(rankFile)) return true;

        if (rankFile.rank < 8 && this.checkForVerticalCheck(rankFile, this.forward)) return true;
        if (rankFile.rank > 1 && this.checkForVerticalCheck(rankFile, this.backward)) return true;

        if (rankFile.file > 1 && this.checkForHorizontalCheck(rankFile, this.left)) return true;
        if (rankFile.file < 8 && this.checkForHorizontalCheck(rankFile, this.right)) return true;

        if (rankFile.rank < 8 && rankFile.file > 1 && this.checkForDiagonalCheck(rankFile, this.forward, this.left)) return true;
        if (rankFile.rank < 8 && rankFile.file < 8 && this.checkForDiagonalCheck(rankFile, this.forward, this.right)) return true;
        if (rankFile.rank > 1 && rankFile.file > 1 && this.checkForDiagonalCheck(rankFile, this.backward, this.left)) return true;
        if (rankFile.rank > 1 && rankFile.file < 8 && this.checkForDiagonalCheck(rankFile, this.backward, this.right)) return true;

        return false;
    },

    checkForPawnCheck: function (rankFile) {

        if (rankFile.rank === 8)
            return false;

        var targetPiece = model.piecesModel[model.squaresModel[common.idFromRankFile(rankFile.rank + 1, rankFile.file + 1)].piece];

        if (targetPiece && targetPiece.pieceType === 'P' && targetPiece.color !== common.colorCurrentlyPlaying())
            return true;

        targetPiece = model.piecesModel[model.squaresModel[common.idFromRankFile(rankFile.rank + 1, rankFile.file - 1)].piece];

        if (targetPiece && targetPiece.pieceType === 'P' && targetPiece.color !== common.colorCurrentlyPlaying())
            return true;

        return false;
    },

    checkForKnightCheck: function (rankFile) {

        if (rankFile.rank + 2 <= 8 && rankFile.file + 1 <= 8 && this.knightCheck(rankFile.rank + 2, rankFile.file + 1)) return true;
        if (rankFile.rank + 2 <= 8 && rankFile.file - 1 >= 1 && this.knightCheck(rankFile.rank + 2, rankFile.file - 1)) return true;
        if (rankFile.rank + 1 <= 8 && rankFile.file + 2 <= 8 && this.knightCheck(rankFile.rank + 1, rankFile.file + 2)) return true;
        if (rankFile.rank + 1 <= 8 && rankFile.file - 2 >= 1 && this.knightCheck(rankFile.rank + 1, rankFile.file - 2)) return true;
        if (rankFile.rank - 2 >= 1 && rankFile.file + 1 <= 8 && this.knightCheck(rankFile.rank - 2, rankFile.file + 1)) return true;
        if (rankFile.rank - 2 >= 1 && rankFile.file - 1 >= 1 && this.knightCheck(rankFile.rank - 2, rankFile.file - 1)) return true;
        if (rankFile.rank - 1 >= 1 && rankFile.file + 2 <= 8 && this.knightCheck(rankFile.rank - 1, rankFile.file + 2)) return true;
        if (rankFile.rank - 1 >= 1 && rankFile.file - 2 >= 1 && this.knightCheck(rankFile.rank - 1, rankFile.file - 2)) return true;

        return false;
    },

    checkForVerticalCheck: function (rankFile, direction) {

        var rank = rankFile.rank + direction;
        var rankStop = direction > 0 ? 8 : 1;

        var targetPiece = '';
        var status = '';

        while (this.compareIntValuesForOrder(rank, rankStop, direction)) {

            status = this.squareStatus(rank, rankFile.file, common.colorCurrentlyPlaying());
            switch (status) {
                case this.sqaureOccupiedByPlayer:
                    return false;
                case this.sqaureOccupiedByOpponent:
                    targetPiece = model.piecesModel[model.squaresModel[common.idFromRankFile(rank, rankFile.file)].piece].pieceType;
                    if (targetPiece === 'Q' || targetPiece === 'R')
                        return true;
                    else
                        return false;
            }
            rank += direction;
        }

        return false;
    },

    checkForHorizontalCheck: function (rankFile, direction) {

        var file = rankFile.file + direction;
        var fileStop = direction > 0 ? 8 : 1;

        var targetPiece = '';
        var status = '';

        while (this.compareIntValuesForOrder(file, fileStop, direction)) {

            status = this.squareStatus(rankFile.rank, file, common.colorCurrentlyPlaying());
            switch (status) {
                case this.sqaureOccupiedByPlayer:
                    return false;
                case this.sqaureOccupiedByOpponent:
                    targetPiece = model.piecesModel[model.squaresModel[common.idFromRankFile(rankFile.rank, file)].piece].pieceType;
                    if (targetPiece === 'Q' || targetPiece === 'R')
                        return true;
                    else
                        return false;
            }
            file += direction;
        }

        return false;
    },

    checkForDiagonalCheck: function (rankFile, rankDirection, fileDirection) {

        var rank = rankFile.rank + rankDirection;
        var rankStop = rankDirection > 0 ? 8 : 1;

        var file = rankFile.file + fileDirection;
        var fileStop = fileDirection > 0 ? 8 : 1;

        var targetPiece = '';
        var status = '';

        while (this.compareIntValuesForOrder(rank, rankStop, rankDirection) && this.compareIntValuesForOrder(file, fileStop, fileDirection)) {

            status = this.squareStatus(rank, file, common.colorCurrentlyPlaying());
            switch (status) {
                case this.sqaureOccupiedByPlayer:
                    return false;
                case this.sqaureOccupiedByOpponent:
                    targetPiece = model.piecesModel[model.squaresModel[common.idFromRankFile(rank, file)].piece].pieceType;
                    if (targetPiece === 'Q' || targetPiece === 'B')
                        return true;
                    else
                        return false;
            }
            rank += rankDirection;
            file += fileDirection;
        }

        return false;
    },
}