:-use_module(library(lists)).
:-use_module(library(random)).
:-use_module(library(system)).

%Predicate that returns a list with parts that have possible moves
listOfPiecesThatHasPossibleMoveX(FinalList,Board):-
  saveElements(Board,'pieceX',ListOfDestiny),
  scrollList(ListOfDestiny,FinalList,Board).

%Predicate that returns a list with parts that have possible moves
listOfPiecesThatHasPossibleMoveY(FinalList,Board):-
saveElements(Board,'pieceY',ListOfDestiny),
scrollList(ListOfDestiny,FinalList,Board).

%Predicate that walks through a list filling them with positions that have possible moves.
scrollList([],[],_).
scrollList([Nrow-Ncol|Rest], FinalList,Board):-
if_then_else(areaX1(Nrow,Ncol),Area='areaX1',
(if_then_else(areaX2(Nrow,Ncol),Area='areaX2',
(if_then_else(areaY1(Nrow,Ncol),Area='areaY1',
(if_then_else(areaY2(Nrow,Ncol),Area='areaY2',Area='areaX1'))))))),
if_then_else(
% IF
(validateMovePC(Area,Ncol,Nrow,Col,Row,Board)),
% THEN
(scrollList(Rest, List_Temp,Board), append(List_Temp, [Nrow-Ncol], FinalList)),
% ELSE
scrollList(Rest, FinalList,Board)).

%Predicate that returns a list with valid target moves
listOfValidDestinyMove(List,LastRow,LastCol,Area,Board) :-
if_then_else(setof(Nrow-Ncol,validateMovePC(Area,LastCol,LastRow,Ncol,Nrow,Board),List),true,
findall(Nrow-Ncol,validateMovePC(Area,LastCol,LastRow,Ncol,Nrow,Board),List)).

%Predicate that checks which pieces the player can choose to move
validateSourcePiece(Ncol, Nrow,Board,Piece) :- getPiece(Board, Nrow, Ncol, Piece),
user_is(Curr_user),
player(Curr_player),
mode_game(Curr_mode),
if_then_else(Curr_mode==1,if_then_else(Curr_player=='playerX',
Piece \= 'pieceY',
Piece \= 'pieceX'),
if_then_else(Curr_user='pcX',
Piece \= 'pieceY',
Piece \= 'pieceX')),
Piece \= 'empty',
Piece \= 'noPiece'.

%Predicate that verifies the valid movements
validateDestinyPiece(LastCol,LastRow,Ncol,Nrow,Board, Piece,Area,BoardOut) :- if_then_else(Piece=='pieceX',
checkIfCanMoveX(Ncol, Nrow, LastCol,LastRow,Board,Piece,BoardOut,Area),
checkIfCanMoveY(Ncol, Nrow, LastCol,LastRow,Board,Piece,BoardOut,Area)).

%Predicate that the piece to which it jumped is a noPiece and in case it is asked to jump again.
checkIfIsNotNoPiece(Board,BoardOut,LastColPiece,LastRowPiece,Row,Col,FinalRow,FinalCol,Piece,Area,NewContinue):-repeat,
chooseNewJump(Board,BoardOut,LastColPiece,LastRowPiece,Row, Col,FinalRow,FinalCol,Piece,Area,NewContinue),
if_then_else(NewContinue\=1,
(getPiece(BoardOut, FinalRow, FinalCol, SecondPiece),
SecondPiece \= 'noPiece'),true).

%Predicate that calls the function responsible for printing the board after a new jump.
printBoardAfterJump(Row,Col,LastRow,LastCol,Board,BoardOut,Piece) :- setPiece(Board,LastRow,LastCol,'noPiece',BoardOut2),
setPiece(BoardOut2,Row,Col,Piece,BoardOut),
printFinalBoard(BoardOut),nl.

%Predicate that checks if it did not jump to the same piece in the same movement.
checkIfIsNotRedo(LastColPiece,LastRowPiece,ColPiece,RowPiece):-LastColPiece==ColPiece,
LastRowPiece==RowPiece.

%Predicate that returns a list of the parts that the X computer can remove
listOfPiecesThatCanRemoveX(Board,List):-if_then_else(setof(Nrow-Ncol,checkIfCanRemoveX(Board,Ncol,Nrow),List),true,
findall(Nrow-Ncol,checkIfCanRemoveX(Board,Ncol,Nrow),List)).

%Predicate that returns a list of the parts that the X computer can remove
listOfPiecesThatCanRemoveY(Board,List):-if_then_else(setof(Nrow-Ncol,checkIfCanRemoveY(Board,Ncol,Nrow),List),true,
findall(Nrow-Ncol,checkIfCanRemoveY(Board,Ncol,Nrow),List)).

%Predicate that tests whether the piece chosen by player X to remove is one of his own pieces.
checkIfCanRemoveX(Board, Col, Row) :- getPiece(Board, Row, Col, NewPiece),
NewPiece \= 'empty',
NewPiece \= 'pieceY',
NewPiece \= 'noPiece'.

%Predicate that tests whether the piece chosen by player X to remove is one of his own pieces.
checkIfCanRemoveY(Board, Col, Row) :- getPiece(Board, Row, Col, NewPiece),
NewPiece \= 'empty',
NewPiece \= 'pieceX',
NewPiece \= 'noPiece'.

%Predicate that returns the part in a given row and column.
getPiece(Board, Nrow, Ncol, Piece) :-  getElement(Board,Nrow,Ncol,Piece).

%Predicate that changes a certain piece in the board and updates the new board.
setPiece(BoardIn, Nrow, Ncol, Piece, BoardOut) :- setOnRow(Nrow, BoardIn, Ncol, Piece, BoardOut).

%Predicate that changes the part on the board in a certain line
setOnRow(1, [Row|Remainder], Ncol, Piece, [Newrow|Remainder]):- setOnCol(Ncol, Row, Piece, Newrow).
setOnRow(Pos, [Row|Remainder], Ncol, Piece, [Row|Newremainder]):- Pos @> 1,
Next is Pos-1,
setOnRow(Next, Remainder, Ncol, Piece, Newremainder).
%Predicate that changes the part on the board in a given column
setOnCol(1, [_|Remainder], Piece, [Piece|Remainder]).
setOnCol(Pos, [X|Remainder], Piece, [X|Newremainder]):- Pos @> 1,
Next is Pos-1,
setOnCol(Next, Remainder, Piece, Newremainder).
%Predicate that does an if than else
if_then_else(If, Then,_):- If,!, Then.
if_then_else(_, _, Else):- Else.

%Predicate that returns the element that is contained in the tray in a given column and row.
getElement(Board,Nrow,Ncol,Element) :- nth1(Nrow, Board, Row),
nth1(Ncol,Row,Element).

%Predicate that checks if is in area X1
areaX1(Nrow,Ncol):- (Ncol@>1,
Ncol@<6,
Nrow@>0,
Nrow@<5).
%Predicate that checks if is in area X2
areaX2(Nrow,Ncol):- (Ncol@>0,
Ncol@<5,
Nrow@>4,
Nrow@<9).

%Predicate that checks if is in area Y1
areaY1(Nrow,Ncol):- (Ncol@>5,
Ncol@<10,
Nrow@>1,
Nrow@<6).

%Predicate that checks if is in area Y2
areaY2(Nrow,Ncol):-(Ncol@>4,
Ncol@<9,
Nrow@>5,
Nrow@<10).

%Predicate that checks if is the area of playerX
areaX(Nrow,Ncol):- (Ncol@>1,
Ncol@<6,
Nrow@>0,
Nrow@<5);
(Ncol@>0,
Ncol@<5,
Nrow@>4,
Nrow@<9).

%Predicate that checks if is the area of playerY
areaY(Nrow,Ncol):- (Ncol@>5,
Ncol@<10,
Nrow@>1,
Nrow@<6);
(Ncol@>4,
Ncol@<9,
Nrow@>5,
Nrow@<10).

%Predicate thata does a list with the pieces of the player
saveElements(Board,'pieceX',List):- if_then_else(setof(Nrow-Ncol,getElement(Board,Nrow,Ncol,'pieceX'),List),
true,findall(Nrow-Ncol,getElement(Board,Nrow,Ncol,'pieceX'),List)).
saveElements(Board,'pieceY',List):- if_then_else(setof(Nrow-Ncol,getElement(Board,Nrow,Ncol,'pieceY'),List),
true,findall(Nrow-Ncol,getElement(Board,Nrow,Ncol,'pieceY'),List)).

%Predicatethat checks which area the piece is in and calculate the points
getNrowNcol([],PointsXIn,PointsXOut,'playerX').
getNrowNcol([],PointsYIn,PointsYOut,'playerY').
getNrowNcol([Nrow-Ncol|Rest],PointsXIn,PointsXOut,'playerX'):-
if_then_else(areaX(Nrow,Ncol),PointsXOut is PointsXIn+3,
PointsXOut is PointsXIn+1),nl,
getNrowNcol(Rest,PointsXOut,PointsXOutNew,'playerX').
getNrowNcol([Nrow-Ncol|Rest],PointsYIn,PointsYOut,'playerY'):-
if_then_else(areaY(Nrow,Ncol),PointsYOut is PointsYIn+3,
PointsYOut is PointsYIn+1),
getNrowNcol(Rest,PointsYOut,PointsYOutNew,'playerY').

%Predicate that checks if the playerX has pieces on the board
checkIfExistsPiecesX(Board) :- saveElements(Board,'pieceX',List),
saveElements(Board,'pieceX',List2),
append(List,List2,FinalList),
length(FinalList,LengthOfFinalList),
if_then_else(LengthOfFinalList==0,fail,true).

%Predicate that checks if the playerY has pieces on the board
checkIfExistsPiecesY(Board) :-  saveElements(Board,'pieceY',List),
saveElements(Board,'pieceY',List2),
append(List,List2,FinalList),
length(FinalList,LengthOfFinalList),
if_then_else(LengthOfFinalList==0,fail,true).

%Predicate that checks if is the end of the game
endGame(Board) :-
  listOfPiecesThatHasPossibleMoveX(FinalList,Board),
  eliminatePieceOnList(FinalList,FinalList4),
  length(FinalList4,LengthOfFinalList),
  listOfPiecesThatHasPossibleMoveY(FinalList2,Board),
  eliminatePieceOnList(FinalList2,FinalList3),
  length(FinalList3,LengthOfFinalList2),
  (if_then_else(checkIfExistsPiecesY(Board),fail,true);
  if_then_else(checkIfExistsPiecesX(Board),fail,true);
  if_then_else(LengthOfFinalList==0,true,fail);
  if_then_else(LengthOfFinalList2==0,true,fail)).

checkEndGame(Board,Value):-
		if_then_else(endGame(Board),(Value is 1),(Value is 0)),
    write(Value).

%Predicate that calculates the points of each player
calculatePoints(Board,PointsX,PointsY):- saveElements(Board,'pieceX',FinalListX),
getNrowNcol(FinalListX,0,PointsX,'playerX'),
length(FinalListX,LengthOfFinalListX),
if_then_else(LengthOfFinalListX==0,PointsX is 0,true),
saveElements(Board,'pieceY',FinalListY),
getNrowNcol(FinalListY,0,PointsY,'playerY'),
length(FinalListY,LengthOfFinalListY),
if_then_else(LengthOfFinalListY==0,PointsY is 0,true),
nl,
write('Points of playerX:'), write(PointsX),nl,
write('Points of playerY:'), write(PointsY),nl.

%Predicate that checks the winner of the game
checkWinner(Board) :- calculatePoints(Board,PointsX,PointsY),
if_then_else(PointsX@>PointsY,write('The winner is PlayerY'),write('The winner is PlayerX')).
