var utilities = {

    getAllSquareProperties: function (rank, file, rankPlusFile) {

        var squaresModelElement = this.getSquaresModelElement(rank, file, rankPlusFile);

        var squareAllProperties = {
            squareId: squaresModelElement[0].id,
            squareRank: parseInt(squaresModelElement[0].id.substring(0, 1)),
            squareFile: parseInt(squaresModelElement[0].id.substring(1, 2)),
            squareColor: squaresModelElement[0].color,
            pieceId: squaresModelElement[0].piece,
            pieceType: '',
            pieceColor: '',
            pieceHasMoved: false,
            pieceEnPassant: false
        };

        if (squareAllProperties.pieceId !== '') {

            var piecesModelElement = this.getPiecesModelElement(squareAllProperties.pieceId);
            squareAllProperties.pieceType = piecesModelElement[0].pieceType;
            squareAllProperties.pieceColor = piecesModelElement[0].color;
            squareAllProperties.pieceHasMoved = piecesModelElement[0].hasMoved;
            squareAllProperties.pieceEnPassant = piecesModelElement[0].enPassant;
        }

        return squareAllProperties;
    },

    getSquaresModelElement: function (rank, file, rankPlusFile) {

        var id = rank.toString() + file.toString();
        if (rankPlusFile)
            id = rankPlusFile;

        return model.squaresModel.filter(
            function (squaresModel) { return squaresModel.id === id; }
        );
    },

    getPiecesModelElement: function (id) {
        return model.piecesModel.filter(
            function (piecesModel) { return piecesModel.id === id; }
        );
    }
}