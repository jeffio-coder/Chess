var pieceModel = {


    // For the sake of speed, there is no argument checking done.
    // The functions below assume that if arguments.length === 1, a valid squareId is passed. 
    // Otherwise, a valid rank and file have been passed.
    // Since this isn't publc code or non-deterministic code, that should be a safe assumtion.


    getModel: function() {
        return JSON.parse(JSON.stringify(this.pieces));
    },

    getKeys: function() {

        return Object.keys(this.pieces);
    },

    setPieceType: function(pieceId, value) {

        this.pieces[pieceId].pieceType = value;
    },

    setHasMoved: function(pieceId, value) {

        this.pieces[pieceId].hasMoved = value;
    },

    setCaptured: function(pieceId, value) {

        this.pieces[pieceId].captured = value;
    },

    setEnPassantEligible: function(pieceId, value) {

        this.pieces[pieceId].enPassantEligible = value;
    },

    setModel: function(value) {
        this.pieces = JSON.parse(JSON.stringify(value));
    },

    setEnPassantIneligiblePlayer: function () {

        for (var loopIndex = 0; loopIndex < this.getKeys().length; loopIndex++) {

            if (this.getColor(this.getKeys()[loopIndex]) === restCalls.currentPlayer)
                this.setEnPassantEligible(this.getKeys()[loopIndex], false);
        }
    }
}