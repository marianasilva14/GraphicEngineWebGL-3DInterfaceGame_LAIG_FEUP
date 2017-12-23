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
	Player==1,
	transformToCoordinates(Row,Col,Piece),
	checkIfCanRemoveX(Board, Col, Row),
	setPiece(Board,Row,Col,'noPiece',BoardOut),
	printFinalBoard(BoardOut).

parse_input(removePiece(Board,Piece,Player),BoardOut):-
	Player==2,
	transformToCoordinates(Row,Col,Piece),
	checkIfCanRemoveY(Board, Col, Row),
	setPiece(Board,Row,Col,'noPiece',BoardOut),
	printFinalBoard(BoardOut).

parse_input(removePiece(Board,Piece,Player),[]).

%invalid move
parse_input(validateGame(Board,Source,Destiny,AreaNumber),[]).

parse_input(pcMove(Board,Player),[BoardOut,PieceDestinyAux,PieceSourceAux]):-
  Player==1,
  listOfPiecesThatHasPossibleMoveX(FinalList,Board),
  length(FinalList,LengthOfList),
  random(0,LengthOfList,Index),
  nth0(Index,FinalList,RowSource-ColSource),
  getPiece(Board,RowSource,ColSource,Piece),
  areaOfPiece(RowSource,ColSource,Area),
  listOfValidDestinyMove(List,RowSource,ColSource,Area,Board),
  length(List,LengthOfList2),
  random(0,LengthOfList2,Index),
  nth0(Index,List,RowDestiny-ColDestiny),
  validateMovePC(Area,ColSource,RowSource,ColDestiny,RowDestiny,Board),
  setPiece(Board,RowSource,ColSource,'noPiece',TmpBoard),
	setPiece(TmpBoard,RowDestiny,ColDestiny,Piece,TmpBoard2),
  transformToCoordinates(RowDestiny,ColDestiny,PieceDestinyAux),
  transformToCoordinates(RowSource,ColSource,PieceSourceAux),
  transformPiece(PieceDestinyAux,PieceDestiny),
  transformPiece(PieceSourceAux,PieceSource),
	PieceDestiny=='noPiece',
	retract(transformPiece(PieceDestinyAux,PieceDestiny)),
	asserta(transformPiece(PieceDestinyAux,PieceSource)),
	printFinalBoard(TmpBoard2),
	boardToNumbers(TmpBoard2,BoardOut).


parse_input(pcMove(Board,Player),[BoardOut,PieceDestinyAux,PieceSourceAux]):-
  Player==1,
  listOfPiecesThatHasPossibleMoveX(FinalList,Board),
  length(FinalList,LengthOfList),
  random(0,LengthOfList,Index),
  nth0(Index,FinalList,RowSource-ColSource),
  getPiece(Board,RowSource,ColSource,Piece),
  areaOfPiece(RowSource,ColSource,Area),
  listOfValidDestinyMove(List,RowSource,ColSource,Area,Board),
  length(List,LengthOfList2),
  random(0,LengthOfList2,Index),
  nth0(Index,List,RowDestiny-ColDestiny),
  validateMovePC(Area,ColSource,RowSource,ColDestiny,RowDestiny,Board),
  setPiece(Board,RowSource,ColSource,'noPiece',TmpBoard),
	setPiece(TmpBoard,RowDestiny,ColDestiny,Piece,TmpBoard2),
  transformToCoordinates(RowDestiny,ColDestiny,PieceDestinyAux),
  transformToCoordinates(RowSource,ColSource,PieceSourceAux),
  transformPiece(PieceDestinyAux,PieceDestiny),
  transformPiece(PieceSourceAux,PieceSource),
	PieceDestiny\='noPiece',
	printFinalBoard(TmpBoard2),
	boardToNumbers(TmpBoard2,BoardOut).


parse_input(pcMove(Board,Player),[BoardOut,PieceDestinyAux,PieceSourceAux]):-
  Player==2,
  listOfPiecesThatHasPossibleMoveY(FinalList,Board),
  length(FinalList,LengthOfList),
  random(0,LengthOfList,Index),
  nth0(Index,FinalList,RowSource-ColSource),
  getPiece(Board,RowSource,ColSource,Piece),
  areaOfPiece(RowSource,ColSource,Area),
  listOfValidDestinyMove(List,RowSource,ColSource,Area,Board),
  length(List,LengthOfList2),
  random(0,LengthOfList2,Index),
  nth0(Index,List,RowDestiny-ColDestiny),
  validateMovePC(Area,ColSource,RowSource,ColDestiny,RowDestiny,Board),
  setPiece(Board,RowSource,ColSource,'noPiece',TmpBoard),
	setPiece(TmpBoard,RowDestiny,ColDestiny,Piece,TmpBoard2),
  transformToCoordinates(RowDestiny,ColDestiny,PieceDestinyAux),
  transformToCoordinates(RowSource,ColSource,PieceSourceAux),
  transformPiece(PieceDestinyAux,PieceDestiny),
  transformPiece(PieceSourceAux,PieceSource),
	PieceDestiny=='noPiece',
	retract(transformPiece(PieceDestinyAux,PieceDestiny)),
	asserta(transformPiece(PieceDestinyAux,PieceSource)),
	printFinalBoard(TmpBoard2),
	boardToNumbers(TmpBoard2,BoardOut).

parse_input(pcMove(Board,Player),[BoardOut,PieceDestinyAux,PieceSourceAux]):-
  Player==2,
  listOfPiecesThatHasPossibleMoveY(FinalList,Board),
  length(FinalList,LengthOfList),
  random(0,LengthOfList,Index),
  nth0(Index,FinalList,RowSource-ColSource),
  getPiece(Board,RowSource,ColSource,Piece),
  areaOfPiece(RowSource,ColSource,Area),
  listOfValidDestinyMove(List,RowSource,ColSource,Area,Board),
  length(List,LengthOfList2),
  random(0,LengthOfList2,Index),
  nth0(Index,List,RowDestiny-ColDestiny),
  validateMovePC(Area,ColSource,RowSource,ColDestiny,RowDestiny,Board),
  setPiece(Board,RowSource,ColSource,'noPiece',TmpBoard),
	setPiece(TmpBoard,RowDestiny,ColDestiny,Piece,TmpBoard2),
  transformToCoordinates(RowDestiny,ColDestiny,PieceDestinyAux),
  transformToCoordinates(RowSource,ColSource,PieceSourceAux),
  transformPiece(PieceDestinyAux,PieceDestiny),
  transformPiece(PieceSourceAux,PieceSource),
	PieceDestiny\='noPiece',
	printFinalBoard(TmpBoard2),
	boardToNumbers(TmpBoard2,BoardOut).


  parse_input(pcMove(Board,Player),[]).
