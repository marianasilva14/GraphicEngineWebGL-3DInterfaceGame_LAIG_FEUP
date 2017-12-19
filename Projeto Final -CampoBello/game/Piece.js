/**
* Piece
* @constructor
*/
function Piece(scene,playerID,pickingId) {
  CGFobject.call(this,scene);

  this.pickingId=pickingId;
  this.scene=scene;
  this.appearance;
  this.typeOfPiece;
  this.visible=false;
  this.x;
  this.y;
  this.z;
  this.animations = [];
  this.animationIndex=0;
  this.animationFinished = false;
  this.initial_time = 0;
  this.delta_time = 0;

  this.transformMatrix = mat4.create();
  mat4.identity(this.transformMatrix);

  if(playerID==PLAYER1_ID){
    this.appearance=this.scene.piece1Appearance;
  }
  else {
    this.appearance=this.scene.piece2Appearance;
  }

  this.piece = new MySphere(scene,1,20,20);
};

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

Piece.prototype.display= function(){


  if(this.scene.pickMode && !this.visible){
    this.scene.registerForPick(this.pickingId,this);
    this.piece.display();
  }
  else if(this.visible){
    this.scene.registerForPick(this.pickingId,this);
    this.appearance.apply();
    if(!this.animationFinished){
      this.scene.multMatrix(this.getMatrix());
    }
    this.piece.display();
  }

}

Piece.prototype.updateAnimation =function(current_time){

    var currentAnimation =this.scene.graph.animations[this.animations[this.animationIndex]];

    var current_time2 = current_time/1000;

    if(this.initial_time == 0)
      this.initial_time = current_time2;
    else
      this.delta_time=current_time2-this.initial_time;

    if(this.delta_time >= currentAnimation.totalTime)
      this.animationFinished = true;
    else {
      currentAnimation.update(this.delta_time);
    }

}

Piece.prototype.getMatrix = function(){

    var animation = this.scene.graph.animations[this.animations[this.animationIndex]];

    if(animation != null){
      animation.update(this.delta_time);
      return animation.matrix;
    }
    //if(this.animationFinished)
    //return animation.matrix;

    return mat4.create();

}

Piece.prototype.setPiece=function(typeOfPiece){
  this.typeOfPiece= typeOfPiece;
}
