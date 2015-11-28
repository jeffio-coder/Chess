function Squares() {

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
                playerAttacks: {},
                playerAttacksButBlocked: {},
                opponentAttacks: {},
                opponentAttacksButBlocked: {},
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
        },
        playerKingSquare: '',
        opponentKingSquare: ''
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

    function getVal() {
        return squaresAndPieces;
    };

    function getSquareIds() {

        return Object.keys(squaresAndPieces.squares);
    };

    function getColor(squareId) {
        return squaresAndPieces.squares[squareId].color;
    };

    function getPieceId (squareId) {
        return squaresAndPieces.squares[squareId].pieceId;
    };

    function setPieceId (squareId, value) {
        squaresAndPieces.squares[squareId].pieceId = value;
    };

    function getPieceType (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === '') return '';
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].type;
    };

    function setPieceType (squareId, value) {
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

    function getPieceColor (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === '') return '';
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].color;
    };

    function getPieceHasMoved (squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === false) return false;
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].hasMoved;
    };

    function setPieceHasMoved (squareId, value) {
        if (squaresAndPieces.squares[squareId].pieceId !== '')
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].hasMoved = value;
    };

    function setPieceCaptured (squareId, value) {
        if (squaresAndPieces.squares[squareId].pieceId !== '')
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].captured = value;
    };

    function getPieceEnPassantEligible(squareId) {
        if (squaresAndPieces.squares[squareId].pieceId === '') return false;
        return squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].enPassantEligible;
    };

    function setPieceEnPassantEligible (squareId, value) {
        if (squaresAndPieces.squares[squareId].pieceId !== '')
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].enPassantEligible = value;
    };

    function squareStatus (squareId) {
        return squaresAndPieces.squares[squareId].pieceId === '' ? statuses.open :
            squaresAndPieces.pieces[squaresAndPieces.squares[squareId].pieceId].color === requests.currentPlayer ?
            statuses.occupiedByPlayer : statuses.occupiedByOpponent;
    };

    function squareAttackedByOpponent (squareId) {

        return Object.keys(squaresAndPieces.squares[squareId].attackedByOpponent).length > 0;
    };

    function getPossibleMoves (squareId) {

        return Object.keys(squaresAndPieces.squares[squareId].possibleMoves);
    };

    function getPossibleMove (sourceId, targetId) {

        if (targetId in squaresAndPieces.squares[sourceId].possibleMoves) {

            return squaresAndPieces.squares[sourceId].possibleMoves[targetId];
        } else {
            return null;
        }
    };

    function compare(value1, value2, direction) {

        if (direction > 0) {

            return value1 <= value2;
        } else {
            return value1 >= value2;
        }

    };

    function capturePieceIfApplicable (sourceId, targetId) {

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

    function castleKing(targetId) {

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

    function castleQueen (targetId) {

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

    function movePieceToNewSquare (sourceId, targetId) {

        var possibleMove = getPossibleMove(sourceId, targetId);

        if (possibleMove === null) {

            return false;
        }

        capturePieceIfApplicable(sourceId, targetId);

        if (getPossibleMove(sourceId, targetId) === specialMoves.none || getPossibleMove(sourceId, targetId) === specialMoves.enPassant) {

            setPieceId(targetId, getPieceId(sourceId));
            setPieceId(sourceId, common.pieceIds.none);

            setPieceHasMoved(targetId, true);

            setPieceEnPassantEligible(targetId,
                getPieceType(targetId) === common.pieces.pawn && common.getRank(targetId) - common.getRank(sourceId) === 2);

            return true;
        }

        if (getPossibleMove(sourceId, targetId) === specialMoves.castleKing) {

            castleKing(targetId);

            return true;
        }

        if (getPossibleMove(sourceId, targetId) === specialMoves.castleQueen) {

            castleQueen(targetId);
        }

        return true;
    };

    function setPlayerAttacks (squareId, targetId, blocked, validPieces) {

        if (getPieceType(squareId) === common.pieces.none) return;

        if (getPieceColor(squareId) === requests.currentPlayer && validPieces.indexOf(getPieceType(squareId)) > -1) {

            if (blocked) {

                squaresAndPieces.squares[squareId].playerAttacksButBlocked[targetId] = getPieceId(squareId);
            } else {
                squaresAndPieces.squares[squareId].playerAttacks[targetId] = getPieceId(squareId);
            }
        }
    };

    function setOpponentAttacks(squareId, targetId, blocked, validPieces) {

        if (getPieceType(squareId) === common.pieces.none) return;

        if (getPieceColor(squareId) === requests.currentOpponent && validPieces.indexOf(getPieceType(squareId)) > -1) {

            if (blocked) {

                squaresAndPieces.squares[squareId].opponentAttacksButBlocked[targetId] = getPieceId(squareId);
            } else {
                squaresAndPieces.squares[squareId].opponentAttacks[targetId] = getPieceId(squareId);
            }
        }
    };

    function setAttackedByPlayer (squareId, targetId, blocked, validPieces) {

        if (getPieceType(targetId) === common.pieces.none) return;

        if (getPieceColor(targetId) === requests.currentPlayer && validPieces.indexOf(getPieceType(targetId)) > -1) {

            if (blocked) {

                squaresAndPieces.squares[squareId].attackedByPlayerButBlocked[targetId] = getPieceId(targetId);
            } else {
                squaresAndPieces.squares[squareId].attackedByPlayer[targetId] = getPieceId(targetId);
            }
        }
    };

    function setAttackedByOpponent(squareId, targetId, blocked, validPieces) {

        if (getPieceType(targetId) === common.pieces.none) return;

        if (getPieceColor(targetId) === requests.currentOpponent && validPieces.indexOf(getPieceType(targetId)) > -1) {

            if (blocked) {

                squaresAndPieces.squares[squareId].attackedByOpponentButBlocked[targetId] = getPieceId(targetId);
            } else {
                squaresAndPieces.squares[squareId].attackedByOpponent[targetId] = getPieceId(targetId);
            }
        }
    };

    function traverseStraightVectors (squareId, vectorType, keys, direction) {

        var otherPiece = vectorType === vectorTypes.rankFile ? common.pieces.rook : common.pieces.bishop;

        var start = direction > 0 ? 0 : keys.length - 1;
        var end = direction > 0 ? keys.length - 1 : 0;
        var blocked = false;

        for (var loopIndex = start; compare(loopIndex, end, direction) ; loopIndex += direction) {

            setPlayerAttacks(squareId, keys[loopIndex], blocked, common.pieces.queen + otherPiece);
            setOpponentAttacks(squareId, keys[loopIndex], blocked, common.pieces.queen + otherPiece);
            setAttackedByPlayer(squareId, keys[loopIndex], blocked, common.pieces.queen + otherPiece);
            setAttackedByOpponent(squareId, keys[loopIndex], blocked, common.pieces.queen + otherPiece);

            if (blocked) {

                squaresAndPieces.squares[squareId].squaresAttackedBySquareButBlocked[keys[loopIndex]] = '';
            } else {
                squaresAndPieces.squares[squareId].squaresAttackedBySquare[keys[loopIndex]] = '';
            }

            if (squareStatus(keys[loopIndex]) !== statuses.open) {

                blocked = true;
            }
        }
    };

    function traverseKnightVector(squareId, keys) {

        for (var loopIndex = 0; loopIndex < keys.length; loopIndex++) {

            setPlayerAttacks(squareId, keys[loopIndex], false, common.pieces.knight);
            setOpponentAttacks(squareId, keys[loopIndex], false, common.pieces.knight);
            setAttackedByPlayer(squareId, keys[loopIndex], false, common.pieces.knight);
            setAttackedByOpponent(squareId, keys[loopIndex], false, common.pieces.knight);

            squaresAndPieces.squares[squareId].squaresAttackedBySquare[keys[loopIndex]] = '';
        }
    };

    function traversePawnVector (squareId) {

        var rank = common.getRank(squareId);
        var file = common.getFile(squareId);
        var squareToAttack = '';
        var enPassantSquareToAttack = '';

        if (rank >= 2 && rank <= 7 && getPieceType(squareId) === common.pieces.pawn) {

            if (file >= 2) {

                squareToAttack = (rank + 1).toString() + (file - 1).toString();

                if (getPieceColor(squareId) === requests.currentPlayer && getPieceType(squareId) === common.pieces.pawn) {

                    squaresAndPieces.squares[squareId].playerAttacks[squareToAttack] = getPieceId(squareId);
                }

                setAttackedByOpponent(squareId, squareToAttack, false, common.pieces.pawn);

                enPassantSquareToAttack = (rank).toString() + (file - 1).toString();

                if (getPieceColor(squareId) === requests.currentPlayer && getPieceEnPassantEligible(enPassantSquareToAttack) && getPieceColor(enPassantSquareToAttack) === requests.currentOpponent) {

                    squaresAndPieces.squares[squareId].playerAttacks[squareToAttack] = getPieceId(squareId);
                }
            }

            if (file <= 7) {

                squareToAttack = (rank + 1).toString() + (file + 1).toString();

                if (getPieceColor(squareId) === requests.currentPlayer && getPieceType(squareId) === common.pieces.pawn) {

                    squaresAndPieces.squares[squareId].playerAttacks[squareToAttack] = getPieceId(squareId);
                }

                setAttackedByOpponent(squareId, squareToAttack, false, common.pieces.pawn);

                enPassantSquareToAttack = (rank).toString() + (file + 1).toString();

                if (getPieceColor(squareId) === requests.currentPlayer && getPieceEnPassantEligible(enPassantSquareToAttack) && getPieceColor(enPassantSquareToAttack) === requests.currentOpponent) {

                    squaresAndPieces.squares[squareId].playerAttacks[squareToAttack] = getPieceId(squareId);
                }
            }

            squareToAttack = (rank + 1).toString() + (file).toString();

            if (squareStatus(squareToAttack) === statuses.open) {

                squareToAttack = (rank + 2).toString() + (file).toString();
            }
        }
    };

    function traverseKingVector (squareId, keys) {

        for (var loopIndex = 0; loopIndex < keys.length; loopIndex++) {

            if (!squareAttackedByOpponent(keys[loopIndex])) setPlayerAttacks(squareId, keys[loopIndex], false, common.pieces.king);
            if (!squareAttackedByOpponent(keys[loopIndex])) setOpponentAttacks(squareId, keys[loopIndex], false, common.pieces.king);
            if (!squareAttackedByOpponent(keys[loopIndex])) setAttackedByPlayer(squareId, keys[loopIndex], false, common.pieces.king);
            if (!squareAttackedByOpponent(keys[loopIndex])) setAttackedByOpponent(squareId, keys[loopIndex], false, common.pieces.king);
        }

        // Special code for castling.

        //if (getPieceId(squareId) === common.pieceIds.whiteKing && requests.currentPlayer === common.colors.white) {

        //    var whiteKing = '15';
        //    var whiteKingsRook = '18';
        //    var whiteKingsKnight = '17';
        //    var whiteKingsBishop = '16';
        //    var whiteQueensRook = '11';
        //    var whiteQueensKnight = '12';
        //    var whiteQueensBishop = '13';
        //    var whiteQueen = '14';

        //    if (squareId === whiteKing && !getPieceHasMoved(whiteKing)) {

        //        if (!getPieceHasMoved(whiteKingsRook)
        //            &&
        //            squareStatus(whiteKingsKnight) === statuses.open && !squareAttackedByOpponent(whiteKingsKnight)
        //            &&
        //            squareStatus(whiteKingsBishop) === statuses.open && !squareAttackedByOpponent(whiteKingsBishop)) {

        //            squaresAndPieces.squares[squareId].possibleMoves[whiteKingsKnight] = specialMoves.castleKing;
        //        }

        //        if (!getPieceHasMoved(whiteQueensRook)
        //            &&
        //            squareStatus(whiteQueensKnight) === statuses.open && !squareAttackedByOpponent(whiteQueensKnight)
        //            &&
        //            squareStatus(whiteQueensBishop) === statuses.open && !squareAttackedByOpponent(whiteQueensBishop)
        //            &&
        //            squareStatus(whiteQueen) === statuses.open && !squareAttackedByOpponent(whiteQueen)) {

        //            squaresAndPieces.squares[squareId].possibleMoves[whiteQueensBishop] = specialMoves.castleQueen;
        //        }
        //    }
        //}

        //if (getPieceId(squareId) === common.pieceIds.blackKing && requests.currentPlayer === common.colors.black) {

        //    var blackKing = '14';
        //    var blackKingsRook = '11';
        //    var blackKingsKnight = '12';
        //    var blackKingsBishop = '13';
        //    var blackQueensRook = '18';
        //    var blackQueensKnight = '17';
        //    var blackQueensBishop = '16';
        //    var blackQueen = '15';

        //    if (squareId === blackKing && !getPieceHasMoved(blackKing)) {

        //        if (!getPieceHasMoved(blackKingsRook)
        //            &&
        //            squareStatus(blackKingsKnight) === statuses.open && !squareAttackedByOpponent(blackKingsKnight)
        //            &&
        //            squareStatus(blackKingsBishop) === statuses.open && !squareAttackedByOpponent(blackKingsBishop)) {

        //            squaresAndPieces.squares[squareId].possibleMoves[blackKingsKnight] = specialMoves.castleKing;
        //        }

        //        if (!getPieceHasMoved(blackQueensRook)
        //            &&
        //            squareStatus(blackQueensKnight) === statuses.open && !squareAttackedByOpponent(blackQueensKnight)
        //            &&
        //            squareStatus(blackQueensBishop) === statuses.open && !squareAttackedByOpponent(blackQueensBishop)
        //            &&
        //            squareStatus(blackQueen) === statuses.open && !squareAttackedByOpponent(blackQueen)) {

        //            squaresAndPieces.squares[squareId].possibleMoves[blackQueensBishop] = specialMoves.castleQueen;
        //        }
        //    }
        //}
    };

    function setPossibleMovesStandard(squareId) {

        var key;

        for (var loopIndex = 0; loopIndex < Object.keys(squaresAndPieces.squares[squareId].playerAttacks).length; loopIndex++) {

            key = Object.keys(squaresAndPieces.squares[squareId].playerAttacks)[loopIndex];

            if (getPieceColor(key) !== requests.currentPlayer) {
                squaresAndPieces.squares[squareId].possibleMoves[key] = '';
            }
        }
    };

    function setForwardPossibleMovesPawn(squareId) {

        var key;

        for (var loopIndex = 0; loopIndex < Object.keys(squaresAndPieces.squares[squareId].playerAttacks).length; loopIndex++) {

            key = Object.keys(squaresAndPieces.squares[squareId].playerAttacks)[loopIndex];

            if (getPieceColor(key) === requests.currentOpponent) {
                squaresAndPieces.squares[squareId].possibleMoves[key] = '';
            }
        }

        var rank = common.getRank(squareId);
        var file = common.getFile(squareId);
        var targetSquareId;

        if (rank <= 7) {

            targetSquareId = (rank + 1).toString() + file.toString();

            if (squaresAndPieces.squares[targetSquareId].pieceId === '') {

                squaresAndPieces.squares[squareId].possibleMoves[targetSquareId] = '';

                targetSquareId = (rank + 2).toString() + file.toString();

                if (rank === 2 && squaresAndPieces.squares[targetSquareId].pieceId === '') {

                    squaresAndPieces.squares[squareId].possibleMoves[targetSquareId] = '';
                }
            }
        }

        if (rank === 5) {
        
            if (file <= 7) {
                
                targetSquareId = rank.toString() + (file + 1).toString();

                if (getPieceEnPassantEligible(targetSquareId)) {

                    targetSquareId = (rank + 1).toString() + (file + 1).toString();
                    squaresAndPieces.squares[squareId].possibleMoves[targetSquareId] = '';
                }
            }

            if (file >= 2) {

                targetSquareId = rank.toString() + (file - 1).toString();

                if (getPieceEnPassantEligible(targetSquareId)) {

                    targetSquareId = (rank + 1).toString() + (file - 1).toString();
                    squaresAndPieces.squares[squareId].possibleMoves[targetSquareId] = '';
                }
            }
        }
    };

    function setPossibleMoves(squareId) {

        var pieceType = getPieceType(squareId);

        if (pieceType !== '') {


            if (pieceType !== common.pieces.pawn) {

                setPossibleMovesStandard(squareId);
            } else {
                setForwardPossibleMovesPawn(squareId);
            }

            if (pieceType === common.pieces.king) {
                // todo setPossibleMovesCastle
            }
        }

        // todo Remove moves in check
    };

    function setVectorProperties () {

        var squareIds = getSquareIds();
        var loopIndex;

        for (loopIndex = 0; loopIndex < squareIds.length; loopIndex++) {

            traverseStraightVectors(squareIds[loopIndex], vectorTypes.rankFile, Object.keys(squaresAndPieces.squares[squareIds[loopIndex]].frontVector), 1);
            traverseStraightVectors(squareIds[loopIndex], vectorTypes.rankFile, Object.keys(squaresAndPieces.squares[squareIds[loopIndex]].rearVector), -1);
            traverseStraightVectors(squareIds[loopIndex], vectorTypes.rankFile, Object.keys(squaresAndPieces.squares[squareIds[loopIndex]].leftVector), -1);
            traverseStraightVectors(squareIds[loopIndex], vectorTypes.rankFile, Object.keys(squaresAndPieces.squares[squareIds[loopIndex]].rightVector), 1);
            traverseStraightVectors(squareIds[loopIndex], vectorTypes.diagonal, Object.keys(squaresAndPieces.squares[squareIds[loopIndex]].frontLeftVector), 1);
            traverseStraightVectors(squareIds[loopIndex], vectorTypes.diagonal, Object.keys(squaresAndPieces.squares[squareIds[loopIndex]].frontRightVector), 1);
            traverseStraightVectors(squareIds[loopIndex], vectorTypes.diagonal, Object.keys(squaresAndPieces.squares[squareIds[loopIndex]].rearLeftVector), -1);
            traverseStraightVectors(squareIds[loopIndex], vectorTypes.diagonal, Object.keys(squaresAndPieces.squares[squareIds[loopIndex]].rearRightVector), -1);
            traverseKnightVector(squareIds[loopIndex], Object.keys(squaresAndPieces.squares[squareIds[loopIndex]].knightVector));
            traversePawnVector(squareIds[loopIndex]);
            traverseKingVector(squareIds[loopIndex], Object.keys(squaresAndPieces.squares[squareIds[loopIndex]].kingVector));
            setPossibleMoves(squareIds[loopIndex]);
        }
    };

    function setKingSquares(squareId) {

        if (squaresAndPieces.squares[squareId].pieceId === common.pieceIds.whiteKing) {

            if (requests.currentPlayer === common.colors.white) {

                squaresAndPieces.playerKingSquare = squareId;
            } else {
                squaresAndPieces.opponentKingSquare = squareId;
            }
        }

        if (squaresAndPieces.squares[squareId].pieceId === common.pieceIds.blackKing) {

            if (requests.currentPlayer === common.colors.black) {

                squaresAndPieces.playerKingSquare = squareId;
            } else {
                squaresAndPieces.opponentKingSquare = squareId;
            }
        }
    };

    function setFrontVector(squareId, startRank, file) {

        for (var rank = startRank + 1; rank <= 8; rank++) {
            squaresAndPieces.squares[squareId].frontVector[rank.toString() + file.toString()] = squaresAndPieces.squares[rank.toString() + file.toString()].pieceId;
        }
    };

    function setRearVector(squareId, startRank, file) {

        for (var rank = startRank - 1; rank >= 1; rank--) {
            squaresAndPieces.squares[squareId].rearVector[rank.toString() + file.toString()] = squaresAndPieces.squares[rank.toString() + file.toString()].pieceId;
        }
    };

    function setLeftVector (squareId, rank, startFile) {

        for (var file = startFile - 1; file >= 1; file--) {
            squaresAndPieces.squares[squareId].leftVector[rank.toString() + file.toString()] = squaresAndPieces.squares[rank.toString() + file.toString()].pieceId;
        }
    };

    function setRightVector (squareId, rank, startFile) {

        for (var file = startFile + 1; file <= 8; file++) {
            squaresAndPieces.squares[squareId].rightVector[rank.toString() + file.toString()] = squaresAndPieces.squares[rank.toString() + file.toString()].pieceId;
        }
    };

    function setFrontLeftVector (squareId, startRank, startFile) {

        var rank = startRank + 1, file = startFile - 1;
        while (rank <= 8 && file >= 1) {

            squaresAndPieces.squares[squareId].frontLeftVector[rank.toString() + file.toString()] = squaresAndPieces.squares[rank.toString() + file.toString()].pieceId;
            rank++, file--;
        }
    };

    function setFrontRightVector (squareId, startRank, startFile) {

        var rank = startRank + 1, file = startFile + 1;
        while (rank <= 8 && file <= 8) {

            squaresAndPieces.squares[squareId].frontRightVector[rank.toString() + file.toString()] = squaresAndPieces.squares[rank.toString() + file.toString()].pieceId;
            rank++, file++;
        }
    };

    function setRearLeftVector (squareId, startRank, startFile) {

        var rank = startRank - 1, file = startFile - 1;
        while (rank >= 1 && file >= 1) {

            squaresAndPieces.squares[squareId].rearLeftVector[rank.toString() + file.toString()] = squaresAndPieces.squares[rank.toString() + file.toString()].pieceId;
            rank--, file--;
        }
    };

    function setRearRightVector (squareId, startRank, startFile) {

        var rank = startRank - 1, file = startFile + 1;
        while (rank >= 1 && file <= 8) {

            squaresAndPieces.squares[squareId].rearRightVector[rank.toString() + file.toString()] = squaresAndPieces.squares[rank.toString() + file.toString()].pieceId;
            rank--, file++;
        }
    };

    function setKnightVector (squareId, rank, file) {

        if (rank + 1 <= 8) {

            if (file - 2 >= 1) squaresAndPieces.squares[squareId].knightVector[(rank + 1).toString() + (file - 2).toString()] = squaresAndPieces.squares[(rank + 1).toString() + (file - 2).toString()].pieceId;
            if (file + 2 <= 8) squaresAndPieces.squares[squareId].knightVector[(rank + 1).toString() + (file + 2).toString()] = squaresAndPieces.squares[(rank + 1).toString() + (file + 2).toString()].pieceId;

            if (rank + 2 <= 8) {

                if (file - 1 >= 1) squaresAndPieces.squares[squareId].knightVector[(rank + 2).toString() + (file - 1).toString()] = squaresAndPieces.squares[(rank + 2).toString() + (file - 1).toString()].pieceId;
                if (file + 1 <= 8) squaresAndPieces.squares[squareId].knightVector[(rank + 2).toString() + (file + 1).toString()] = squaresAndPieces.squares[(rank + 2).toString() + (file + 1).toString()].pieceId;
            }
        }

        if (rank - 1 >= 1) {

            if (file - 2 >= 1) squaresAndPieces.squares[squareId].knightVector[(rank - 1).toString() + (file - 2).toString()] = squaresAndPieces.squares[(rank - 1).toString() + (file - 2).toString()].pieceId;
            if (file + 2 <= 8) squaresAndPieces.squares[squareId].knightVector[(rank - 1).toString() + (file + 2).toString()] = squaresAndPieces.squares[(rank - 1).toString() + (file + 2).toString()].pieceId;

            if (rank - 2 >= 1) {

                if (file - 1 >= 1) squaresAndPieces.squares[squareId].knightVector[(rank - 2).toString() + (file - 1).toString()] = squaresAndPieces.squares[(rank - 2).toString() + (file - 1).toString()].pieceId;
                if (file + 1 <= 8) squaresAndPieces.squares[squareId].knightVector[(rank - 2).toString() + (file + 1).toString()] = squaresAndPieces.squares[(rank - 2).toString() + (file + 1).toString()].pieceId;
            }
        }

        if (rank + 1 <= 8) {

            if (file - 2 >= 1) squaresAndPieces.squares[squareId].knightVector[(rank + 1).toString() + (file - 2).toString()] = squaresAndPieces.squares[(rank + 1).toString() + (file - 2).toString()].pieceId;
            if (file + 2 <= 8) squaresAndPieces.squares[squareId].knightVector[(rank + 1).toString() + (file + 2).toString()] = squaresAndPieces.squares[(rank + 1).toString() + (file + 2).toString()].pieceId;

            if (rank + 2 <= 8) {

                if (file - 1 >= 1) squaresAndPieces.squares[squareId].knightVector[(rank + 2).toString() + (file - 1).toString()] = squaresAndPieces.squares[(rank + 2).toString() + (file - 1).toString()].pieceId;
                if (file + 1 <= 8) squaresAndPieces.squares[squareId].knightVector[(rank + 2).toString() + (file + 1).toString()] = squaresAndPieces.squares[(rank + 2).toString() + (file + 1).toString()].pieceId;
            }
        }

        if (rank - 1 >= 1) {

            if (file - 2 >= 1) squaresAndPieces.squares[squareId].knightVector[(rank - 1).toString() + (file - 2).toString()] = squaresAndPieces.squares[(rank - 1).toString() + (file - 2).toString()].pieceId;
            if (file + 2 <= 8) squaresAndPieces.squares[squareId].knightVector[(rank - 1).toString() + (file + 2).toString()] = squaresAndPieces.squares[(rank - 1).toString() + (file + 2).toString()].pieceId;

            if (rank - 2 >= 1) {

                if (file - 1 >= 1) squaresAndPieces.squares[squareId].knightVector[(rank - 2).toString() + (file - 1).toString()] = squaresAndPieces.squares[(rank - 2).toString() + (file - 1).toString()].pieceId;
                if (file + 1 <= 8) squaresAndPieces.squares[squareId].knightVector[(rank - 2).toString() + (file + 1).toString()] = squaresAndPieces.squares[(rank - 2).toString() + (file + 1).toString()].pieceId;
            }
        }
    };

    function setKingVector (squareId, rank, file) {

        if (rank <= 7 && file >= 2) squaresAndPieces.squares[squareId].kingVector[(rank + 1).toString() + (file - 1).toString()] = squaresAndPieces.squares[(rank + 1).toString() + (file - 1).toString()].pieceId;
        if (rank <= 7) squaresAndPieces.squares[squareId].kingVector[(rank + 1).toString() + file.toString()] = squaresAndPieces.squares[(rank + 1).toString() + file.toString()].pieceId;
        if (rank <= 7 && file <= 7) squaresAndPieces.squares[squareId].kingVector[(rank + 1).toString() + (file + 1).toString()] = squaresAndPieces.squares[(rank + 1).toString() + (file + 1).toString()].pieceId;

        if (file >= 2) squaresAndPieces.squares[squareId].kingVector[rank.toString() + (file - 1).toString()] = squaresAndPieces.squares[rank.toString() + (file - 1).toString()].pieceId;
        if (file <= 7) squaresAndPieces.squares[squareId].kingVector[rank.toString() + (file + 1).toString()] = squaresAndPieces.squares[rank.toString() + (file + 1).toString()].pieceId;

        if (rank >= 2 && file >= 2) squaresAndPieces.squares[squareId].kingVector[(rank - 1).toString() + (file - 1).toString()] = squaresAndPieces.squares[(rank - 1).toString() + (file - 1).toString()].pieceId;
        if (rank >= 2) squaresAndPieces.squares[squareId].kingVector[(rank - 1).toString() + file.toString()] = squaresAndPieces.squares[(rank - 1).toString() + file.toString()].pieceId;
        if (rank >= 2 && file <= 7) squaresAndPieces.squares[squareId].kingVector[(rank - 1).toString() + (file + 1).toString()] = squaresAndPieces.squares[(rank - 1).toString() + (file + 1).toString()].pieceId;
    };

    function loadVectors () {

        for (var rank = 1; rank <= 8; rank++) {
            for (var file = 1; file <= 8; file++) {

                setKingSquares(rank.toString() + file.toString());
                setFrontVector(rank.toString() + file.toString(), rank, file);
                setRearVector(rank.toString() + file.toString(), rank, file);
                setLeftVector(rank.toString() + file.toString(), rank, file);
                setRightVector(rank.toString() + file.toString(), rank, file);
                setFrontLeftVector(rank.toString() + file.toString(), rank, file);
                setFrontRightVector(rank.toString() + file.toString(), rank, file);
                setRearLeftVector(rank.toString() + file.toString(), rank, file);
                setRearRightVector(rank.toString() + file.toString(), rank, file);
                setKnightVector(rank.toString() + file.toString(), rank, file);
                setKingVector(rank.toString() + file.toString(), rank, file);
            }
        }
    };

    function setVal (value) {

        squaresAndPieces = value;

        if (squaresAndPieces && Object.keys(squaresAndPieces).length > 0) {
            loadVectors();
            setVectorProperties();
        }
    };

    function setEnPassantIneligibleForPlayer () {

        var key;
        for (var loopIndex = 0; loopIndex < Object.keys(squaresAndPieces.pieces).length; loopIndex++) {

            key = Object.keys(squaresAndPieces.pieces)[loopIndex];

            if (squaresAndPieces.pieces[key].color === requests.currentPlayer && squaresAndPieces.pieces[key].type === common.pieces.pawn)
                squaresAndPieces.pieces[key].enPassantEligible = false;
        }
    };

    function getCapturedPieces () {

        var key;
        var returnPieces = {};

        for (var loopIndex = 0; loopIndex < Object.keys(squaresAndPieces.pieces).length; loopIndex++) {

            key = Object.keys(squaresAndPieces.pieces)[loopIndex];

            if (squaresAndPieces.pieces[key].captured)
                returnPieces[key] = JSON.parse(JSON.stringify(squaresAndPieces.pieces[key]));
        }

        return returnPieces;
    };

    function showTestData (squareId) {

        if (!requests.showTestData) return;

        var sb = '';
        var loopIndex = 0;
        var keys = [];

        sb = 'frontVector: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].frontVector);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + (squaresAndPieces.squares[squareId].frontVector[keys[loopIndex]] === '' ? '' : ': ' + squaresAndPieces.squares[squareId].frontVector[keys[loopIndex]]) + '; ' }
        $('#spanfrontVector').text(sb);

        sb = 'rearVector: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].rearVector);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + (squaresAndPieces.squares[squareId].rearVector[keys[loopIndex]] === '' ? '' : ': ' + squaresAndPieces.squares[squareId].rearVector[keys[loopIndex]]) + '; ' }
        $('#spanrearVector').text(sb);

        sb = 'leftVector: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].leftVector);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + (squaresAndPieces.squares[squareId].leftVector[keys[loopIndex]] === '' ? '' : ': ' + squaresAndPieces.squares[squareId].leftVector[keys[loopIndex]]) + '; ' }
        $('#spanleftVector').text(sb);

        sb = 'rightVector: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].rightVector);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + (squaresAndPieces.squares[squareId].rightVector[keys[loopIndex]] === '' ? '' : ': ' + squaresAndPieces.squares[squareId].rightVector[keys[loopIndex]]) + '; ' }
        $('#spanrightVector').text(sb);

        sb = 'frontLeftVector: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].frontLeftVector);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + (squaresAndPieces.squares[squareId].frontLeftVector[keys[loopIndex]] === '' ? '' : ': ' + squaresAndPieces.squares[squareId].frontLeftVector[keys[loopIndex]]) + '; ' }
        $('#spanfrontLeftVector').text(sb);

        sb = 'frontRightVector: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].frontRightVector);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + (squaresAndPieces.squares[squareId].frontRightVector[keys[loopIndex]] === '' ? '' : ': ' + squaresAndPieces.squares[squareId].frontRightVector[keys[loopIndex]]) + '; ' }
        $('#spanfrontRightVector').text(sb);

        sb = 'rearLeftVector: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].rearLeftVector);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + (squaresAndPieces.squares[squareId].rearLeftVector[keys[loopIndex]] === '' ? '' : ': ' + squaresAndPieces.squares[squareId].rearLeftVector[keys[loopIndex]]) + '; ' }
        $('#spanrearLeftVector').text(sb);

        sb = 'rearRightVector: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].rearRightVector);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + (squaresAndPieces.squares[squareId].rearRightVector[keys[loopIndex]] === '' ? '' : ': ' + squaresAndPieces.squares[squareId].rearRightVector[keys[loopIndex]]) + '; ' }
        $('#spanrearRightVector').text(sb);

        sb = 'knightVector: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].knightVector);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + (squaresAndPieces.squares[squareId].knightVector[keys[loopIndex]] === '' ? '' : ': ' + squaresAndPieces.squares[squareId].knightVector[keys[loopIndex]]) + '; ' }
        $('#spanknightVector').text(sb);

        sb = 'kingVector: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].kingVector);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + (squaresAndPieces.squares[squareId].kingVector[keys[loopIndex]] === '' ? '' : ': ' + squaresAndPieces.squares[squareId].kingVector[keys[loopIndex]]) + '; ' }
        $('#spankingVector').text(sb);

        sb = 'possibleMoves: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].possibleMoves);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + '; ' }
        $('#spanpossibleMoves').text(sb);

        sb = 'squaresAttackedBySquare: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].squaresAttackedBySquare);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + '; ' }
        $('#spansquaresAttackedBySquare').text(sb);

        sb = 'squaresAttackedBySquareButBlocked: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].squaresAttackedBySquareButBlocked);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + '; ' }
        $('#spansquaresAttackedBySquareButBlocked').text(sb);

        sb = 'playerAttacks: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].playerAttacks);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + '; ' }
        $('#spanplayerAttacks').text(sb);

        sb = 'playerAttacksButBlocked: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].playerAttacksButBlocked);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + '; ' }
        $('#spanplayerAttacksButBlocked').text(sb);

        sb = 'opponentAttacks: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].opponentAttacks);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + '; ' }
        $('#spanopponentAttacks').text(sb);

        sb = 'opponentAttacksButBlocked: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].opponentAttacksButBlocked);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + ': ' + '; ' }
        $('#spanopponentAttacksButBlocked').text(sb);

        sb = 'attackedByPlayer: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].attackedByPlayer);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + '; ' }
        $('#spanattackedByPlayer').text(sb);

        sb = 'attackedByPlayerButBlocked: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].attackedByPlayerButBlocked);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + '; ' }
        $('#spanattackedByPlayerButBlocked').text(sb);

        sb = 'attackedByOpponent: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].attackedByOpponent);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + ': ' + squaresAndPieces.squares[squareId].attackedByOpponent[keys[loopIndex]] + '; ' }
        $('#spanattackedByOpponent').text(sb);

        sb = 'attackedByOpponentButBlocked: ';
        keys = Object.keys(squaresAndPieces.squares[squareId].attackedByOpponentButBlocked);
        for (loopIndex = 0; loopIndex < keys.length; loopIndex++) { sb += keys[loopIndex] + ': ' + squaresAndPieces.squares[squareId].attackedByOpponentButBlocked[keys[loopIndex]] + '; ' }
        $('#spanattackedByOpponentButBlocked').text(sb);

        $('#spanplayerKingSquare').text('playerKingSquare: ' + squaresAndPieces.playerKingSquare);
        $('#spanopponentKingSquare').text('opponentKingSquare: ' + squaresAndPieces.opponentKingSquare);
    }

    return {
        statuses: statuses,

        val: function (value) { return arguments.length === 0 ? getVal() : setVal(value); },

        setVectorProperties: function () { return setVectorProperties(); },

        color: function (squareId) { return getColor(squareId); },

        pieceId: function (squareId, value) { return arguments.length === 1 ? getPieceId(squareId) : setPieceId(squareId, value); },

        pieceType: function (squareId, value) { return arguments.length === 1 ? getPieceType(squareId) : setPieceType(squareId, value); },

        pieceColor: function (squareId) { return getPieceColor(squareId); },

        squareStatus: function (squareId) { return squareStatus(squareId); },

        getCapturedPieces: function () { return getCapturedPieces(); },

        possibleMoves: function (squareId) { return getPossibleMoves(squareId); },

        setEnPassantIneligibleForPlayer: function () { return setEnPassantIneligibleForPlayer(); },

        changeSquareModelToOtherPlayer: function() {

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
                        playerAttacks: {},
                        playerAttacksButBlocked: {},
                        opponentAttacks: {},
                        opponentAttacksButBlocked: {},
                        attackedByPlayer: {},
                        attackedByPlayerButBlocked: {},
                        attackedByOpponent: {},
                        attackedByOpponentButBlocked: {}
                    };
                }
            }

            squaresAndPieces.squares = newSquares;
            loadVectors();
            setVectorProperties();
        },

        showTestData: function (squareId) { return showTestData(squareId); },

        movePieceToNewSquare: function (sourceId, targetId) { return movePieceToNewSquare(sourceId, targetId); }
    };
}
