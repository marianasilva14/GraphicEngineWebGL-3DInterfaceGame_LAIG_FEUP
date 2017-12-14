/**
 * Piece
 * @constructor
 */
 function Piece(scene,playerID) {
 	CGFobject.call(this,scene);

  this.scene=scene;
  this.selectable=false;
  this.appearance;
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
  if(this.selectable){
    console.log('entrou no if!!');
    this.scene.registerForPick(this);
    console.log('fez o registerForPick');
  }

  this.appearance.apply();
  this.piece.display();

}
