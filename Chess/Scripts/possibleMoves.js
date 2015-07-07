var possibleMoves = {
    forward: 1,
    backward: -1,
    left: -1,
    right: 1,
    sqaureOccupiedByPlayer: 'occupiedByPlayer',
    sqaureOccupiedByOpponent: 'occupiedByOpponent',
    sqaureOpen: 'open',
    squareId: '',
    squareAllProperties: {},

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

        this.knightMoves(2 * this.forward, this.left);
        this.knightMoves(2 * this.forward, this.right);
        this.knightMoves(this.forward, 2 * this.left);
        this.knightMoves(this.forward, 2 * this.right);
        this.knightMoves(2 * this.backward, this.left);
        this.knightMoves(2 * this.backward, this.right);
        this.knightMoves(this.backward, 2 * this.left);
        this.knightMoves(this.backward, 2 * this.right);
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

    diagonalMoves: function (rankDirection, fileDirection, numberOfSquaresToMove) {

        var rank = this.squareAllProperties.squareRank + rankDirection;
        var rankSquaresToMove = this.getNumberOfSquaresToMove(this.squareAllProperties.squareRank, rankDirection, numberOfSquaresToMove);

        var file = this.squareAllProperties.squareFile + fileDirection;
        var fileSquaresToMove = this.getNumberOfSquaresToMove(this.squareAllProperties.squareFile, fileDirection, numberOfSquaresToMove);

        while (this.compareIntValuesForOrder(rank, rankSquaresToMove, rankDirection) && this.compareIntValuesForOrder(file, fileSquaresToMove, fileDirection)) {

            var status = this.squareStatus(rank, file, this.squareAllProperties.pieceColor);
            switch (status) {
                case this.sqaureOccupiedByPlayer:
                    return;
                case this.sqaureOccupiedByOpponent:
                    this.addToPossibleMoves(rank, file);
                    return;
                case this.sqaureOpen:
                    this.addToPossibleMoves(rank, file);
            }
            rank += rankDirection;
            file += fileDirection;
        }
    },

    verticalMoves: function (direction, numberOfSquaresToMove) {

        var rank = this.squareAllProperties.squareRank + direction;
        var rankSquaresToMove = this.getNumberOfSquaresToMove(this.squareAllProperties.squareRank, direction, numberOfSquaresToMove);

        while (this.compareIntValuesForOrder(rank, rankSquaresToMove, direction)) {

            var status = this.squareStatus(rank, this.squareAllProperties.squareFile, this.squareAllProperties.pieceColor);
            switch (status) {
                case this.sqaureOccupiedByPlayer:
                    return;
                case this.sqaureOccupiedByOpponent:
                    this.addToPossibleMoves(rank, this.squareAllProperties.squareFile);
                    return;
                case this.sqaureOpen:
                    this.addToPossibleMoves(rank, this.squareAllProperties.squareFile);
            }
            rank += direction;
        }
    },

    horitonalMoves: function (direction, numberOfSquaresToMove) {

        var file = this.squareAllProperties.squareFile + direction;
        var fileSquaresToMove = this.getNumberOfSquaresToMove(this.squareAllProperties.squareFile, direction, numberOfSquaresToMove);

        while (this.compareIntValuesForOrder(file, fileSquaresToMove, direction)) {

            var status = this.squareStatus(this.squareAllProperties.squareRank, file, this.squareAllProperties.pieceColor);
            switch (status) {
                case this.sqaureOccupiedByPlayer:
                    return;
                case this.sqaureOccupiedByOpponent:
                    this.addToPossibleMoves(this.squareAllProperties.squareRank, file);
                    return;
                case this.sqaureOpen:
                    this.addToPossibleMoves(this.squareAllProperties.squareRank, file);
            }
            file += direction;
        }
    },

    knightMoves: function (vertical, horitonal) {

        var verticalMove = this.squareAllProperties.squareRank + vertical;
        var horitonalMove = this.squareAllProperties.squareFile + horitonal;

        if (verticalMove <= 8 && verticalMove >= 1 &&
            horitonalMove <= 8 && horitonalMove >= 1 &&
            (this.squareStatus(verticalMove, horitonalMove, this.squareAllProperties.pieceColor) === this.sqaureOccupiedByOpponent ||
            this.squareStatus(verticalMove, horitonalMove, this.squareAllProperties.pieceColor) === this.sqaureOpen)) {

            this.addToPossibleMoves(verticalMove, horitonalMove);
        }
    },

    pawnMoves: function (rank, file, squareStatus, willBeEnPassantEligible) {
        if (rank >= 1 &&
            rank <= 8 &&
            file >= 1 &&
            file <= 8 &&
            this.squareStatus(rank, file, this.squareAllProperties.pieceColor) === squareStatus) {

            this.addToPossibleMoves(rank, file, false, willBeEnPassantEligible);
        }

    },

    addToPossibleMoves: function (rank, file, enPassantEligible, willBeEnPassantEligible) {
        model.possibleMovesModel[this.idFromRankFile(rank, file)] = {
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

        var rankFile = getKingRankFile();  // Returns a rankFile object containing rankFile.rank and rankFile.file.

        if (!calculatingPossibleMoves && checkForPawnCheck(rankFile)) return true;
        if (!calculatingPossibleMoves && checkForKnightCheck(rankFile)) return true;

        if (rankFile.rank < 8 && checkForVerticalCheck(rankFile, forward)) return true;
        if (rankFile.rank > 1 && checkForVerticalCheck(rankFile, backward)) return true;

        if (rankFile.file > 1 && checkForHorizontalCheck(rankFile, left)) return true;
        if (rankFile.file < 8 && checkForHorizontalCheck(rankFile, right)) return true;

        if (rankFile.rank < 8 && rankFile.file > 1 && checkForDiagonalCheck(rankFile, forward, left)) return true;
        if (rankFile.rank < 8 && rankFile.file < 8 && checkForDiagonalCheck(rankFile, forward, right)) return true;
        if (rankFile.rank > 1 && rankFile.file > 1 && checkForDiagonalCheck(rankFile, backward, left)) return true;
        if (rankFile.rank > 1 && rankFile.file < 8 && checkForDiagonalCheck(rankFile, backward, right)) return true;

        return false;
    },

    checkForPawnCheck: function (rankFile) {

        if (rankFile.rank === 8)
            return false;

        var targetPiece = model.piecesModel[model.squaresModel[this.idFromRankFile(rankFile.rank + 1, rankFile.file + 1)].piece];

        if (targetPiece && targetPiece.pieceType === 'P' && targetPiece.color !== common.colorCurrentlyPlaying())
            return true;

        targetPiece = model.piecesModel[model.squaresModel[this.idFromRankFile(rankFile.rank + 1, rankFile.file - 1)].piece];

        if (targetPiece && targetPiece.pieceType === 'P' && targetPiece.color !== common.colorCurrentlyPlaying())
            return true;

        return false;
    },

    checkForKnightCheck: function (rankFile) {

        if (rankFile + 2 <= 8 && rankFile.file + 1 <= 8 && knightCheck(rankFile.rank + 2, rankFile.file + 1)) return true;
        if (rankFile + 2 <= 8 && rankFile.file - 1 >= 1 && knightCheck(rankFile.rank + 2, rankFile.file - 1)) return true;
        if (rankFile + 1 <= 8 && rankFile.file + 2 <= 8 && knightCheck(rankFile.rank + 1, rankFile.file + 2)) return true;
        if (rankFile + 1 <= 8 && rankFile.file - 2 >= 1 && knightCheck(rankFile.rank + 1, rankFile.file - 2)) return true;
        if (rankFile - 2 >= 1 && rankFile.file + 1 <= 8 && knightCheck(rankFile.rank - 2, rankFile.file + 1)) return true;
        if (rankFile - 2 >= 1 && rankFile.file - 1 >= 1 && knightCheck(rankFile.rank - 2, rankFile.file - 1)) return true;
        if (rankFile - 1 >= 1 && rankFile.file + 2 <= 8 && knightCheck(rankFile.rank - 1, rankFile.file + 2)) return true;
        if (rankFile - 1 >= 1 && rankFile.file - 2 >= 1 && knightCheck(rankFile.rank - 1, rankFile.file - 2)) return true;

        return false;
    },

    checkForVerticalCheck: function (rankFile, direction) {

        var rank = rankFile.rank + direction;
        var rankStop = direction > 0 ? 8 : 1;

        var targetPiece = '';

        while (this.compareIntValuesForOrder(rank, rankStop, direction)) {

            var status = this.squareStatus(rank, rankFile.file, common.colorCurrentlyPlaying());
            switch (status) {
                case this.sqaureOccupiedByPlayer:
                    return false;
                case this.sqaureOccupiedByOpponent:
                    targetPiece = model.piecesModel[model.squaresModel[this.idFromRankFile(rank, rankFile.file)].piece];
                    if (targetPiece.pieceType === 'Q' || targetPiece.pieceType === 'R')
                        return true;
            }
            rank += direction;
        }

        return false;
    },

    checkForHorizontalCheck: function (rankFile, direction) {

        var file = rankFile.file + direction;
        var fileStop = direction > 0 ? 8 : 1;

        var targetPiece = '';

        while (this.compareIntValuesForOrder(file, fileStop, direction)) {

            var status = this.squareStatus(rankFile.rank, file, common.colorCurrentlyPlaying());
            switch (status) {
                case this.sqaureOccupiedByPlayer:
                    return false;
                case this.sqaureOccupiedByOpponent:
                    targetPiece = model.piecesModel[model.squaresModel[this.idFromRankFile(rankFile.rank, file)].piece];
                    if (targetPiece.pieceType === 'Q' || targetPiece.pieceType === 'R')
                        return true;
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

        while (this.compareIntValuesForOrder(rank, rankStop, rankDirection) && this.compareIntValuesForOrder(file, fileStop, fileDirection)) {

            var status = this.squareStatus(rank, file, common.colorCurrentlyPlaying());
            switch (status) {
                case this.sqaureOccupiedByPlayer:
                    return false;
                case this.sqaureOccupiedByOpponent:
                    targetPiece = model.piecesModel[model.squaresModel[this.idFromRankFile(rank, file)].piece];
                    if (targetPiece === 'Q' || targetPiece === 'B')
                        return true;
            }
            rank += rankDirection;
            file += fileDirection;
        }

        return false;
    },

    knightCheck: function (rank, file) {

        var targetPiece = model.piecesModel[model.squaresModel[this.idFromRankFile(rank, file)].piece];

        if (targetPiece && targetPiece.pieceType === 'N' && targetPiece.color !== common.colorCurrentlyPlaying())
            return true;

        return false;
    },

    compareIntValuesForOrder: function (first, second, direction) {

        return direction > 0 ? first <= second : first >= second;
    },

    squareStatus: function (rank, file, objectPieceColor) {

        var targetPiece = model.squaresModel[this.idFromRankFile(rank, file)].piece;

        if (targetPiece === '')
            return this.sqaureOpen;
        else if (targetPiece.color === objectPieceColor)
            return this.sqaureOccupiedByPlayer;
        else
            return this.sqaureOccupiedByOpponent;
    },

    getAllSquareProperties: function (rank, file) {

        var id = this.idFromRankFile(rank, file);

        var squareAllProperties = {
            squareId: id.toString(),
            squareRank: rank,
            squareFile: file,
            squareColor: model.squaresModel[id].color,
            pieceId: model.squaresModel[id].piece,
            pieceType: '',
            pieceColor: '',
            pieceHasMoved: false,
            pieceEnPassantEligible: false
        };

        if (model.squaresModel[id].piece !== '') {

            id = model.squaresModel[id].piece;
            squareAllProperties.pieceType = model.piecesModel[id].pieceType;
            squareAllProperties.pieceColor = model.piecesModel[id].color;
            squareAllProperties.pieceHasMoved = model.piecesModel[id].hasMoved;
            squareAllProperties.pieceEnPassantEligible = model.piecesModel[id].enPassantEligible;
        }

        return squareAllProperties;
    },

    getKingRankFile: function () {

        var pieceId = common.colorCurrentlyPlaying.substring(0, 1).toUpperCase() + 'K';
        
        Object.keys(model.squaresModel).forEach(function (key) {

            if (model.squaresModel[key].piece === pieceId) {
                return { rank: parseInt(key.substring(0, 1)), file: parseInt(key.substring(1, 2)) };
            }
        });
    }
}