/**
* CampoBello
*/
const PLAYER1_ID = 1;
const PLAYER2_ID = 2;

const AREA0_ID = 0 ;
const AREA1_ID = 1 ;
const AREA2_ID = 2 ;
const AREA3_ID = 3 ;

const EMPTY=0;
const PIECEX=1;
const PIECEY=2;
const NO_PIECE=3;

function CampoBello(scene,gameMode) {
  CGFobject.call(this,scene);

  this.scene=scene;
  this.gameMode=gameMode;

  this.board= new Array(9);
  this.infoPlay=[];
  this.piecesPlayer1=[1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18];
  this.piecesPlayer2=[19,20,21,22,23,24,25,26,27,28,30,31,32,33,34,35,36];
  this.noPieces=[37,38,39,40];
  this.actualGridAreaP1=0;
  this.actualGridAreaP2=0;
  this.gridAreaPlayer1= [
   {'x':15, 'y':38.5, 'z':45},
   {'x':15, 'y':38.5, 'z':48},
   {'x':17, 'y':38.5, 'z':47},
   {'x':18, 'y':38.5, 'z':47},
   {'x':16, 'y':38.5, 'z':47},
   {'x':17, 'y':38.5, 'z':45},
   {'x':15.7, 'y':38.5, 'z':44},
   {'x':18, 'y':38.5, 'z':44},
   {'x':18, 'y':38.5, 'z':45},
   {'x':18, 'y':38.5, 'z':45},
   {'x':19, 'y':38.5, 'z':46},
   {'x':15, 'y':38.5, 'z':43},
   {'x':18, 'y':38.5, 'z':44},
   {'x':19, 'y':38.5, 'z':47},
   {'x':14, 'y':38.5, 'z':44},
   {'x':15, 'y':38.5, 'z':45},
   {'x':14, 'y':38.5, 'z':46},
   {'x':14, 'y':38.5, 'z':45}
 ];

 this.gridAreaPlayer2= [
   {'x':34, 'y':38.5, 'z':12.5},
 {'x':31, 'y':38.5, 'z':14},
 {'x':32, 'y':38.5, 'z':15},
 {'x':33, 'y':38.5, 'z':11},
 {'x':33.5, 'y':38.5, 'z':10},
 {'x':33, 'y':38.5, 'z':11.5},
 {'x':31, 'y':38.5, 'z':10},
 {'x':32, 'y':38.5, 'z':11},
 {'x':30, 'y':38.5, 'z':11},
 {'x':32, 'y':38.5, 'z':11},
 {'x':32, 'y':38.5, 'z':10},
 {'x':30, 'y':38.5, 'z':11},
 {'x':30, 'y':38.5, 'z':11},
 {'x':33, 'y':38.5, 'z':11.5},
 {'x':32, 'y':38.5, 'z':10.5},
 {'x':30, 'y':38.5, 'z':10},
 {'x':30.5, 'y':38.5, 'z':10},
 {'x':32, 'y':38.5, 'z':10}
 ];

  for(var i=0; i <9;i++){
    this.board[i]=new Array(9);
  }
  this.areas=[];
  this.areas[0]=new Area(scene,PLAYER1_ID,AREA0_ID);
  this.areas[1]=new Area(scene,PLAYER1_ID,AREA1_ID);
  this.areas[2]=new Area(scene,PLAYER2_ID,AREA2_ID);
  this.areas[3]=new Area(scene,PLAYER2_ID,AREA3_ID);

  this.state={
    INITIAL_STATE: 1,
    CHOOSE_ORIGIN:2,
    VALID_MOVEMENT:3,
    MOVEMENT_PC:4,
    REMOVE_PIECE:5,
    CHOOSE_DESTINY:6,
    UPDATE_ANIMATION:7,
    END_GAME:8
  };

  this.currentState=this.state.INITIAL_STATE;
  this.currentPlayer=PLAYER1_ID;
  this.numberOfLoops=0;
  this.game();
};

CampoBello.prototype = Object.create(CGFobject.prototype);
CampoBello.prototype.constructor = CampoBello;

CampoBello.prototype.display=function(){
  for(var i=0; i <= 3; i++){
  this.scene.pushMatrix();
  this.areas[i].display();
  this.scene.popMatrix();
  }

}

function getPrologRequest(requestString, onSuccess, onError, port)
{
  var requestPort = port || 8081
  var request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

  request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
  request.onerror = onError || function(){console.log("Error waiting for response");};

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send();
}

CampoBello.prototype.getInitialBoard=function(){
  var this_t=this;
  getPrologRequest('initialBoard',function(data){

    this_t.board=JSON.parse(data.target.response);
    console.log('aqui no initialBoard', this_t.board);
  });
}

CampoBello.prototype.chooseDestiny=function(){
  if(this.scene.selectObjectDestiny!=0){
    this.currentState=this.state.VALID_MOVEMENT;
    this.game();
  }

}

CampoBello.prototype.areaPiece=function(idPiece) {
  for(var i=0; i< this.areas.length;i++){
    for(var j=1; j < this.areas[i].pieces.length;j++){
      if(this.areas[i].pieces[j].getPickingID()==idPiece){
        return i;
      }
    }
  }
}

CampoBello.prototype.areaPiece_invisible=function(idPiece) {
  for(var i=0; i< this.areas.length;i++){
    for(var j=1; j < this.areas[i].piecesInvisible.length;j++){
      if(this.areas[i].piecesInvisible[j].getPickingID()==idPiece){
        return i;
      }
    }
  }
}


CampoBello.prototype.pieceChoosen=function(pickingId){

for(var i=0; i < this.areas.length;i++){
  console.log(this.areas[i]);
    for(var j=1; j< this.areas[i].pieces.length;j++){
      if(this.areas[i].pieces[j].getPickingID()==pickingId){
        var piece=this.areas[i].pieces[j];
        return piece;
      }
    }
}
}

CampoBello.prototype.pieceChoosen_invisible=function(pickingId){
    var area=this.areaPiece_invisible(pickingId);
    for(var j=1; j< this.areas[area].piecesInvisible.length;j++){
      if(this.areas[area].piecesInvisible[j].getPickingID()==pickingId){
        var piece=this.areas[area].piecesInvisible[j];
        return piece;
      }
    }
}

CampoBello.prototype.createPieceAnimation=function(pieceOrigin,pieceDestiny,coordinates){

  var cpointsOrigin=new Array();
  cpointsOrigin[0]=new Array(4);
  for(var k=0; k < 4;k++){
    cpointsOrigin[0][k]=new Array();
  }
console.log('PECAS',pieceOrigin,pieceDestiny);
  var coordinates_origin= pieceOrigin.coordinates[pieceOrigin.coordinates.length-1][0];
  var coordinates_destiny= pieceDestiny.coordinates[pieceDestiny.coordinates.length-1][0];
  console.log('pieces',coordinates_origin,coordinates_destiny);
  var x=(coordinates_destiny.x-coordinates_origin.x)/2;
  var y=(coordinates_destiny.y-coordinates_origin.y)/2;
  var z=(coordinates_destiny.z-coordinates_origin.z)/2;


  cpointsOrigin[0][0][0]=coordinates_origin.x;
  cpointsOrigin[0][0][1]=coordinates_origin.y;
  cpointsOrigin[0][0][2]=coordinates_origin.z;
  cpointsOrigin[0][1][0]=coordinates_origin.x+x;
  cpointsOrigin[0][1][1]=43;
  cpointsOrigin[0][1][2]=coordinates_origin.z+z;
  cpointsOrigin[0][2][0]=coordinates_origin.x+(2*x);
  cpointsOrigin[0][2][1]=43;
  cpointsOrigin[0][2][2]=coordinates_origin.z+(2*z);
  cpointsOrigin[0][3][0]=coordinates_destiny.x;
  cpointsOrigin[0][3][1]=coordinates_destiny.y;
  cpointsOrigin[0][3][2]=coordinates_destiny.z;

  var animation = new BezierAnimation(this.scene,3,cpointsOrigin,6);
  pieceOrigin.animation=animation;
  pieceOrigin.animationFinished=false;
/*
  var cpointsDestiny=new Array();
  cpointsDestiny[0]=new Array(4);
  for(var k=0; k < 4;k++){
    cpointsDestiny[0][k]=new Array();
  }

    var x2=(coordinates[2].x-coordinates_destiny.x)/2;
    var y2=(coordinates[2].y-coordinates_destiny.y)/2;
    var z2=(coordinates[2].z-coordinates_destiny.z)/2;

      console.log('xyz',x2,y2,z2);

    cpointsDestiny[0][0][0]=coordinates_destiny.x;
    cpointsDestiny[0][0][1]=coordinates_destiny.y;
    cpointsDestiny[0][0][2]=coordinates_destiny.z;

    cpointsDestiny[0][1][0]=coordinates_destiny.x+x2;
    cpointsDestiny[0][1][1]=coordinates_destiny.y+(2*y2);
    cpointsDestiny[0][1][2]=coordinates_destiny.z+z2;

    cpointsDestiny[0][2][0]=coordinates_destiny.x+(2*x2);
    cpointsDestiny[0][2][1]=coordinates_destiny.y+(2*y2);
    cpointsDestiny[0][2][2]=coordinates_destiny.z+(2*z2);

    cpointsDestiny[0][3][0]=coordinates[2].x;
    cpointsDestiny[0][3][1]=coordinates[2].y;
    cpointsDestiny[0][3][2]=coordinates[2].z;

    console.log('pieces22',pieceOrigin,pieceDestiny);

    if(pieceDestiny.getPickingID()<37){
      var animation = new LinearAnimation(this.scene,3,cpointsDestiny,6);
      pieceDestiny.animation=animation;
      pieceDestiny.animationFinished=false;
    }*/

    console.log('cheguei aqui');

}

CampoBello.prototype.pushCoordinates=function(pieceOrigin,pieceDestiny,coordinates){

  var addCoordinates_origin=[
    {'x':pieceDestiny.x,
    'y':pieceDestiny.y,
    'z':pieceDestiny.z}];
  pieceOrigin.coordinates.push(addCoordinates_origin);

  var addCoordinates_destiny=[
    {'x':coordinates.x,
    'y':coordinates.y,
    'z':coordinates.z}];
  pieceDestiny.coordinates.push(addCoordinates_destiny);


  pieceOrigin.x=pieceOrigin.coordinates[pieceOrigin.coordinates.length-1][0].x;
  pieceOrigin.y=pieceOrigin.coordinates[pieceOrigin.coordinates.length-1][0].y;
  pieceOrigin.z=pieceOrigin.coordinates[pieceOrigin.coordinates.length-1][0].z;
  console.log('log',pieceOrigin);
  pieceDestiny.x=pieceDestiny.coordinates[pieceDestiny.coordinates.length-1][0].x;
  pieceDestiny.y=pieceDestiny.coordinates[pieceDestiny.coordinates.length-1][0].y;
  pieceDestiny.z=pieceDestiny.coordinates[pieceDestiny.coordinates.length-1][0].z;
}

CampoBello.prototype.choosePieceToRemove=function(){
  var this_t=this;

  getPrologRequest(
    "removePiece("+JSON.stringify(this_t.board)+","+
    JSON.stringify(this_t.scene.selectObjectOrigin)+","+
    JSON.stringify(this_t.currentPlayer)+")",
    function(data){
    });
}

CampoBello.prototype.movementPC=function(){
    var this_t=this;
      console.log('aqui no MOVEMENT_PC',this_t.board);

    getPrologRequest(
      "pcMove("+JSON.stringify(this_t.board)+","+
      JSON.stringify(this_t.currentPlayer)+")",
      function(data){
        var info=JSON.parse(data.target.response);
        console.log('movementPC',info);
      });

}


CampoBello.prototype.undoMove= function(piecesUndo){

    this.board=piecesUndo[0].lastBoard;
    console.log('AREAS',this.pieceChoosen(piecesUndo[0].pickingIdOrigin));
    console.log('AREAS2',this.pieceChoosen(piecesUndo[0].pickingIdDestiny));
    var pieceOrigin= this.pieceChoosen(piecesUndo[0].pickingIdOrigin);
    var pieceDestiny= this.pieceChoosen(piecesUndo[0].pickingIdDestiny);

    console.log('PECINHAS',pieceOrigin,pieceDestiny);
    var destinyCoordinates=pieceDestiny.coordinates[pieceDestiny.coordinates.length-1][0];
    var lastDestinyCoordinates=pieceDestiny.coordinates[pieceDestiny.coordinates.length-2][0];

    var coordinates=[
      {'x':pieceOrigin.x,
      'y':pieceOrigin.y,
      'z':pieceOrigin.z},
      {'x':destinyCoordinates.x,
      'y':destinyCoordinates.y,
      'z':destinyCoordinates.z},
      {'x':lastDestinyCoordinates.x,
       'y':lastDestinyCoordinates.y,
       'z':lastDestinyCoordinates.z}
     ];

   var coordinatesDestiny=pieceDestiny.coordinates[pieceDestiny.coordinates.length-2][0];
      console.log('coordinatesDestiny',coordinatesDestiny);
     console.log('arguments',pieceDestiny,pieceOrigin,coordinates);
    this.createPieceAnimation(pieceDestiny,pieceOrigin,coordinates);
    this.popCoordinates(pieceDestiny,pieceOrigin,coordinatesDestiny);


}

CampoBello.prototype.popCoordinates=function(pieceDestiny,pieceOrigin,coordinatesDestiny){

  pieceOrigin.coordinates.pop();
  pieceDestiny.coordinates.pop();

  pieceOrigin.x=pieceOrigin.coordinates[pieceOrigin.coordinates.length-1][0].x;
  pieceOrigin.y=pieceOrigin.coordinates[pieceOrigin.coordinates.length-1][0].y;
  pieceOrigin.z=pieceOrigin.coordinates[pieceOrigin.coordinates.length-1][0].z;

  pieceDestiny.x=pieceDestiny.coordinates[pieceDestiny.coordinates.length-1][0].x;
  pieceDestiny.y=pieceDestiny.coordinates[pieceDestiny.coordinates.length-1][0].y;
  pieceDestiny.z=pieceDestiny.coordinates[pieceDestiny.coordinates.length-1][0].z;

  let origin= pieceOrigin.getPickingID();
  pieceOrigin.setPickingID(pieceDestiny.getPickingID());
  pieceDestiny.setPickingID(origin);
  console.log('pieceOrigin',pieceOrigin,pieceDestiny);
}
CampoBello.prototype.validateMove=function(origin, destiny){

  var this_t=this;
  var pieceOrigin_invisible= this.pieceChoosen_invisible(origin.getPickingID());
  var areaOriginPiece=this.areaPiece(origin.getPickingID());
  var lastBoard= this_t.board;
  var destinyCoordinates=[];
  destinyCoordinates[0]=destiny.x;
  destinyCoordinates[1]=destiny.y;
  destinyCoordinates[2]=destiny.z;
  console.log('aqui no validate Move',this_t.board);
  getPrologRequest(
    "validateGame("+JSON.stringify(this_t.board)+","+
    JSON.stringify(origin.getPickingID())+","+
    JSON.stringify(destiny.getPickingID())+","+
    JSON.stringify(areaOriginPiece)+")",
    function(data){
      var info=JSON.parse(data.target.response);
      if(info.length!=0){
        if(this_t.currentPlayer==PLAYER1_ID){
        var coordinates=[
          {'x':origin.x,
          'y':origin.y,
          'z':origin.z},
          {'x':destiny.x,
          'y':destiny.y,
          'z':destiny.z},
          {'x':this_t.gridAreaPlayer1[this_t.actualGridAreaP1].x,
          'y':this_t.gridAreaPlayer1[this_t.actualGridAreaP1].y,
          'z':this_t.gridAreaPlayer1[this_t.actualGridAreaP1].z}
        ];
        this_t.actualGridAreaP1++;
        }
        else {
          var coordinates=[
            {'x':origin.x,
            'y':origin.y,
            'z':origin.z},
            {'x':destiny.x,
            'y':destiny.y,
            'z':destiny.z},
            {'x':this_t.gridAreaPlayer2[this_t.actualGridAreaP2].x,
            'y':this_t.gridAreaPlayer2[this_t.actualGridAreaP2].y,
            'z':this_t.gridAreaPlayer2[this_t.actualGridAreaP2].z}
          ];
          this_t.actualGridAreaP2++;
          }
        console.log('coordinates',coordinates);

        this_t.createPieceAnimation(origin,destiny,coordinates);
        this_t.pushCoordinates(origin,destiny,coordinates[2]);
        let pieceOrigin= origin.getPickingID();
        origin.setPickingID(destiny.getPickingID());
        destiny.setPickingID(pieceOrigin);


        this_t.board=info;

        if(destiny.typeOfPiece==NO_PIECE){
          if(this_t.numberOfLoops!=3){
          this_t.numberOfLoops++;

          }
          else{
            this_t.numberOfLoops=0;
            if(this_t.currentPlayer==PLAYER1_ID)
              this_t.currentPlayer=PLAYER2_ID;
            else
              this_t.currentPlayer=PLAYER1_ID;
          }
        }
        else if(destiny.typeOfPiece!=origin.typeOfPiece){
          this_t.currentState=this_t.state.REMOVE_PIECE;
          if(this_t.currentPlayer==PLAYER1_ID)
            this_t.currentPlayer=PLAYER2_ID;
          else
            this_t.currentPlayer=PLAYER1_ID;
        }
        else{
          if(this_t.currentPlayer==PLAYER1_ID)
            this_t.currentPlayer=PLAYER2_ID;
          else
            this_t.currentPlayer=PLAYER1_ID;
        }

        console.log('origin',origin);




        var addToMatrix=[
          {'pickingIdOrigin':origin.getPickingID(),
          'coordinatesOriginX':origin.x,
          'coordinatesOriginY':origin.y,
          'coordinatesOriginZ':origin.z,
          'coordinatesDestinyX':destinyCoordinates[0],
          'coordinatesDestinyY':destinyCoordinates[1],
          'coordinatesDestinyZ':destinyCoordinates[2],
          'pickingIdDestiny':destiny.getPickingID(),
          'lastBoard':lastBoard}
      ];

      console.log('addToMatrix',addToMatrix);
      this_t.infoPlay.push(addToMatrix);
      }

      this_t.scene.selectObjectOrigin=0;
      this_t.scene.selectObjectDestiny=0;


      pieceOrigin_invisible.setTypeOfPiece(NO_PIECE);

      if(this.currentPlayer==PLAYER1_ID)
      destiny.setTypeOfPiece(PIECEX);
      else {
          destiny.setTypeOfPiece(PIECEY);
      }

      this_t.currentState=this_t.state.CHOOSE_ORIGIN;

    });
  }

CampoBello.prototype.game = function(){
  let this_t=this;
  switch (this.currentState) {
    case this.state.INITIAL_STATE:
    console.log('entreuii');
      this.getInitialBoard();
    if(this.gameMode==XMLscene.gameMode.PLAYER_VS_PLAYER){
    console.log('aquiiii2' ,this_t.board);
    this.currentState=this.state.CHOOSE_ORIGIN;
    this.game();
  }
    else if(this.gameMode==XMLscene.gameMode.PC_VS_PC){
    console.log('aquiiii' ,this_t.board);
    this.currentState=this.state.MOVEMENT_PC;
    this.game();
  }
    break;
    case this.state.CHOOSE_ORIGIN:
    break;
    case this.state.CHOOSE_DESTINY:
    break;
    case this.state.VALID_MOVEMENT:
    var pieceOrigin= this.pieceChoosen(this.scene.selectObjectOrigin);
    if(this.scene.selectObjectDestiny >=37){
      var pieceDestiny=this.pieceChoosen_invisible(this.scene.selectObjectDestiny);
    }
    else {
      var pieceDestiny=this.pieceChoosen(this.scene.selectObjectDestiny);
    }
    console.log('pieceOrigin',pieceOrigin);
    console.log('pieceDestiny',pieceDestiny);
    this.validateMove(pieceOrigin,pieceDestiny);
    break;
    case this.state.MOVEMENT_PC:
    this.movementPC();
    break;
    case this.state.REMOVE_PIECE:
    this.choosePieceToRemove();
      break;
    case this.state.END_GAME:
    break;
    default:
  }
}
