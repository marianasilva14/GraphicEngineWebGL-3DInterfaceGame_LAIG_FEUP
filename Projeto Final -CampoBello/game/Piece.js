/**
 * Piece
 * @constructor
 */
 function Piece(scene,playerID,pickingId) {
 	CGFobject.call(this,scene);

  this.pickingId=pickingId;
  this.scene=scene;
  this.selectable=false;
  this.appearance;
  this.typeOfPiece;
  this.idPiece;

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

  this.scene.logPicking();
  this.scene.clearPickRegistration();

    this.scene.registerForPick(this.pickingId,this);


  this.appearance.apply();
  this.piece.display();

}

Piece.prototype.setPiece=function(typeOfPiece,idPiece){
  this.typeOfPiece= typeOfPiece;

  this.idPiece=idPiece;
}
