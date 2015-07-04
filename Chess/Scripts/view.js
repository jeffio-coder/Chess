var view = {

    actionPaintBoardFromModel: function (playerColor) {

        var rank = 0;
        var file = 0;
        var sb = '';

        for (var rankIndex = 8; rankIndex >= 1; rankIndex--) {

            rank = playerColor === 'white' ? rankIndex : 9 - rankIndex;

            sb += '<div id=\'R' + rankIndex.toString() + '\'>\n';
            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                file = playerColor === 'white' ? fileIndex : 9 - fileIndex;

                sb += '<div id=\'' + rank.toString() + file.toString() + '\' ';
                sb += 'class=\'gameSquare ' + view.utils.getClass(rank, file) + ' \' ';
                sb += 'style=\'' + view.utils.getHeightWidthStyles() + '\' ';
                sb += '></div>\n';
            }
            sb += '<br />\n';
            sb += '</div>\n';
        }

        return sb;
    },

    actionShowPossibleMoves: function () {

        switch (model.mouseDown.squareAllProperties.pieceType) {
            case 'R':
                view.possibleMoves.possibleMovesForRook();
                break;
            case 'N':
                view.possibleMoves.possibleMovesForKnight();
                break;
            case 'B':
                view.possibleMoves.possibleMovesForBishop();
                break;
            case 'Q':
                view.possibleMoves.possibleMovesForQueen();
                break;
            case 'K':
                view.possibleMoves.possibleMovesForKing();
                break;
            case 'P':
                view.possibleMoves.possibleMovesForPawn();
                break;
        }
        view.utils.markSquaresAsPossibleMove();
    },

    actionClearSquaresMarkedForMove: function () {

        view.utils.unmarkSquaresAsPossibleMove();

        if (model.mouseDown.squareAllProperties !== {}) {
            
            $('#' + model.mouseDown.squareAllProperties.squareId).removeClass('squareMoving');
            $('#mainBoard').removeClass(model.mouseDown.squareAllProperties.squareColor + 'Empty');
        }
    },

    //// Good candidate for it's own file ///////////////////////////////
    possibleMoves: {

        forward: 1,
        backward: -1,
        left: -1,
        right: 1,
        sqaureBlocked: 'blocked',
        sqaureCapturable: 'capturable',
        sqaureOpen: 'open',

        possibleMovesForPawn: function () {

            // direction will be 1 (move forward) if the piece is white. It will be -1 if the piece is black.
            var direction = model.mouseDown.squareAllProperties.pieceColor === 'white' ? this.forward : this.backward;

            var rank = model.mouseDown.squareAllProperties.squareRank;
            var file = model.mouseDown.squareAllProperties.squareFile;

            // Move one vertical.
            this.pawnMoves(rank + direction, file, this.sqaureOpen);

            // Move two vertical.
            if (!model.mouseDown.squareAllProperties.pieceHasMoved &&
                rank + direction >= 1 &&
                rank + direction <= 8 &&
                this.squareStatus(rank + direction, file, model.mouseDown.squareAllProperties.pieceColor) === this.sqaureOpen) {

                this.pawnMoves(rank + (direction * 2), file, this.sqaureOpen);
            }

            // Capture on the diagonals.
            this.pawnMoves(rank + direction, file + this.left, this.sqaureCapturable);
            this.pawnMoves(rank + direction, file + this.right, this.sqaureCapturable);

            // Capture en passant left.
            if (file + this.left >= 1 &&
                rank + direction >= 1 &&
                rank + direction <= 8) {

                var enPassantquareAllPropertiesLeft = common.getAllSquareProperties(rank, file + this.left);

                if (enPassantquareAllPropertiesLeft.pieceEnPassant &&
                    this.squareStatus(rank + direction, file + this.left, model.mouseDown.squareAllProperties.pieceColor) === this.sqaureOpen) {

                    model.addToPossibleMoves(rank + direction,  file + this.left);
                }
            }

            // Capture en passant right.
            if (file + this.right <= 8 &&
                rank + direction >= 1 &&
                rank + direction <= 8) {

                var enPassantquareAllPropertiesRight = common.getAllSquareProperties(rank, file + this.right);

                if (enPassantquareAllPropertiesRight.pieceEnPassant &&
                    this.squareStatus(rank + direction, file + this.right, model.mouseDown.squareAllProperties.pieceColor) === this.sqaureOpen) {

                    model.addToPossibleMoves(rank + direction, file + this.right);
                }
            }
        },

        possibleMovesForKnight: function () {

            this.knightMoves(2 * this.forward, this.left);
            this.knightMoves(2 * this.forward, this.right);
            this.knightMoves(this.forward, 2 * this.left);
            this.knightMoves(this.forward, 2 * this.right);
            this.knightMoves(2 * this.backward, this.left);
            this.knightMoves(2 * this.backward, this.right);
            this.knightMoves(this.backward, 2 * this.left);
            this.knightMoves(this.backward, 2 * this.right);
        },

        possibleMovesForKing: function () {

            var numberOfSquaresToMove = 1;
            this.possibleMovesForQueen(numberOfSquaresToMove);
        },

        possibleMovesForQueen: function (numberOfSquaresToMove) {

            this.possibleMovesForRook(numberOfSquaresToMove);
            this.possibleMovesForBishop(numberOfSquaresToMove);
        },

        possibleMovesForBishop: function (numberOfSquaresToMove) {

            this.diagonalMoves(this.forward, this.left, numberOfSquaresToMove);
            this.diagonalMoves(this.forward, this.right, numberOfSquaresToMove);
            this.diagonalMoves(this.backward, this.left, numberOfSquaresToMove);
            this.diagonalMoves(this.backward, this.right, numberOfSquaresToMove);
        },

        possibleMovesForRook: function (numberOfSquaresToMove) {

            this.verticalMoves(this.forward, numberOfSquaresToMove);
            this.verticalMoves(this.backward, numberOfSquaresToMove);
            this.horitonalMoves(this.left, numberOfSquaresToMove);
            this.horitonalMoves(this.right, numberOfSquaresToMove);
        },

        diagonalMoves: function (rankDirection, fileDirection, numberOfSquaresToMove) {

            var rank = model.mouseDown.squareAllProperties.squareRank + rankDirection;
            var rankSquaresToMove = this.getNumberOfSquaresToMove(model.mouseDown.squareAllProperties.squareRank, rankDirection, numberOfSquaresToMove);

            var file = model.mouseDown.squareAllProperties.squareFile + fileDirection;
            var fileSquaresToMove = this.getNumberOfSquaresToMove(model.mouseDown.squareAllProperties.squareFile, fileDirection, numberOfSquaresToMove);

            while (view.utils.compareIntValuesForOrder(rank, rankSquaresToMove, rankDirection) && view.utils.compareIntValuesForOrder(file, fileSquaresToMove, fileDirection)) {

                var status = this.squareStatus(rank, file, model.mouseDown.squareAllProperties.pieceColor);
                switch (status) {
                    case this.sqaureBlocked:
                        return;
                    case this.sqaureCapturable:
                        model.addToPossibleMoves(rank, file);
                        return;
                    case this.sqaureOpen:
                        model.addToPossibleMoves(rank, file);
                }
                rank += rankDirection;
                file += fileDirection;
            }
        },

        verticalMoves: function (direction, numberOfSquaresToMove) {

            var rank = model.mouseDown.squareAllProperties.squareRank + direction;
            var rankSquaresToMove = this.getNumberOfSquaresToMove(model.mouseDown.squareAllProperties.squareRank, direction, numberOfSquaresToMove);

            while (view.utils.compareIntValuesForOrder(rank, rankSquaresToMove, direction)) {

                var status = this.squareStatus(rank, model.mouseDown.squareAllProperties.squareFile, model.mouseDown.squareAllProperties.pieceColor);
                switch (status) {
                    case this.sqaureBlocked:
                        return;
                    case this.sqaureCapturable:
                        model.addToPossibleMoves(rank, + model.mouseDown.squareAllProperties.squareFile);
                        return;
                    case this.sqaureOpen:
                        model.addToPossibleMoves(rank, model.mouseDown.squareAllProperties.squareFile);
                }
                rank += direction;
            }
        },

        horitonalMoves: function (direction, numberOfSquaresToMove) {

            var file = model.mouseDown.squareAllProperties.squareFile + direction;
            var fileSquaresToMove = this.getNumberOfSquaresToMove(model.mouseDown.squareAllProperties.squareFile, direction, numberOfSquaresToMove);

            while (view.utils.compareIntValuesForOrder(file, fileSquaresToMove, direction)) {

                var status = this.squareStatus(model.mouseDown.squareAllProperties.squareRank, file, model.mouseDown.squareAllProperties.pieceColor);
                switch (status) {
                    case this.sqaureBlocked:
                        return;
                    case this.sqaureCapturable:
                        model.addToPossibleMoves(model.mouseDown.squareAllProperties.squareRank, file);
                        return;
                    case this.sqaureOpen:
                        model.addToPossibleMoves(model.mouseDown.squareAllProperties.squareRank, file);
                }
                file += direction;
            }
        },

        knightMoves: function (vertical, horitonal) {

            var verticalMove = model.mouseDown.squareAllProperties.squareRank + vertical;
            var horitonalMove = model.mouseDown.squareAllProperties.squareFile + horitonal;

            if (verticalMove <= 8 && verticalMove >= 1 &&
                horitonalMove <= 8 && horitonalMove >= 1 &&
                (this.squareStatus(verticalMove, horitonalMove, model.mouseDown.squareAllProperties.pieceColor) === this.sqaureCapturable ||
                this.squareStatus(verticalMove, horitonalMove, model.mouseDown.squareAllProperties.pieceColor) === this.sqaureOpen)) {

                model.addToPossibleMoves(verticalMove, horitonalMove);
            }
        },

        pawnMoves: function (rank, file, squareStatus) {
            if (rank >= 1 &&
                rank <= 8 &&
                file >= 1 &&
                file <= 8 &&
                this.squareStatus(rank, file, model.mouseDown.squareAllProperties.pieceColor) === squareStatus) {

                model.addToPossibleMoves(rank, file);
            }

        },

        squareStatus: function (rank, file, movingPieceColor) {
            var targetSquareProperties = common.getAllSquareProperties(rank, file);

            if (targetSquareProperties.pieceId === '')
                return this.sqaureOpen;
            else if (targetSquareProperties.pieceColor === movingPieceColor)
                return this.sqaureBlocked;
            else
                return this.sqaureCapturable;
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
        }
    },

    utils: {

        getClass: function (rank, file) {

            var squareAllProperties = common.getAllSquareProperties(rank, file);

            if (squareAllProperties.pieceId === '')
                return squareAllProperties.squareColor + 'Empty';
            else
                return squareAllProperties.pieceColor + '_' + squareAllProperties.pieceType + '_on_' + squareAllProperties.squareColor;
        },

        getHeightWidthStyles: function () {
            return 'width:' + controller.squareDimension.toString() + 'px; height:' + controller.squareDimension.toString() + 'px; ';
        },

        compareIntValuesForOrder: function (first, second, direction) {

            return direction > 0 ? first <= second : first >= second;
        },

        markSquaresAsPossibleMove: function () {

            //for (var loopIndex = 0; loopIndex < model.possibleMovesModel.length; loopIndex++) {
            //    $('#' + model.possibleMovesModel[loopIndex]).addClass('possibleMove');
            //}
            $.each(model.possibleMovesModel, function (key, value) {
                $('#' + key).addClass('possibleMove');
            });
        },

        unmarkSquaresAsPossibleMove: function () {

        //    for (var loopIndex = 0; loopIndex < model.possibleMovesModel.length; loopIndex++) {
        //        $('#' + model.possibleMovesModel[loopIndex]).removeClass('possibleMove');
        //    }
            $.each(model.possibleMovesModel, function (key, value) {
                $('#' + key).removeClass('possibleMove');
            });
        }
    }
}