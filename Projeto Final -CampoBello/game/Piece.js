/**
* Piece
* @constructor
*/
function Piece(scene,playerID,pickingId,typeOfPiece,visible) {
  CGFobject.call(this,scene);

  this.pickingId=pickingId;
  this.scene=scene;
  this.appearance;
  this.x;
  this.y;
  this.z;
  this.animations = [];
  this.visible=visible;
  this.animationIndex=0;
  this.animationFinished = false;
  this.initial_time = 0;
  this.delta_time = 0;
  this.typeOfPiece=typeOfPiece;

  this.transformMatrix = mat4.create();
  mat4.identity(this.transformMatrix);

  this.origin = mat4.create();
  mat4.identity(this.origin);


  if(typeOfPiece==1)
    this.appearance=this.scene.piece1Appearance;

  else if(typeOfPiece==2)
    this.appearance=this.scene.piece2Appearance;


  this.piece = new MySphere(scene,1,20,20);
};

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

Piece.prototype.display= function(){

this.scene.pushMatrix();
  if(!this.visible){
    this.scene.registerForPick(this.pickingId,this);
    this.scene.multMatrix(this.transformMatrix);
    this.piece.display();
    this.scene.clearPickRegistration();
  }
  else{
    this.appearance.apply();
    if(!this.animationFinished){
      this.updateTransformMatrix();

    }
    this.scene.multMatrix(this.transformMatrix);
    this.piece.display();
  }
this.scene.popMatrix();
}

Piece.prototype.setTypeOfPiece=function(newType){
  this.typeOfPiece=newType;
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

Piece.prototype.updateTransformMatrix = function(){


    var animation = this.scene.graph.animations[this.animations[this.animationIndex]];

    if(animation != null){
      animation.update(this.delta_time);
      //return animation.matrix;
      mat4.multiply(this.transformMatrix, this.origin, animation.matrix);
      return;
    }
    //if(this.animationFinished)
    //return animation.matrix;

    return mat4.create();

}
