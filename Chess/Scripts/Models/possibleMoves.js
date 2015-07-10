var possibleMovesModel = {
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

    loadSquareMoves: function() {

        this.loadVerticalMoves();
        this.loadHorizontalMoves();
        this.loadDiagonalMoves();
        this.loadKingMoves();
        this.loadKnightMoves();
    },

    loadVerticalMoves: function() {

        var squareMoves = [];
        var rank = 0;

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

                // Load pawn moves
                squareMoves = [];
                if (rankIndex > 1 && rankIndex < 8) {
                    
                    squareMoves.push((rankIndex + 1).toString() + fileIndex.toString());
                    if (rankIndex === 2) squareMoves.push((rankIndex + 2).toString() + fileIndex.toString());
                    if (fileIndex - 1 >= 1) squareMoves.push((rankIndex + 1).toString() + (fileIndex - 1).toString());
                    if (fileIndex + 1 <= 8) squareMoves.push((rankIndex + 1).toString() + (fileIndex + 1).toString());
                }
                this.pawnMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;
            }
        }
    },

    loadHorizontalMoves: function () {

        var squareMoves = [];
        var file = 0;

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {
            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                squareMoves = [];
                file = fileIndex + 1;

                while (file <= 8) squareMoves.push(rankIndex.toString() + (file++).toString());
                this.horitonalRightMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;


                squareMoves = [];
                file = fileIndex - 1;

                while (file >= 1) squareMoves.push(rankIndex.toString() + (file--).toString());
                this.horitonalLeftMoves[rankIndex.toString() + fileIndex.toString()] = squareMoves;
            }
        }
    },

    loadDiagonalMoves: function () {

        var squareMoves = [];
        var rank = 0;
        var file = 0;

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {
            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

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

    loadKingMoves: function() {

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

    possibleMovesForPawn: function() {

        var rank = this.squareAllProperties.squareRank;
        var file = this.squareAllProperties.squareFile;

        // Move one vertical.
        this.pawnMoves(rank + this.forward, file, this.sqaureOpen);

        // Move two vertical.
        if (!this.squareAllProperties.pieceHasMoved &&
            this.squareStatus(rank + this.forward, file, this.squareAllProperties.pieceColor) === this.sqaureOpen) {

            this.pawnMoves(rank + (this.forward * 2), file, this.sqaureOpen, true);
        }

        // Capture on the diagonals.
        this.pawnMoves(rank + this.forward, file + this.left, this.sqaureOccupiedByOpponent);
        this.pawnMoves(rank + this.forward, file + this.right, this.sqaureOccupiedByOpponent);

        // Capture en passant left.
        if (file + this.left >= 1) {

            var enPassantSquareAllPropertiesLeft = this.getAllSquareProperties(rank, file + this.left);

            if (enPassantSquareAllPropertiesLeft.pieceEnPassantEligible &&
                this.squareStatus(rank + this.forward, file + this.left, this.squareAllProperties.pieceColor) === this.sqaureOpen) {

                this.addToPossibleMoves(rank + this.forward, file + this.left, true);
            }
        }

        // Capture en passant right.
        if (file + this.right <= 8) {

            var enPassantSquareAllPropertiesRight = this.getAllSquareProperties(rank, file + this.right);

            if (enPassantSquareAllPropertiesRight.pieceEnPassantEligible &&
                this.squareStatus(rank + this.forward, file + this.right, this.squareAllProperties.pieceColor) === this.sqaureOpen) {

                this.addToPossibleMoves(rank + this.forward, file + this.right, true);
            }
        }
    },

    possibleMovesForKnight: function() {

        for (var loopIndex = 0; loopIndex <= this.knightMoves[this.squareId].length; loopIndex++) {

            var targetId = this.knightMoves[this.squareId][loopIndex];

            if (squareModel.squareStatus(targetId) !== squareModel.statusPlayerOccupied) {

                this.moves[targetId] = true;
            }
        }

    },

    possibleMovesForKing: function() {

        var numberOfSquaresToMove = 1;
        this.possibleMovesForQueen(numberOfSquaresToMove);
    },

    possibleMovesForQueen: function(numberOfSquaresToMove) {

        this.possibleMovesForRook(numberOfSquaresToMove);
        this.possibleMovesForBishop(numberOfSquaresToMove);
    },

    possibleMovesForBishop: function(numberOfSquaresToMove) {

        this.diagonalMoves(this.forward, this.left, numberOfSquaresToMove);
        this.diagonalMoves(this.forward, this.right, numberOfSquaresToMove);
        this.diagonalMoves(this.backward, this.left, numberOfSquaresToMove);
        this.diagonalMoves(this.backward, this.right, numberOfSquaresToMove);
    },

    possibleMovesForRook: function(numberOfSquaresToMove) {

        this.verticalMoves(this.forward, numberOfSquaresToMove);
        this.verticalMoves(this.backward, numberOfSquaresToMove);
        this.horitonalMoves(this.left, numberOfSquaresToMove);
        this.horitonalMoves(this.right, numberOfSquaresToMove);
    },

    addToPossibleMoves: function (rank, file, enPassantEligible, willBeEnPassantEligible) {
        this.moves[common.idFromRankFile(rank, file)] = {
            enPassantEligible: enPassantEligible ? true : false,
            willBeEnPassantEligible: willBeEnPassantEligible ? true : false
        };
    },

    getNumberOfSquaresToMove: function (start, direction, numberOfSquaresToMove) {

        if (numberOfSquaresToMove && direction > 0)
            return start + numberOfSquaresToMove > 8 ? 8 : start + numberOfSquaresToMove;
        else if (numberOfSquaresToMove && direction < 0)
            return start - numberOfSquaresToMove < 1 ? 1 : start - numberOfSquaresToMove;
        else if (direction > 0)
            return 8;
        else
            return 1;
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