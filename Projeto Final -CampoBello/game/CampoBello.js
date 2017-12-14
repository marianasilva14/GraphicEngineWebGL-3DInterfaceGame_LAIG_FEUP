/**
* CampoBello
*/
const PLAYER1_ID = 1;
const PLAYER2_ID = 2;

const AREA1_ID = 1 ;
const AREA2_ID = 2 ;

const EMPTY=0;
const pieceX=1;
const pieceY=2;
const NO_PIECE=3;

function CampoBello(scene) {
  CGFobject.call(this,scene);

  this.scene=scene;

  this.board=[];
  this.areas=[];

  this.areas[0]=new Area(scene,PLAYER1_ID,AREA1_ID);
  this.areas[1]=new Area(scene,PLAYER1_ID,AREA2_ID);
  this.areas[2]=new Area(scene,PLAYER2_ID,AREA1_ID);
  this.areas[3]=new Area(scene,PLAYER2_ID,AREA2_ID);

  this.state={
    INITIAL_STATE: 1,
    INVALID_MOVEMENT:2,
    VALID_MOVEMENT:3,
    ANOTHER_MOVEMENT:4,
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
  getPrologRequest('initialBoard',function(data){
    console.log("Request successful. Reply: " + data.target.response);
   this.board=JSON.parse(data.target.response);
  });
/*
    for(var j=1; j <= 4;j++){
      this.areas[0].pieces[PIECE1_ID]=this.board[0][j];
      this.areas[0].pieces[PIECE2_ID]=this.board[0][j];
      this.areas[0].pieces[PIECE3_ID]=this.board[0][j];
      this.areas[0].pieces[PIECE4_ID]=this.board[0][j];
      }
*/
}


CampoBello.prototype.game = function(){
  switch (this.currentState) {
    case this.state.INITIAL_STATE:
    this.getInitialBoard();
    break;


    default:
  }
}
