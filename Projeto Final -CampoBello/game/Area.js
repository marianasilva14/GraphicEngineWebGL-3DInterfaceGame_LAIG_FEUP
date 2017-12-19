const PIECE1_ID =1;
const PIECE2_ID =2;
const PIECE3_ID =3;
const PIECE4_ID =4;
const PIECE5_ID =5;
const PIECE6_ID =6;
const PIECE7_ID =7;
const PIECE8_ID =8;
const PIECE9_ID =9;
const PIECE10_ID =10;


function Area(scene,idPlayer,id) {
 	  CGFobject.call(this,scene);

   this.scene=scene;

   this.pieces=[];

   var i=1;
   for(var j=id*10; j < (id*10+10);j++){
   this.pieces[i]=new Piece(scene,idPlayer,j);
   i++;
 }

 this.pieces[PIECE1_ID].x=1.6;
 this.pieces[PIECE1_ID].y=0.3;
 this.pieces[PIECE1_ID].z=8.7;
 this.pieces[PIECE2_ID].x=1.6;
 this.pieces[PIECE2_ID].y=0.3;
 this.pieces[PIECE2_ID].z=13.1;
 this.pieces[PIECE3_ID].x=1.6;
 this.pieces[PIECE3_ID].y=0.3;
 this.pieces[PIECE3_ID].z=17.5;
 this.pieces[PIECE4_ID].x=1.6;
 this.pieces[PIECE4_ID].y=0.3;
 this.pieces[PIECE4_ID].z=21.6;
 this.pieces[PIECE5_ID].x=5;
 this.pieces[PIECE5_ID].y=0.3;
 this.pieces[PIECE5_ID].z=19.8;
 this.pieces[PIECE6_ID].x=5;
 this.pieces[PIECE6_ID].y=0.3;
 this.pieces[PIECE6_ID].z=15.4;
 this.pieces[PIECE7_ID].x=5;
 this.pieces[PIECE7_ID].y=0.3;
 this.pieces[PIECE7_ID].z=11;
 this.pieces[PIECE8_ID].x=8.5;
 this.pieces[PIECE8_ID].y=0.3;
 this.pieces[PIECE8_ID].z=13;
 this.pieces[PIECE9_ID].x=8.5;
 this.pieces[PIECE9_ID].y=0.3;
 this.pieces[PIECE9_ID].z=17.5;
 this.pieces[PIECE10_ID].x=11.3;
 this.pieces[PIECE10_ID].y=0;
 this.pieces[PIECE10_ID].z=15;

};

Area.prototype = Object.create(CGFobject.prototype);
Area.prototype.constructor = Area;

Area.prototype.display= function(){

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.scene.translate(this.pieces[PIECE1_ID].x,this.pieces[PIECE1_ID].y,this.pieces[PIECE1_ID].z);
  this.pieces[PIECE1_ID].visible=true;
  this.pieces[PIECE1_ID].display();
  this.scene.popMatrix();


  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.scene.translate(this.pieces[PIECE2_ID].x,this.pieces[PIECE2_ID].y,this.pieces[PIECE2_ID].z);
  this.pieces[PIECE2_ID].visible=true;
  this.pieces[PIECE2_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.scene.translate(this.pieces[PIECE3_ID].x,this.pieces[PIECE3_ID].y,this.pieces[PIECE3_ID].z);
  this.pieces[PIECE3_ID].visible=true;
  this.pieces[PIECE3_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.scene.translate(this.pieces[PIECE4_ID].x,this.pieces[PIECE4_ID].y,this.pieces[PIECE4_ID].z);
  this.pieces[PIECE4_ID].visible=true;
  this.pieces[PIECE4_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.scene.translate(this.pieces[PIECE5_ID].x,this.pieces[PIECE5_ID].y,this.pieces[PIECE5_ID].z);
  this.pieces[PIECE5_ID].visible=true;
  this.pieces[PIECE5_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.scene.translate(this.pieces[PIECE6_ID].x,this.pieces[PIECE6_ID].y,this.pieces[PIECE6_ID].z);
  this.pieces[PIECE6_ID].visible=true;
  this.pieces[PIECE6_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.scene.translate(this.pieces[PIECE7_ID].x,this.pieces[PIECE7_ID].y,this.pieces[PIECE7_ID].z);
  this.pieces[PIECE7_ID].visible=true;
  this.pieces[PIECE7_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.scene.translate(this.pieces[PIECE8_ID].x,this.pieces[PIECE8_ID].y,this.pieces[PIECE8_ID].z);
  this.pieces[PIECE8_ID].visible=true;
  this.pieces[PIECE8_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.scene.translate(this.pieces[PIECE9_ID].x,this.pieces[PIECE9_ID].y,this.pieces[PIECE9_ID].z);
  this.pieces[PIECE9_ID].visible=true;
  this.pieces[PIECE9_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.scene.translate(this.pieces[PIECE10_ID].x,this.pieces[PIECE10_ID].y,this.pieces[PIECE10_ID].z);
  this.pieces[PIECE10_ID].display();
  this.scene.popMatrix();



}
