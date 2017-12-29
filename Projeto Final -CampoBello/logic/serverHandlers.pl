:-use_module(library(sockets)).
:-use_module(library(lists)).
:-use_module(library(codesio)).
:-use_module(library(random)).
:-use_module(library(system)).
:- include('campoBello.pl').

parse_input(initialBoard,Board):-
	set_player('playerX'),
	set_mode_game(1),
	initialBoard(TmpBoard),
	boardToNumbers(TmpBoard,Board).

%valid move

parse_input(validateGame(Board,Source,Destiny,AreaNumber),BoardOut):-
	boardToNumbers(TmpBoard,Board),
	transformPiece(Source,Piece),
	transformPiece(Destiny,PieceDestiny),
	transformArea(Area,AreaNumber),
	transformToCoordinates(RowSource,ColSource,Source),
	transformToCoordinates(RowDestiny,ColDestiny,Destiny),
	validateMove(Area,ColSource,RowSource,ColDestiny,RowDestiny,TmpBoard),
	setPiece(TmpBoard,RowSource,ColSource,'noPiece',TmpBoard2),
	setPiece(TmpBoard2,RowDestiny,ColDestiny,Piece,TmpBoard3),
	PieceDestiny=='noPiece',
	retract(transformPiece(Destiny,PieceDestiny)),
	asserta(transformPiece(Destiny,Piece)),
	printFinalBoard(TmpBoard3),
	boardToNumbers(TmpBoard3,BoardOut).

parse_input(validateGame(Board,Source,Destiny,AreaNumber),BoardOut):-
	boardToNumbers(TmpBoard,Board),
	transformPiece(Source,Piece),
	transformPiece(Destiny,PieceDestiny),
	transformArea(Area,AreaNumber),
	transformToCoordinates(RowSource,ColSource,Source),
	transformToCoordinates(RowDestiny,ColDestiny,Destiny),
	validateMove(Area,ColSource,RowSource,ColDestiny,RowDestiny,TmpBoard),
	setPiece(TmpBoard,RowSource,ColSource,'noPiece',TmpBoard2),
	setPiece(TmpBoard2,RowDestiny,ColDestiny,Piece,TmpBoard3),
	PieceDestiny\='noPiece',
	printFinalBoard(TmpBoard3),
	boardToNumbers(TmpBoard3,BoardOut).

parse_input(removePiece(Board,Piece,Player),BoardOut):-
	boardToNumbers(TmpBoard,Board),
	Player==1,
	transformToCoordinates(Row,Col,Piece),
	checkIfCanRemoveX(TmpBoard, Col, Row),
	setPiece(TmpBoard,Row,Col,'noPiece',TmpBoard2),
	printFinalBoard(TmpBoard2),
	boardToNumbers(TmpBoard2,BoardOut).

parse_input(removePiece(Board,Piece,Player),BoardOut):-
	boardToNumbers(TmpBoard,Board),
	Player==2,
	transformToCoordinates(Row,Col,Piece),
	checkIfCanRemoveY(TmpBoard, Col, Row),
	setPiece(TmpBoard,Row,Col,'noPiece',TmpBoard2),
	printFinalBoard(TmpBoard2),
	boardToNumbers(TmpBoard2,BoardOut).

parse_input(removePiece(Board,Piece,Player),[]).

%invalid move
parse_input(validateGame(Board,Source,Destiny,AreaNumber),[]).

parse_input(pcMove(Board,Player),[BoardOut,PieceDestinyAux,PieceSourceAux]):-
	boardToNumbers(TmpBoard,Board),
  Player==1,
	listOfPiecesThatHasPossibleMoveX(FinalList,TmpBoard),
	eliminatePieceOnList(FinalList,FinalList2),
	length(FinalList2,LengthOfList),
	random(0,LengthOfList,Index),
	nth0(Index,FinalList2,RowSource-ColSource),
	getPiece(TmpBoard,RowSource,ColSource,Piece),
	areaOfPiece(RowSource,ColSource,Area),
	listOfValidDestinyMove(List,RowSource,ColSource,Area,TmpBoard),
	eliminatePieceOnList(List,List2),
	length(List2,LengthOfList2),
	random(0,LengthOfList2,Index2),
	nth0(Index2,List2,RowDestiny-ColDestiny),
	validateMovePC(Area,ColSource,RowSource,ColDestiny,RowDestiny,TmpBoard),
	setPiece(TmpBoard,RowSource,ColSource,'noPiece',TmpBoard2),
	setPiece(TmpBoard2,RowDestiny,ColDestiny,Piece,TmpBoard3),
	transformToCoordinates(RowDestiny,ColDestiny,PieceDestinyAux),
	transformToCoordinates(RowSource,ColSource,PieceSourceAux),
	transformPiece(PieceDestinyAux,PieceDestiny),
	transformPiece(PieceSourceAux,PieceSource),
	PieceDestiny=='noPiece',
	retract(transformPiece(PieceDestinyAux,PieceDestiny)),
	asserta(transformPiece(PieceDestinyAux,PieceSource)),
	printFinalBoard(TmpBoard3),
	boardToNumbers(TmpBoard3,BoardOut).

parse_input(pcMove(Board,Player),[BoardOut,PieceDestinyAux,PieceSourceAux]):-
	boardToNumbers(TmpBoard,Board),
  Player==1,
	listOfPiecesThatHasPossibleMoveX(FinalList,TmpBoard),
	eliminatePieceOnList(FinalList,FinalList2),
	length(FinalList2,LengthOfList),
	random(0,LengthOfList,Index),
	nth0(Index,FinalList2,RowSource-ColSource),
	getPiece(TmpBoard,RowSource,ColSource,Piece),
	areaOfPiece(RowSource,ColSource,Area),
	listOfValidDestinyMove(List,RowSource,ColSource,Area,TmpBoard),
	eliminatePieceOnList(List,List2),
	length(List2,LengthOfList2),
	random(0,LengthOfList2,Index2),
	nth0(Index2,List2,RowDestiny-ColDestiny),
	validateMovePC(Area,ColSource,RowSource,ColDestiny,RowDestiny,TmpBoard),
	setPiece(TmpBoard,RowSource,ColSource,'noPiece',TmpBoard2),
	setPiece(TmpBoard2,RowDestiny,ColDestiny,Piece,TmpBoard3),
	transformToCoordinates(RowDestiny,ColDestiny,PieceDestinyAux),
	transformToCoordinates(RowSource,ColSource,PieceSourceAux),
	transformPiece(PieceDestinyAux,PieceDestiny),
	transformPiece(PieceSourceAux,PieceSource),
	PieceDestiny\='noPiece',
	printFinalBoard(TmpBoard3),
	boardToNumbers(TmpBoard3,BoardOut).


parse_input(pcMove(Board,Player),[BoardOut,PieceDestinyAux,PieceSourceAux]):-
	boardToNumbers(TmpBoard,Board),
	Player==2,
	listOfPiecesThatHasPossibleMoveY(FinalList,TmpBoard),
	eliminatePieceOnList(FinalList,FinalList2),
	length(FinalList2,LengthOfList),
	random(0,LengthOfList,Index),
	nth0(Index,FinalList2,RowSource-ColSource),
	getPiece(TmpBoard,RowSource,ColSource,Piece),
	areaOfPiece(RowSource,ColSource,Area),
	listOfValidDestinyMove(List,RowSource,ColSource,Area,TmpBoard),
	eliminatePieceOnList(List,List2),
	length(List2,LengthOfList2),
	random(0,LengthOfList2,Index2),
	nth0(Index2,List2,RowDestiny-ColDestiny),
	validateMovePC(Area,ColSource,RowSource,ColDestiny,RowDestiny,TmpBoard),
	setPiece(TmpBoard,RowSource,ColSource,'noPiece',TmpBoard2),
	setPiece(TmpBoard2,RowDestiny,ColDestiny,Piece,TmpBoard3),
	transformToCoordinates(RowDestiny,ColDestiny,PieceDestinyAux),
	transformToCoordinates(RowSource,ColSource,PieceSourceAux),
	transformPiece(PieceDestinyAux,PieceDestiny),
	transformPiece(PieceSourceAux,PieceSource),
	PieceDestiny=='noPiece',
	retract(transformPiece(PieceDestinyAux,PieceDestiny)),
	asserta(transformPiece(PieceDestinyAux,PieceSource)),
	printFinalBoard(TmpBoard3),
	boardToNumbers(TmpBoard3,BoardOut).

parse_input(pcMove(Board,Player),[BoardOut,PieceDestinyAux,PieceSourceAux]):-
	boardToNumbers(TmpBoard,Board),
	Player==2,
	listOfPiecesThatHasPossibleMoveY(FinalList,TmpBoard),
	eliminatePieceOnList(FinalList,FinalList2),
	length(FinalList2,LengthOfList),
	random(0,LengthOfList,Index),
	nth0(Index,FinalList2,RowSource-ColSource),
	getPiece(TmpBoard,RowSource,ColSource,Piece),
	areaOfPiece(RowSource,ColSource,Area),
	listOfValidDestinyMove(List,RowSource,ColSource,Area,TmpBoard),
	eliminatePieceOnList(List,List2),
	length(List2,LengthOfList2),
	random(0,LengthOfList2,Index2),
	nth0(Index2,List2,RowDestiny-ColDestiny),
	validateMovePC(Area,ColSource,RowSource,ColDestiny,RowDestiny,TmpBoard),
	setPiece(TmpBoard,RowSource,ColSource,'noPiece',TmpBoard2),
	setPiece(TmpBoard2,RowDestiny,ColDestiny,Piece,TmpBoard3),
	transformToCoordinates(RowDestiny,ColDestiny,PieceDestinyAux),
	transformToCoordinates(RowSource,ColSource,PieceSourceAux),
	transformPiece(PieceDestinyAux,PieceDestiny),
	transformPiece(PieceSourceAux,PieceSource),
	PieceDestiny\='noPiece',
	printFinalBoard(TmpBoard3),
	boardToNumbers(TmpBoard3,BoardOut).


parse_input(pcMove(Board,Player),[]).

parse_input(pcRemovePiece(Board,Player),[PieceToRemove,BoardOut]):-
	boardToNumbers(TmpBoard,Board),
	Player==1,
	listOfPiecesThatCanRemoveX(TmpBoard,List),
	length(List,LengthOfList),
	random(0,LengthOfList,Index),
	nth0(Index,List,Row-Col),
	transformToCoordinates(Row,Col,PieceToRemove),
	setPiece(TmpBoard,Row,Col,'noPiece',TmpBoard2),
	printFinalBoard(TmpBoard2),
	boardToNumbers(TmpBoard2,BoardOut).

parse_input(pcRemovePiece(Board,Player),[PieceToRemove,BoardOut]):-
	boardToNumbers(TmpBoard,Board),
	Player==2,
	listOfPiecesThatCanRemoveY(TmpBoard,List),
	length(List,LengthOfList),
	random(0,LengthOfList,Index),
	nth0(Index,List,Row-Col),
	write(Col),
	transformToCoordinates(Row,Col,PieceToRemove),
	setPiece(TmpBoard,Row,Col,'noPiece',TmpBoard2),
	printFinalBoard(TmpBoard2),
	boardToNumbers(TmpBoard2,BoardOut).

parse_input(pcRemovePiece(Board,Player),[]).

parse_input(checkEndGame(Board),Value):-
		boardToNumbers(TmpBoard,Board),
		checkEndGame(TmpBoard,Value),
		write(Value).


parse_input(getWinner(Board),Winner):-
	boardToNumbers(TmpBoard,Board),
	calculatePoints(TmpBoard,PointsX,PointsY),
	if_then_else(PointsX@>PointsY,(Winner is 2),(Winner is 1)).
