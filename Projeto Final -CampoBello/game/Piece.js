/**
 * Piece
 * @constructor
 */
 function Piece(scene,pieceID) {
 	CGFobject.call(this,scene);

  this.scene=scene;
  this.selectable=false;
  this.piece = new MySphere();
 };

 Piece.prototype = Object.create(CGFobject.prototype);
 Piece.prototype.constructor = Piece;

Piece.prototype.display= function(){
  if(this.selectable){
    this.scene.registerForPick(this);
  }
  this.piece.display();

}
