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
const pieceX=1;
const pieceY=2;
const NO_PIECE=3;

function CampoBello(scene) {
  CGFobject.call(this,scene);

  this.scene=scene;

  this.board= new Array(9);

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
    CHOOSE_DESTINY:4,
    END_GAME:5
  };

  this.currentState=this.state.INITIAL_STATE;
  this.game();
};

CampoBello.prototype = Object.create(CGFobject.prototype);
CampoBello.prototype.constructor = CampoBello;

CampoBello.prototype.display=function(){
  this.scene.pushMatrix();
  this.areas[0].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(0,0,30.5);
  this.scene.rotate(90*Math.PI/180, 0, 1, 0);
  this.areas[1].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(30.2,0,30.5);
  this.scene.rotate(180*Math.PI/180, 0, 1, 0);
  this.areas[2].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(30.8,0,0.03);
  this.scene.rotate(-90*Math.PI/180, 0, 1, 0);
  this.areas[3].display();
  this.scene.popMatrix();

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
    //console.log("Request successful. Reply: " + data.target.response);
    this_t.board=JSON.parse(data.target.response);
    console.log(this_t.board);

  });

  this.currentState=this.state.CHOOSE_ORIGIN;
  this.game();
}

CampoBello.prototype.chooseDestiny=function(){

  if(this.scene.selectObjectDestiny!=-1){
    this.currentState=this.state.VALID_MOVEMENT;
    this.game();
  }

}

CampoBello.prototype.areaPiece=function(idPiece) {
  for(var i=0; i< this.areas.length;i++){
    for(var j=1; j < this.areas[i].pieces.length;j++){
      if(this.areas[i].pieces[j].pickingId==idPiece){
        return i;
      }
    }
  }
}
CampoBello.prototype.chooseOrigin=function(){

  if(this.scene.selectObjectOrigin!=-1){
    this.currentState=this.state.CHOOSE_DESTINY;
  }

}

CampoBello.prototype.createPieceAnimation=function(){
  var areaOriginPiece=this.areaPiece(this.scene.selectObjectOrigin);
  var areaDestinyPiece=this.areaPiece(this.scene.selectObjectOrigin);

  for(var j=1; j< this.areas[areaDestinyPiece].pieces.length;j++){
    if(this.areas[areaDestinyPiece].pieces[j].pickingId==this.scene.selectObjectDestiny){
      var pieceDestiny=this.areas[areaDestinyPiece].pieces[j];
      //pieceDestiny.visible=false;
      break;
    }
  }

  for(var j=1; j< this.areas[areaOriginPiece].pieces.length;j++){
    if(this.areas[areaOriginPiece].pieces[j].pickingId==this.scene.selectObjectOrigin){
      var pieceOrigin=this.areas[areaOriginPiece].pieces[j];
      var cpointsOrigin=new Array();
      cpointsOrigin[0]=new Array(4);
      for(var k=0; k < 4;k++){
        cpointsOrigin[0][k]=new Array();
      }
      cpointsOrigin[0][0][0]=0;
      cpointsOrigin[0][0][1]=3;
      cpointsOrigin[0][0][2]=0;
      cpointsOrigin[0][1][0]=0.5;
      cpointsOrigin[0][1][1]=3;
      cpointsOrigin[0][1][2]=0.5;
      cpointsOrigin[0][2][0]=pieceDestiny.x;
      cpointsOrigin[0][2][1]=2;
      cpointsOrigin[0][2][2]=pieceDestiny.z-pieceOrigin.z;
      cpointsOrigin[0][3][0]=pieceDestiny.x-pieceOrigin.x;
      cpointsOrigin[0][3][1]=0;
      cpointsOrigin[0][3][2]=pieceDestiny.z-pieceOrigin.z;

      this.scene.graph.animations['3'].setControlPoints(cpointsOrigin);
      pieceOrigin.animations.push('3');
      //pieceOrigin.visible=false;
    //  pieceOrigin.x=pieceDestiny.x;
      //pieceOrigin.y=pieceDestiny.y;
    //pieceOrigin.z=pieceDestiny.z;
      break;
    }
  }
  this.scene.selectObjectDestiny==-1;
  this.scene.selectObjectOrigin==-1;
}

CampoBello.prototype.validateMove=function(){
  var this_t=this;
  var areaPiece=this.areaPiece(this.scene.selectObjectOrigin);

  getPrologRequest(
    "validateGame("+JSON.stringify(this_t.board)+","+
    JSON.stringify(this_t.scene.selectObjectOrigin)+","+
    JSON.stringify(this_t.scene.selectObjectDestiny)+","+
    JSON.stringify(areaPiece)+")",
    function(data){
      //console.log("Request successful. Reply: " + data.target.response);
      var info=JSON.parse(data.target.response);
      if(info!=[]){
        this_t.createPieceAnimation();
        this_t.board=info;
        this_t.currentState=this_t.state.CHOOSE_ORIGIN;
      }

    });
  }



  CampoBello.prototype.game = function(){
    switch (this.currentState) {
      case this.state.INITIAL_STATE:
      this.getInitialBoard();
      break;
      case this.state.CHOOSE_ORIGIN:
      break;
      case this.state.CHOOSE_DESTINY:
      break;
      case this.state.VALID_MOVEMENT:
      this.validateMove();
      break;
      case this.state.INVALID_MOVEMENT:
      break;
      case this.state.ANOTHER_MOVEMENT:
      break;
      default:
    }
  }
