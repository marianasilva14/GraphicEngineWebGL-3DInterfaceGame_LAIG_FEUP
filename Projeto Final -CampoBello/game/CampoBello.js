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

  this.board= new Array(9);

  for(var i=0; i <9;i++){
      this.board[i]=new Array(9);
  }
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
var this_t=this;
  getPrologRequest('initialBoard',function(data){
    //console.log("Request successful. Reply: " + data.target.response);
   this_t.board=JSON.parse(data.target.response);
     console.log(this_t.board);


  //Area1 JOGADOR1
    this_t.areas[0].pieces[PIECE1_ID].setPiece(this_t.board[0][1]);
    this_t.areas[0].pieces[PIECE2_ID].setPiece(this_t.board[0][2]);
    this_t.areas[0].pieces[PIECE3_ID].setPiece(this_t.board[0][3]);
    this_t.areas[0].pieces[PIECE4_ID].setPiece(this_t.board[0][4]);

    this_t.areas[0].pieces[PIECE5_ID].setPiece(this_t.board[1][2]);
    this_t.areas[0].pieces[PIECE6_ID].setPiece(this_t.board[1][3]);
    this_t.areas[0].pieces[PIECE7_ID].setPiece(this_t.board[1][4]);

    this_t.areas[0].pieces[PIECE8_ID].setPiece(this_t.board[2][3]);
    this_t.areas[0].pieces[PIECE9_ID].setPiece(this_t.board[2][4]);

  //AREA2 JOGADOR1
    this_t.areas[1].pieces[PIECE1_ID].setPiece(this_t.board[4][0]);
    this_t.areas[1].pieces[PIECE2_ID].setPiece(this_t.board[4][1]);
    this_t.areas[1].pieces[PIECE3_ID].setPiece(this_t.board[4][2]);

    this_t.areas[1].pieces[PIECE4_ID].setPiece(this_t.board[5][0]);
    this_t.areas[1].pieces[PIECE5_ID].setPiece(this_t.board[5][1]);
    this_t.areas[1].pieces[PIECE6_ID].setPiece(this_t.board[5][2]);

    this_t.areas[1].pieces[PIECE7_ID].setPiece(this_t.board[6][0]);
    this_t.areas[1].pieces[PIECE8_ID].setPiece(this_t.board[6][1]);

    this_t.areas[1].pieces[PIECE9_ID].setPiece(this_t.board[7][0]);

  //Area1 JOGADOR2
    this_t.areas[2].pieces[PIECE1_ID].setPiece(this_t.board[1][8]);

    this_t.areas[2].pieces[PIECE2_ID].setPiece(this_t.board[2][7]);
    this_t.areas[2].pieces[PIECE3_ID].setPiece(this_t.board[2][8]);

    this_t.areas[2].pieces[PIECE4_ID].setPiece(this_t.board[3][6]);
    this_t.areas[2].pieces[PIECE5_ID].setPiece(this_t.board[3][7]);
    this_t.areas[2].pieces[PIECE6_ID].setPiece(this_t.board[3][8]);

    this_t.areas[2].pieces[PIECE7_ID].setPiece(this_t.board[4][6]);
    this_t.areas[2].pieces[PIECE8_ID].setPiece(this_t.board[4][7]);
    this_t.areas[2].pieces[PIECE9_ID].setPiece(this_t.board[4][9]);

  //Area2 JOGADOR2

  this_t.areas[3].pieces[PIECE1_ID].setPiece(this_t.board[6][4]);
  this_t.areas[3].pieces[PIECE2_ID].setPiece(this_t.board[6][5]);

  this_t.areas[3].pieces[PIECE3_ID].setPiece(this_t.board[7][4]);
  this_t.areas[3].pieces[PIECE4_ID].setPiece(this_t.board[7][5]);
  this_t.areas[3].pieces[PIECE5_ID].setPiece(this_t.board[7][6]);

  this_t.areas[3].pieces[PIECE6_ID].setPiece(this_t.board[8][4]);
  this_t.areas[3].pieces[PIECE7_ID].setPiece(this_t.board[8][5]);
  this_t.areas[3].pieces[PIECE8_ID].setPiece(this_t.board[8][6]);
  this_t.areas[3].pieces[PIECE9_ID].setPiece(this_t.board[8][7]);
  });



}


CampoBello.prototype.game = function(){
  switch (this.currentState) {
    case this.state.INITIAL_STATE:
    this.getInitialBoard();
    break;
    case this.state.INVALID_MOVEMENT:
    break;
    case this.state.INVALID_MOVEMENT:
    break;
    case this.state.VALID_MOVEMENT:
    break;
    case this.state.ANOTHER_MOVEMENT:
    break;
    default:
  }
}
