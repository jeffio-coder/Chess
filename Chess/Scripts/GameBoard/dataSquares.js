function Squares () {

    var squaresAndPieces =
    {
        squares: {
            'squareId':
            {
                'color': '',
                'pieceId': '',
                frontVector: {},
                rearVector: {},
                leftVector: {},
                rightVector: {},
                frontLeftVector: {},
                frontRightVector: {},
                rearLeftVector: {},
                rearRightVector: {},
                knightVector: {},
                kingVector: {},
                possibleMoves: {},
                squaresAttackedBySquare: {},
                squaresAttackedBySquareButBlocked: {},
                attackedByPlayer: {},
                attackedByPlayerButBlocked: {},
                attackedByOpponent: {},
                attackedByOpponentButBlocked: {}
            }
        },
        pieces: {
            'pieceId':
            {
                'type': '',
                'color': '',
                'hasMoved': false,
                'captured': false,
                'enPassantEligible': false
            }
        }
    };

    var specialMoves = {
        none: '',
        enPassant: 'enPassant',
        castleKing: 'castleKing',
        castleQueen: 'castleQueen'
    };

    var vectorTypes = {
        rankFile: 'rankFile',
        diagonal: 'diagonal'
    };
    
    var statuses = {
        open: 'open',
        occupiedByPlayer: 'occupiedByPlayer',
        occupiedByOpponent: 'occupiedByOpponent'
    };

    var getColor = function (squareId) {
        return squaresAndPieces.squares[squareId].color;
    };

    var getPieceId = function(squareId) {
        return squaresAndPieces.squares[squareId].pieceId;
    };

    var setPieceId = function (squareId, value) {
        squaresAndPieces.squares[squareId].pieceId = value;
    };

    var getPieceType = function (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === '') return '';
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].type;
    };

    var setPieceType = function (squareId, value) {
        if (squaresAndPieces.squares[squareId].pieceId !== '' &&
            (value === '' ||
            value === common.pieces.king ||
            value === common.pieces.queen ||
            value === common.pieces.rook ||
            value === common.pieces.knight ||
            value === common.pieces.bishop ||
            value === common.pieces.pawn)
            )
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].type = value;
    };

    var getPieceColor = function (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === '') return '';
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].color;
    };

    var getPieceHasMoved = function (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === false) return false;
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].hasMoved;
    };

    var setPieceHasMoved = function (squareId, value) {
        if (squaresAndPieces.squares[squareId].pieceId !== '')
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].hasMoved = value;
    };

    var getPieceCaptured = function (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === '') return false;
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].captured;
    };

    var setPieceCaptured = function (squareId, value) {
        if (squaresAndPieces.squares[squareId].pieceId !== '')
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].captured = value;
    };

    var getPieceEnPassantEligible = function (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === '') return false;
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].enPassantEligible;
    };

    var setPieceEnPassantEligible = function (squareId, value) {
        if (squaresAndPieces.squares[squareId].pieceId !== '')
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].enPassantEligible = value;
    };
    
    var squareStatus = function (squareId) {
        return squaresAndPieces.squares[squareId].pieceId === '' ? statuses.open :
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].color === requests.currentPlayer ?
            statuses.occupiedByPlayer : statuses.occupiedByOpponent;
    };

    var squareAttackedByOpponent = function (squareId) {

        return Object.keys(squaresAndPieces.squares[squareId].attackedByOpponent).length > 0;
    };

    var traverseStraightVectors = function (squareId, vectorType, keys) {

        var otherPiece = vectorType === vectorTypes.rankFile ? common.pieces.rook : common.pieces.bishop;
        var squareIdContainsAttackingPiece = getPieceColor(squareId) === requests.currentPlayer && 
            (getPieceType(squareId) === common.pieces.queen || getPieceType(squareId) === otherPiece);

        var blocked = false;

        for (var loopIndex = 0; loopIndex < keys.length; loopIndex++) {

            if (blocked) {

                squaresAndPieces.squares[squareId].squaresAttackedBySquareButBlocked[keys[loopIndex]] = specialMoves.none;
            } else {
                squaresAndPieces.squares[squareId].squaresAttackedBySquare[keys[loopIndex]] = specialMoves.none;

                if (squareIdContainsAttackingPiece && squareStatus(keys[loopIndex]) !== statuses.occupiedByPlayer) {

                    squaresAndPieces.squares[squareId].possibleMoves[keys[loopIndex]] = specialMoves.none;
                }
            }

            if (getPieceType(keys[loopIndex]) === common.pieces.queen || getPieceType(keys[loopIndex]) === otherPiece) {

                if (blocked) {

                    if (getPieceColor(keys[loopIndex]) === requests.currentPlayer) {

                        squaresAndPieces.squares[squareId].attackedByPlayerButBlocked[keys[loopIndex]] = specialMoves.none;
                    } else {
                        squaresAndPieces.squares[squareId].attackedByOpponentButBlocked[keys[loopIndex]] = specialMoves.none;
                    }
                } else {
                    if (getPieceColor(keys[loopIndex]) === requests.currentPlayer) {

                        squaresAndPieces.squares[squareId].attackedByPlayer[keys[loopIndex]] = specialMoves.none;
                    } else {
                        squaresAndPieces.squares[squareId].attackedByOpponent[keys[loopIndex]] = specialMoves.none;
                    }
                }
            }

            if (squareStatus(keys[loopIndex]) !== statuses.open) {

                blocked = true;
            }
        }
    };

    var traverseKnightVector = function(squareId, keys) {

        for (var loopIndex = 0; loopIndex < keys.length; loopIndex++) {

            squaresAndPieces.squares[squareId].squaresAttackedBySquare[keys[loopIndex]] = specialMoves.none;

            if (getPieceType(squareId) === common.pieces.knight && squareStatus(keys[loopIndex]) !== statuses.occupiedByPlayer) {

                squaresAndPieces.squares[squareId].possibleMoves[keys[loopIndex]] = specialMoves.none;
            }

            if (getPieceType(keys[loopIndex]) === common.pieces.knight) {

                if (getPieceColor(keys[loopIndex]) === requests.currentPlayer) {

                    squaresAndPieces.squares[squareId].attackedByPlayer[keys[loopIndex]] = specialMoves.none;
                    squaresAndPieces.squares[squareId].possibleMoves[keys[loopIndex]] = specialMoves.none;
                } else {
                    squaresAndPieces.squares[squareId].attackedByOpponent[keys[loopIndex]] = specialMoves.none;
                }
            }
        }
    };

    var traversePawnVector = function (squareId) {

        var rank = common.getRank(squareId);
        var file = common.getFile(squareId);
        var squareToAttack = '';
        var enPassantSquareToAttack = '';

        if (rank <= 7) {
                
            if (file >= 2) {

                squareToAttack = (rank + 1).toString() + (file - 1).toString();

                if (squareStatus(squareToAttack) === statuses.occupiedByOpponent) {
                    
                    squaresAndPieces.squares[squareId].possibleMoves[squareToAttack] = specialMoves.none;
                }

                enPassantSquareToAttack = (rank).toString() + (file - 1).toString();

                if (getPieceEnPassantEligible(enPassantSquareToAttack) && getPieceColor(enPassantSquareToAttack) === common.currentOpponent) {
                    
                    squaresAndPieces.squares[squareId].possibleMoves[squareToAttack] = specialMoves.enPassant;
                }

                if (getPieceType(squareToAttack) === common.pieces.pawn) {

                    if (getPieceColor(squareToAttack) === requests.currentPlayer) {

                        squaresAndPieces.squares[squareId].attackedByPlayer[squareToAttack] = specialMoves.none;
                    } else {
                        squaresAndPieces.squares[squareId].attackedByOpponent[squareToAttack] = specialMoves.none;
                    }
                }
            }

            if (file <= 7) {

                squareToAttack = (rank + 1).toString() + (file + 1).toString();

                if (squareStatus(squareToAttack) === statuses.occupiedByOpponent) {

                    squaresAndPieces.squares[squareId].possibleMoves[squareToAttack] = specialMoves.none;
                }

                enPassantSquareToAttack = (rank).toString() + (file + 1).toString();

                if (getPieceEnPassantEligible(enPassantSquareToAttack) && getPieceColor(enPassantSquareToAttack) === common.currentOpponent) {

                    squaresAndPieces.squares[squareId].possibleMoves[squareToAttack] = specialMoves.enPassant;
                }

                if (getPieceType(squareToAttack) === common.pieces.pawn) {

                    if (getPieceColor(squareToAttack) === requests.currentPlayer) {

                        squaresAndPieces.squares[squareId].attackedByPlayer[squareToAttack] = specialMoves.none;
                    } else {
                        squaresAndPieces.squares[squareId].attackedByOpponent[squareToAttack] = specialMoves.none;
                    }
                }
            }

            squareToAttack = (rank + 1).toString() + (file).toString();

            if (squareStatus(squareToAttack) === statuses.open) {
                
                squaresAndPieces.squares[squareId].possibleMoves[squareToAttack] = specialMoves.none;

                squareToAttack = (rank + 2).toString() + (file).toString();

                if (rank === 2 && squareStatus(squareToAttack) === statuses.open) {

                    squaresAndPieces.squares[squareId].possibleMoves[squareToAttack] = specialMoves.none;
                }
            }


        }
    };

    var traverseKingVector = function(squareId, keys) {

        for (var loopIndex = 0; loopIndex < keys.length; loopIndex++) {

            if (getPieceType(squareId) === common.pieces.knight && squareStatus(keys[loopIndex]) !== statuses.occupiedByPlayer && !squareAttackedByOpponent(keys[loopIndex])) {
                
                squaresAndPieces.squares[squareId].possibleMoves[keys[loopIndex]] = specialMoves.none;
            }
        }

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

            if (this.squareId === whiteKing && !getPieceHasMoved(whiteKing)) {

                if (!getPieceHasMoved(whiteKingsRook)
                    &&
                    squareStatus(whiteKingsKnight) === statuses.open && !squareAttackedByOpponent(whiteKingsKnight)
                    &&
                    squareStatus(whiteKingsBishop) === statuses.open && !squareAttackedByOpponent(whiteKingsBishop)) {

                    this.setValue(whiteKingsKnight, specialMoves.castleKing);
                }

                if (!getPieceHasMoved(whiteQueensRook)
                    &&
                    squareStatus(whiteQueensKnight) === statuses.open && !squareAttackedByOpponent(whiteQueensKnight)
                    &&
                    squareStatus(whiteQueensBishop) === statuses.open && !squareAttackedByOpponent(whiteQueensBishop)
                    &&
                    squareStatus(whiteQueen) === statuses.open && !squareAttackedByOpponent(whiteQueen)) {

                    this.setValue(whiteQueensBishop, specialMoves.castleQueen);
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

            if (this.squareId === blackKing && !getPieceHasMoved(blackKing)) {

                if (!getPieceHasMoved(blackKingsRook)
                    &&
                    squareStatus(blackKingsKnight) === statuses.open && !squareAttackedByOpponent(blackKingsKnight)
                    &&
                    squareStatus(blackKingsBishop) === statuses.open && !squareAttackedByOpponent(blackKingsBishop)) {

                    this.setValue(blackKingsKnight, specialMoves.castleKing);
                }

                if (!getPieceHasMoved(blackQueensRook)
                    &&
                    squareStatus(blackQueensKnight) === statuses.open && !squareAttackedByOpponent(blackQueensKnight)
                    &&
                    squareStatus(blackQueensBishop) === statuses.open && !squareAttackedByOpponent(blackQueensBishop)
                    &&
                    squareStatus(blackQueen) === statuses.open && !squareAttackedByOpponent(blackQueen)) {

                    this.setValue(blackQueensBishop, specialMoves.castleQueen);
                }
            }
        }
    };

    var setVectorProperties = function() {

        var squareId = '';

        for (var rank = 1; rank <= 8; rank++) {
            for (var file = 1; file <= 8; file++) {

                squareId = rank.toString() + file.toString();

                traverseStraightVectors(squareId, vectorTypes.rankFile, Object.keys(squaresAndPieces.squares[squareId].frontVector));
                traverseStraightVectors(squareId, vectorTypes.rankFile, Object.keys(squaresAndPieces.squares[squareId].rearVector));
                traverseStraightVectors(squareId, vectorTypes.rankFile, Object.keys(squaresAndPieces.squares[squareId].leftVector));
                traverseStraightVectors(squareId, vectorTypes.rankFile, Object.keys(squaresAndPieces.squares[squareId].rightVector));
                traverseStraightVectors(squareId, vectorTypes.diagonal, Object.keys(squaresAndPieces.squares[squareId].frontLeftVector));
                traverseStraightVectors(squareId, vectorTypes.diagonal, Object.keys(squaresAndPieces.squares[squareId].frontRightVector));
                traverseStraightVectors(squareId, vectorTypes.diagonal, Object.keys(squaresAndPieces.squares[squareId].rearLeftVector));
                traverseStraightVectors(squareId, vectorTypes.diagonal, Object.keys(squaresAndPieces.squares[squareId].rearRightVector));
                traverseKnightVector(squareId, Object.keys(squaresAndPieces.squares[squareId].knightVector));
                traversePawnVector(squareId);
                traverseKingVector(squareId, Object.keys(squaresAndPieces.squares[squareId].kingVector));

                // ToDo: remove moves in check
            }
        }
    };

    var getVal = function() {
        return squaresAndPieces;
    };

    var setVal = function(value) {
        squaresAndPieces = value;

        if (squaresAndPieces && Object.keys(squaresAndPieces).length > 0) {
            setVectorProperties();
        }
    };

    var setEnPassantIneligibleForPlayer = function () {

        var key = '';
        for (var loopIndex = 0; loopIndex < Object.keys(squaresAndPieces.pieces).length; loopIndex++) {

            key = Object.keys(squaresAndPieces.pieces)[loopIndex];

            if (squaresAndPieces.pieces[key].color === requests.currentPlayer && squaresAndPieces.pieces[key].type === common.pieces.pawn)
                squaresAndPieces.pieces[key].enPassantEligible = false;
        }
    };

    var getCapturedPieces = function () {

        var key = '';
        var returnPieces = {};

        for (var loopIndex = 0; loopIndex < Object.keys(squaresAndPieces.pieces).length; loopIndex++) {

            key = Object.keys(squaresAndPieces.pieces)[loopIndex];

            if (squaresAndPieces.pieces[key].captured)
                returnPieces[key] = JSON.parse(JSON.stringify(squaresAndPieces.pieces[key]));
        }

        return returnPieces;
    };

    var getPossibleMoves = function (squareId) {

        return Object.keys(squaresAndPieces.squares[squareId].possibleMoves);
    };

    var changeSquareModelToOtherPlayer = function () {

        var newSquares = {};

        for (var rankIndex = 1; rankIndex <= 8; rankIndex++) {

            for (var fileIndex = 1; fileIndex <= 8; fileIndex++) {

                newSquares[(9 - rankIndex).toString() + (9 - fileIndex).toString()] =
                {
                    color: squaresAndPieces.squares[rankIndex.toString() + fileIndex.toString()].color,
                    pieceId: squaresAndPieces.squares[rankIndex.toString() + fileIndex.toString()].pieceId,
                    frontVector: {},
                    rearVector: {},
                    leftVector: {},
                    rightVector: {},
                    frontLeftVector: {},
                    frontRightVector: {},
                    rearLeftVector: {},
                    rearRightVector: {},
                    knightVector: {},
                    kingVector: {},
                    possibleMoves: {},
                    squaresAttackedBySquare: {},
                    squaresAttackedBySquareButBlocked: {},
                    attackedByPlayer: {},
                    attackedByPlayerButBlocked: {},
                    attackedByOpponent: {},
                    attackedByOpponentButBlocked: {}
                };
            }
        }

        squaresAndPieces.squares = newSquares;
        setVectorProperties();
    };

    //Todo: whack?
    var getKingRankFile = function (color) {

        var pieceId = color === common.colors.white ? common.pieceIds.whiteKing : common.pieceIds.blackKing;

        for (var loopIndex = 0; loopIndex < Object.keys(squaresAndPieces.squares).length; loopIndex++) {

            if (squaresAndPieces.squares[Object.keys(squaresAndPieces.squares)[loopIndex]].pieceId === pieceId) {

                return Object.keys(squaresAndPieces.squares)[loopIndex];
            }
        }
        return '';
    };
    
    var getPossibleMove = function (sourceId, targetId) {

        if (targetId in squaresAndPieces.squares[sourceId].possibleMoves) {

            return squaresAndPieces.squares[sourceId].possibleMoves[targetId];
        } else {
            return null;
        }
    }

    var capturePieceIfApplicable = function (sourceId, targetId) {

        if (getPossibleMove(sourceId, targetId) === specialMoves.none) {

            if (squareStatus(targetId) !== statuses.open)
                setPieceCaptured(targetId, true);

            return;
        }

        if (getPossibleMove(sourceId, targetId) === specialMoves.enPassant) {

            var squareBehindId = (common.getRank(targetId) - 1).toString() + common.getFile(targetId).toString();
            setPieceCaptured(squareBehindId, true);
            setPieceId(squareBehindId, common.pieceIds.none);
            return;
        }
    };

    var castleKing = function (targetId) {

        var whiteKingTargetId = '17';
        var whiteKingsRookTargetId = '16';
        var whiteKingSourceId = '15';
        var whiteKingsRookSourceId = '18';
        var blackKingTargetId = '12';
        var blackKingsRookTargetId = '13';
        var blackKingSourceId = '14';
        var blackKingsRookSourceId = '11';

        if (targetId === whiteKingTargetId) {   

            setPieceId(whiteKingTargetId, common.pieceIds.whiteKing);
            setPieceId(whiteKingsRookTargetId, common.pieceIds.whiteKingsRook);
            setPieceId(whiteKingSourceId, common.pieceIds.none);
            setPieceId(whiteKingsRookSourceId, common.pieceIds.none);
            setPieceHasMoved(whiteKingTargetId, true);
            setPieceHasMoved(whiteKingsRookTargetId, true);
        }

        if (targetId === blackKingTargetId) {  

            setPieceId(blackKingTargetId, common.pieceIds.blackKing);
            setPieceId(blackKingsRookTargetId, common.pieceIds.blackKingsRook);
            setPieceId(blackKingSourceId, common.pieceIds.none);
            setPieceId(blackKingsRookSourceId, common.pieceIds.none);
            setPieceHasMoved(blackKingTargetId, true);
            setPieceHasMoved(blackKingsRookTargetId, true);
        }
    };

    var castleQueen = function (targetId) {

        var whiteKingTargetId = '13';
        var whiteQueensRookTargetId = '14';
        var whiteKingSourceId = '15';
        var whiteQueensRookSourceId = '11';
        var blackKingTargetId = '16';
        var blackQueensRookTargetId = '15';
        var blackKingSourceId = '14';
        var blackQueensRookSourceId = '18';

        if (targetId === whiteKingTargetId) {

            setPieceId(whiteKingTargetId, common.pieceIds.whiteKing);
            setPieceId(whiteQueensRookTargetId, common.pieceIds.whiteQueensRook);
            setPieceId(whiteKingSourceId, common.pieceIds.none);
            setPieceId(whiteQueensRookSourceId, common.pieceIds.none);
            setPieceHasMoved(whiteKingTargetId, true);
            setPieceHasMoved(whiteQueensRookTargetId, true);
        }

        if (targetId === blackKingTargetId) {

            setPieceId(blackKingTargetId, common.pieceIds.blackKing);
            setPieceId(blackQueensRookTargetId, common.pieceIds.blackQueensRook);
            setPieceId(blackKingSourceId, common.pieceIds.none);
            setPieceId(blackQueensRookSourceId, common.pieceIds.none);
            setPieceHasMoved(blackKingTargetId, true);
            setPieceHasMoved(blackQueensRookTargetId, true);
        }
    };

    var movePieceToNewSquare = function(sourceId, targetId) {

        if (!getPossibleMove(sourceId, targetId)) {

            return;
        }

        capturePieceIfApplicable(sourceId, targetId);

        if (getPossibleMove(sourceId, targetId) === specialMoves.none || getPossibleMove(sourceId, targetId) === specialMoves.enPassant) {

            setPieceId(targetId, getPieceId(sourceId));
            setPieceId(sourceId, common.pieceIds.none);

            setPieceHasMoved(targetId, true);

            setPieceEnPassantEligible(targetId,
                getPieceType(targetId) === common.pieces.pawn && common.getRank(targetId) - common.getRank(sourceId) === 2);
        }

        if (getPossibleMove(sourceId, targetId) === specialMoves.castleKing) {

            castleKing(targetId);
            return;
        }

        if (getPossibleMove(sourceId, targetId) === common.specialMoves.castleQueen) {
            
            castleQueen(targetId);
        }
        
    };
    
    return {
        statuses: statuses,

        val: function (value) { return arguments.length === 0 ? getVal() : setVal(value); },

        color: function (squareId) { return getColor(squareId); },

        pieceId: function (squareId, value) { return arguments.length === 1 ? getPieceId(squareId) : setPieceId(squareId, value); },

        pieceType: function (squareId, value) { return arguments.length === 1 ? getPieceType(squareId) : setPieceType(squareId, value); },

        pieceColor: function (squareId) { return getPieceColor(squareId); },

        squareStatus: function (squareId) { return squareStatus(squareId); },

        getCapturedPieces: function () { return getCapturedPieces(); },

        possibleMoves: function (squareId) { return getPossibleMoves(squareId); },

        setEnPassantIneligibleForPlayer: function () { return setEnPassantIneligibleForPlayer(); },

        changeSquareModelToOtherPlayer: function () { return changeSquareModelToOtherPlayer(); },

        movePieceToNewSquare: function (sourceId, targetId) { return movePieceToNewSquare(sourceId, targetId); }
    };
}
