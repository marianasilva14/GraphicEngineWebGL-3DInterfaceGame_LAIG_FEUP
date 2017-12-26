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

CampoBello.prototype.createPieceAnimation=function(){
  this.currentState=this.state.UPDATE_ANIMATION;
  var pieceOrigin= this.pieceChoosen(this.scene.selectObjectOrigin);

  if(this.scene.selectObjectDestiny >=37){
    var pieceDestiny=this.pieceChoosen_invisible(this.scene.selectObjectDestiny);
  }
  else {
    var pieceDestiny=this.pieceChoosen(this.scene.selectObjectDestiny);
  }


  var cpointsOrigin=new Array();
  cpointsOrigin[0]=new Array(4);
  for(var k=0; k < 4;k++){
    cpointsOrigin[0][k]=new Array();
  }

  cpointsOrigin[0][0][0]=pieceOrigin.x;
  cpointsOrigin[0][0][1]=pieceOrigin.y;
  cpointsOrigin[0][0][2]=pieceOrigin.z;
  cpointsOrigin[0][1][0]=pieceOrigin.x+1;
  cpointsOrigin[0][1][1]=43;
  cpointsOrigin[0][1][2]=pieceOrigin.z+1;
  cpointsOrigin[0][2][0]=pieceOrigin.x+1.5;
  cpointsOrigin[0][2][1]=43;
  cpointsOrigin[0][2][2]=pieceOrigin.z+1.5;
  cpointsOrigin[0][3][0]=pieceDestiny.x;
  cpointsOrigin[0][3][1]=pieceDestiny.y;
  cpointsOrigin[0][3][2]=pieceDestiny.z;

  var animation = new BezierAnimation(this.scene,3,cpointsOrigin,6);
  pieceOrigin.animation=animation;
  pieceOrigin.animationFinished=false;

  var cpointsDestiny=new Array();
  cpointsDestiny[0]=new Array(4);
  for(var k=0; k < 4;k++){
    cpointsDestiny[0][k]=new Array();
  }


  if(this.scene.selectObjectOrigin <= 18){
    var x=(18-pieceDestiny.x)/3;
    var y=(43-pieceDestiny.y)/3;
    var z=(60-pieceDestiny.z)/3;

}
else {
  var x=(35-pieceDestiny.x)/3;
  var y=(43-pieceDestiny.y)/3;
  var z=(15-pieceDestiny.z)/3;

}

cpointsDestiny[0][0][0]=pieceDestiny.x;
cpointsDestiny[0][0][1]=pieceDestiny.y;
cpointsDestiny[0][0][2]=pieceDestiny.z;

cpointsDestiny[0][1][0]=pieceDestiny.x+x;
cpointsDestiny[0][1][1]=pieceDestiny.y+(2*y);
cpointsDestiny[0][1][2]=pieceDestiny.z+z;

cpointsDestiny[0][2][0]=pieceDestiny.x+(2*x);
cpointsDestiny[0][2][1]=pieceDestiny.y+(2*y);
cpointsDestiny[0][2][2]=pieceDestiny.z+(2*z);

cpointsDestiny[0][3][0]=pieceDestiny.x+(3*x);
cpointsDestiny[0][3][1]=pieceDestiny.y+(3*y);
cpointsDestiny[0][3][2]=pieceDestiny.x+(3*z);

pieceDestiny.x+=(3*x);
pieceDestiny.y+=(3*y);
pieceDestiny.z+=(3*z);


if(pieceDestiny.getPickingID()<37){
  var animation = new LinearAnimation(this.scene,3,cpointsDestiny,6);
  pieceDestiny.animation=animation;
  pieceDestiny.animationFinished=false;
}

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
    console.log('id',piecesUndo[0]);
    console.log('piecesInvisible',this.areas);
    this.board=piecesUndo[0].lastBoard;

    var pieceOrigin= this.pieceChoosen(piecesUndo[0].pickingIdOrigin);
    var pieceDestiny= this.pieceChoosen(piecesUndo[0].pickingIdDestiny);
    var cpointsOrigin=new Array();
    cpointsOrigin[0]=new Array(4);
    for(var k=0; k < 4;k++){
      cpointsOrigin[0][k]=new Array();
    }

    cpointsOrigin[0][0][0]=piecesUndo[0].coordinatesDestinyX;
    cpointsOrigin[0][0][1]=piecesUndo[0].coordinatesDestinyY;
    cpointsOrigin[0][0][2]=piecesUndo[0].coordinatesDestinyZ;
    cpointsOrigin[0][1][0]=piecesUndo[0].coordinatesDestinyX-1;
    cpointsOrigin[0][1][1]=43;
    cpointsOrigin[0][1][2]=piecesUndo[0].coordinatesDestinyZ-1;
    cpointsOrigin[0][2][0]=piecesUndo[0].coordinatesDestinyX-1.5;
    cpointsOrigin[0][2][1]=43;
    cpointsOrigin[0][2][2]=piecesUndo[0].coordinatesDestinyZ-1.5;
    cpointsOrigin[0][3][0]=piecesUndo[0].coordinatesOriginX;
    cpointsOrigin[0][3][1]=piecesUndo[0].coordinatesOriginY;
    cpointsOrigin[0][3][2]=piecesUndo[0].coordinatesOriginZ;

    var animation = new BezierAnimation(this.scene,3,cpointsOrigin,2);
    pieceOrigin.animation=animation;
    pieceOrigin.animationFinished=false;

    var cpointsDestiny=new Array();
    cpointsDestiny[0]=new Array(4);
    for(var k=0; k < 4;k++){
      cpointsDestiny[0][k]=new Array();
    }


    if(this.scene.selectObjectOrigin <= 18){
      var x=(piecesUndo[0].coordinatesDestinyX-18)/3;
      var y=(piecesUndo[0].coordinatesDestinyY-43)/3;
      var z=(piecesUndo[0].coordinatesDestinyZ-60)/3;

  }
  else {
    var x=(piecesUndo[0].coordinatesDestinyX-35)/3;
    var y=(piecesUndo[0].coordinatesDestinyY-43)/3;
    var z=(piecesUndo[0].coordinatesDestinyZ-15)/3;

  }

  cpointsDestiny[0][0][0]=pieceDestiny.x;
  cpointsDestiny[0][0][1]=pieceDestiny.y;
  cpointsDestiny[0][0][2]=pieceDestiny.z;

  cpointsDestiny[0][1][0]=piecesUndo[0].coordinatesDestinyX-(2*x);
  cpointsDestiny[0][1][1]=piecesUndo[0].coordinatesDestinyY+(3*y);
  cpointsDestiny[0][1][2]=piecesUndo[0].coordinatesDestinyZ-(2*y);

  cpointsDestiny[0][2][0]=piecesUndo[0].coordinatesDestinyX-x;
  cpointsDestiny[0][2][1]=piecesUndo[0].coordinatesDestinyY+(2*y);
  cpointsDestiny[0][2][2]=piecesUndo[0].coordinatesDestinyZ-z;

  cpointsDestiny[0][3][0]=piecesUndo[0].coordinatesDestinyX;
  cpointsDestiny[0][3][1]=piecesUndo[0].coordinatesDestinyY+20;
  cpointsDestiny[0][3][2]=piecesUndo[0].coordinatesDestinyZ;

  if(pieceDestiny.getPickingID()<37){
    var animation = new LinearAnimation(this.scene,3,cpointsDestiny,2);
    pieceDestiny.animation=animation;
    pieceDestiny.animationFinished=false;
  }

  pieceOrigin.setPickingID(piecesUndo[0].pickingIdDestiny);
  pieceOrigin.x=piecesUndo[0].coordinatesDestinyX;
  pieceOrigin.y=piecesUndo[0].coordinatesDestinyY;
  pieceOrigin.z=piecesUndo[0].coordinatesDestinyZ;

  pieceDestiny.setPickingID(piecesUndo[0].pickingIdOrigin);
  pieceDestiny.x=piecesUndo[0].coordinatesOriginX;
  pieceDestiny.y=piecesUndo[0].coordinatesOriginY;
  pieceDestiny.z=piecesUndo[0].coordinatesOriginZ;

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
        this_t.createPieceAnimation();

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


        let pieceOrigin= origin.getPickingID();
        origin.setPickingID(destiny.getPickingID());
        destiny.setPickingID(pieceOrigin);

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


        origin.x=destiny.x;
        origin.y=destiny.y;
        origin.z=destiny.z;
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
