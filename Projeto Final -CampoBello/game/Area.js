const PIECE1_ID =1;
const PIECE2_ID =2;
const PIECE3_ID =3;
const PIECE4_ID =4;
const PIECE5_ID =5;
const PIECE6_ID =6;
const PIECE7_ID =7;
const PIECE8_ID =8;
const PIECE9_ID =9;

function Area(scene,idPlayer,id) {
 	  CGFobject.call(this,scene);

   this.scene=scene;

   this.pieces=[];


   this.pieces[PIECE1_ID]=new Piece(scene,idPlayer);
   this.pieces[PIECE2_ID]=new Piece(scene,idPlayer);
   this.pieces[PIECE3_ID]=new Piece(scene,idPlayer);
   this.pieces[PIECE4_ID]=new Piece(scene,idPlayer);
   this.pieces[PIECE5_ID]=new Piece(scene,idPlayer);
   this.pieces[PIECE6_ID]=new Piece(scene,idPlayer);
   this.pieces[PIECE7_ID]=new Piece(scene,idPlayer);
   this.pieces[PIECE8_ID]=new Piece(scene,idPlayer);
   this.pieces[PIECE9_ID]=new Piece(scene,idPlayer);




};

Area.prototype = Object.create(CGFobject.prototype);
Area.prototype.constructor = Area;

Area.prototype.display= function(){

  this.scene.pushMatrix();
  this.scene.translate(1.6,0.3,8.7);
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE1_ID].display();
  this.scene.popMatrix();


  this.scene.pushMatrix();
  this.scene.translate(1.6,0.3,13.1);
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE2_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(1.6,0.3,17.5);
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE3_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(1.6,0.3,21.8);
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE4_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(5,0.3,19.8);
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE5_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(5,0.3,15.4);
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE6_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(5,0.3,11);
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE7_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(8.5,0.3,13);
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE8_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(8.5,0.3,17.5);
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE9_ID].display();
  this.scene.popMatrix();



}
