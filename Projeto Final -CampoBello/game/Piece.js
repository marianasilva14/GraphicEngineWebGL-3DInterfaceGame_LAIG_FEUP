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
      this.piece.display();
  }

}

Piece.prototype.setPiece=function(typeOfPiece){
  this.typeOfPiece= typeOfPiece;
}
