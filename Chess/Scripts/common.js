var common = {

    getAllSquareProperties: function (rank, file) {

        var id = rank.toString() + file.toString();

        var squareAllProperties = {
            squareId: id.toString(),
            squareRank: rank,
            squareFile: file,
            squareColor: model.squaresModel[id].color,
            pieceId: model.squaresModel[id].piece,
            pieceType: '',
            pieceColor: '',
            pieceHasMoved: false
        };

        if (model.squaresModel[id].piece !== '') {

            id = model.squaresModel[id].piece;
            squareAllProperties.pieceType = model.piecesModel[id].pieceType;
            squareAllProperties.pieceColor = model.piecesModel[id].color;
            squareAllProperties.pieceHasMoved = model.piecesModel[id].hasMoved;
        }

        return squareAllProperties;
    },

    getRankAndFileFileFromId: function(id) {
        return { 'rank': parseInt(id.substring(0, 1)), 'file': parseInt(id.substring(1, 2)) };
    }
}