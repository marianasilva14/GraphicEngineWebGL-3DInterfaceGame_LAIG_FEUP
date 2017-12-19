%Predicate that read a char
getChar(Input) :- get_char(_Input),
                  get_char(Input).

%Predicate that read a number
getCode(Input) :- get_code(_TempInput),
                  get_code(TempInput),
                  Input is TempInput - 48.

:-dynamic player/1.
:-dynamic mode_game/1.
:-dynamic user_is/1.
:-dynamic level/1.

mode_game(1).
player(playerX).
user_is(player).
level(1).

%Predicate that sets the player
set_player(Player):-
  nonvar(Player),
  retract(player(_)),
  asserta(player(Player)).

%Predicate that sets the mode game
set_mode_game(Newmode):-
  nonvar(Newmode),
  integer(Newmode),
  retract(mode_game(_)),
  asserta(mode_game(Newmode)).

%Predicate that sets the user
set_user_is(NewPlayer):-
  nonvar(NewPlayer),
  retract(user_is(_)),
  asserta(user_is(NewPlayer)).

%Predicate that sets the level
set_level(Level):-
    nonvar(Level),
    integer(Level),
    retract(level(_)),
    asserta(level(Level)).

%Predicate that converts each letter into its respective number
    letterToNumber('A',1).
    letterToNumber('B',2).
    letterToNumber('C',3).
    letterToNumber('D',4).
    letterToNumber('E',5).
    letterToNumber('F',6).
    letterToNumber('G',7).
    letterToNumber('H',8).
    letterToNumber('I',9).

%Predicate that converts each number into its respective letter
    numberToLetter(1,'A').
    numberToLetter(2,'B').
    numberToLetter(3,'C').
    numberToLetter(4,'D').
    numberToLetter(5,'E').
    numberToLetter(6,'F').
    numberToLetter(7,'G').
    numberToLetter(8,'H').
    numberToLetter(9,'I').

%AREA 0
    transformToCoordinates(1,2,3).
    transformToCoordinates(1,3,2).
    transformToCoordinates(1,4,1).
    transformToCoordinates(1,5,0).
    transformToCoordinates(2,3,4).
    transformToCoordinates(2,4,5).
    transformToCoordinates(2,5,6).
    transformToCoordinates(3,4,8).
    transformToCoordinates(3,5,7).
    transformToCoordinates(4,5,9).

%AREA 1
    transformToCoordinates(5,1,10).
    transformToCoordinates(5,2,16).
    transformToCoordinates(5,3,17).
    transformToCoordinates(5,4,19).
    transformToCoordinates(6,1,11).
    transformToCoordinates(6,2,15).
    transformToCoordinates(6,3,18).
    transformToCoordinates(7,1,12).
    transformToCoordinates(7,2,14).
    transformToCoordinates(8,1,13).

%AREA 2

    transformToCoordinates(6,5,29).
    transformToCoordinates(7,5,27).
    transformToCoordinates(7,6,28).
    transformToCoordinates(8,5,26).
    transformToCoordinates(8,6,25).
    transformToCoordinates(8,7,24).
    transformToCoordinates(9,5,20).
    transformToCoordinates(9,6,21).
    transformToCoordinates(9,7,22).
    transformToCoordinates(9,8,23).

%AREA 3

    transformToCoordinates(2,9,33).
    transformToCoordinates(3,8,34).
    transformToCoordinates(3,9,32).
    transformToCoordinates(4,7,38).
    transformToCoordinates(4,8,35).
    transformToCoordinates(4,9,31).
    transformToCoordinates(5,7,37).
    transformToCoordinates(5,8,36).
    transformToCoordinates(5,9,30).
    transformToCoordinates(5,6,39).

%PIECEX
    transformPiece(0,'pieceX').
    transformPiece(1,'pieceX').
    transformPiece(2,'pieceX').
    transformPiece(3,'pieceX').
    transformPiece(4,'pieceX').
    transformPiece(5,'pieceX').
    transformPiece(6,'pieceX').
    transformPiece(7,'pieceX').
    transformPiece(8,'pieceX').
    transformPiece(9,'pieceX').
    transformPiece(10,'pieceX').
    transformPiece(11,'pieceX').
    transformPiece(12,'pieceX').
    transformPiece(13,'pieceX').
    transformPiece(14,'pieceX').
    transformPiece(15,'pieceX').
    transformPiece(16,'pieceX').
    transformPiece(17,'pieceX').

%PIECEY
    transformPiece(18,'pieceY').
    transformPiece(19,'pieceY').
    transformPiece(20,'pieceY').
    transformPiece(21,'pieceY').
    transformPiece(22,'pieceY').
    transformPiece(23,'pieceY').
    transformPiece(24,'pieceY').
    transformPiece(25,'pieceY').
    transformPiece(26,'pieceY').
    transformPiece(27,'pieceY').
    transformPiece(28,'pieceY').
    transformPiece(29,'pieceY').
    transformPiece(30,'pieceY').
    transformPiece(31,'pieceY').
    transformPiece(32,'pieceY').
    transformPiece(33,'pieceY').
    transformPiece(34,'pieceY').
    transformPiece(35,'pieceY').

  boardToNumbers([], []).
  boardToNumbers([List | R], [NumberList | Numbers]):-
  boardToNumbersLine(List, NumberList),
  boardToNumbers(R, Numbers).

  boardToNumbersLine([], []).
  boardToNumbersLine([Element | Rest], [Number | NumberRest]):-
  atomString(Element,Number),
  boardToNumbersLine(Rest, NumberRest).

  atomString(empty, 0).
  atomString(pieceX, 1).
  atomString(pieceY, 2).
  atomString(noPiece, 3).

  transformArea('areaX1',0).
  transformArea('areaX2',1).
  transformArea('areaY1',2).
  transformArea('areaY2',3).

%Predicate copying one board to another
duplicate(_Old,_New):-fail.
duplicate(_Old,_Old).