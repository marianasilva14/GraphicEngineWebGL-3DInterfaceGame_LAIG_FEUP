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
  this.animation;
  this.visible=visible;
  this.animationFinished = true;
  this.initial_time = 0;
  this.delta_time = 0;
  this.typeOfPiece=typeOfPiece;

  this.transformMatrix = mat4.create();
  mat4.identity(this.transformMatrix);

  this.origin = mat4.create();
  mat4.identity(this.origin);

if(this.scene.scenarioNumber==2){
  if(typeOfPiece==1)
    this.appearance=this.scene.piece1AppearanceScenario1;

  else if(typeOfPiece==2)
    this.appearance=this.scene.piece2AppearanceScenario1;

}
else if(this.scene.scenarioNumber==1){
  if(typeOfPiece==1)
    this.appearance=this.scene.piece1AppearanceScenario2;

  else if(typeOfPiece==2)
    this.appearance=this.scene.piece2AppearanceScenario2;
}
else{
  if(typeOfPiece==1)
    this.appearance=this.scene.piece1AppearanceScenario3;

  else if(typeOfPiece==2)
    this.appearance=this.scene.piece2AppearanceScenario3;
}

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

Piece.prototype.setAppearence=function(){
  if(this.scene.scenarioNumber==2){
    if(this.typeOfPiece==1)
      this.appearance=this.scene.piece1AppearanceScenario1;

    else if(this.typeOfPiece==2)
      this.appearance=this.scene.piece2AppearanceScenario1;

  }
  else if(this.scene.scenarioNumber==1){
    if(this.typeOfPiece==1)
      this.appearance=this.scene.piece1AppearanceScenario2;

    else if(this.typeOfPiece==2)
      this.appearance=this.scene.piece2AppearanceScenario2;
  }
  else{
    if(this.typeOfPiece==1)
      this.appearance=this.scene.piece1AppearanceScenario3;

    else if(this.typeOfPiece==2)
      this.appearance=this.scene.piece2AppearanceScenario3;
  }
}

Piece.prototype.updateAnimation =function(current_time){

if(this.animation==null)
return;

    var current_time2 = current_time/1000;

    if(this.initial_time == 0)
      this.initial_time = current_time2;
    else
      this.delta_time=current_time2-this.initial_time;

    if(this.delta_time >= this.animation.totalTime)
      this.animationFinished = true;
    else {
      this.animation.update(this.delta_time);
    }

}
Piece.prototype.getPickingID=function(){
  return this.pickingId;
}

Piece.prototype.setPickingID=function(pickingId){
  this.pickingId=pickingId;
}


Piece.prototype.updateTransformMatrix = function(){
    if(this.animation != null){
      this.animation.update(this.delta_time);
      mat4.multiply(this.transformMatrix, this.origin, this.animation.matrix);
      return;
    }
    if(this.animationFinished){
      this.animation=null;
      this.animationFinished=true;
      this.initial_time=0;
      this.delta_time=-1;
    }

    return mat4.create();

}
