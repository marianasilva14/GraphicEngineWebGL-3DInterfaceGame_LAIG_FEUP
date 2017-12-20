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
   this.piecesInvisible=[];

   var i=1;
   for(var j=id*9; j < (id*9+9);j++){
    if(id==0 || id==1){
     this.pieces[i]=new Piece(scene,idPlayer,j,1,true);
    }
     else if(id==2 || id==3){
       this.pieces[i]=new Piece(scene,idPlayer,j,2,true);
     }
   i++;
  }
  var k=1;
  for(var j=id*10; j < (id*10+10);j++){
    if(id==0 || id==1){
     this.piecesInvisible[k]=new Piece(scene,idPlayer,j,1,false);
    }
     else if(id==2 || id==3){
      this.piecesInvisible[k]=new Piece(scene,idPlayer,j,2,false);
     }
   k++;
  }


 //coordenadas pecas
 if(id==0){
  this.pieces[PIECE1_ID].x=1.5; this.pieces[PIECE1_ID].y=0; this.pieces[PIECE1_ID].z=9;
  mat4.translate(this.pieces[PIECE1_ID].transformMatrix,this.pieces[PIECE1_ID].origin,[1.5,0,9]);
  this.pieces[PIECE2_ID].x=1.5; this.pieces[PIECE2_ID].y=0; this.pieces[PIECE2_ID].z=13;
  mat4.translate(this.pieces[PIECE2_ID].transformMatrix,this.pieces[PIECE2_ID].origin,[1.5,0,13]);
  this.pieces[PIECE3_ID].x=1.5; this.pieces[PIECE3_ID].y=0; this.pieces[PIECE3_ID].z=17.3;
  mat4.translate(this.pieces[PIECE3_ID].transformMatrix,this.pieces[PIECE3_ID].origin,[1.5,0,17.3]);
  this.pieces[PIECE4_ID].x=1.5; this.pieces[PIECE4_ID].y=0; this.pieces[PIECE4_ID].z=22;
  mat4.translate(this.pieces[PIECE4_ID].transformMatrix,this.pieces[PIECE4_ID].origin,[1.5,0,22]);
  this.pieces[PIECE5_ID].x=5; this.pieces[PIECE5_ID].y=0; this.pieces[PIECE5_ID].z=11;
  mat4.translate(this.pieces[PIECE5_ID].transformMatrix,this.pieces[PIECE5_ID].origin,[5,0,11]);
  this.pieces[PIECE6_ID].x=5; this.pieces[PIECE6_ID].y=0; this.pieces[PIECE6_ID].z=15;
  mat4.translate(this.pieces[PIECE6_ID].transformMatrix,this.pieces[PIECE6_ID].origin,[5,0,15]);
  this.pieces[PIECE7_ID].x=5; this.pieces[PIECE7_ID].y=0; this.pieces[PIECE7_ID].z=19.8;
  mat4.translate(this.pieces[PIECE7_ID].transformMatrix,this.pieces[PIECE7_ID].origin,[5,0,19.8]);
  this.pieces[PIECE8_ID].x=8.7; this.pieces[PIECE8_ID].y=0; this.pieces[PIECE8_ID].z=13;
  mat4.translate(this.pieces[PIECE8_ID].transformMatrix,this.pieces[PIECE8_ID].origin,[8.7,0,13]);
  this.pieces[PIECE9_ID].x=8.7; this.pieces[PIECE9_ID].y=0; this.pieces[PIECE9_ID].z=8.6;
  mat4.translate(this.pieces[PIECE9_ID].transformMatrix,this.pieces[PIECE9_ID].origin,[8.7,0,17.5]);



  this.piecesInvisible[PIECE1_ID].x=1.5; this.piecesInvisible[PIECE1_ID].y=0; this.piecesInvisible[PIECE1_ID].z=9;
  mat4.translate(this.piecesInvisible[PIECE1_ID].transformMatrix,this.piecesInvisible[PIECE1_ID].origin,[1.5,0,9]);
  this.piecesInvisible[PIECE2_ID].x=1.5; this.piecesInvisible[PIECE2_ID].y=0; this.piecesInvisible[PIECE2_ID].z=13;
  mat4.translate(this.piecesInvisible[PIECE2_ID].transformMatrix,this.piecesInvisible[PIECE2_ID].origin,[1.5,0,13]);
  this.piecesInvisible[PIECE3_ID].x=1.5; this.piecesInvisible[PIECE3_ID].y=0; this.piecesInvisible[PIECE3_ID].z=17.3;
  mat4.translate(this.piecesInvisible[PIECE3_ID].transformMatrix,this.piecesInvisible[PIECE3_ID].origin,[1.5,0,17.3]);
  this.piecesInvisible[PIECE4_ID].x=1.5; this.piecesInvisible[PIECE4_ID].y=0; this.piecesInvisible[PIECE4_ID].z=22;
  mat4.translate(this.piecesInvisible[PIECE4_ID].transformMatrix,this.piecesInvisible[PIECE4_ID].origin,[1.5,0,22]);
  this.piecesInvisible[PIECE5_ID].x=5; this.piecesInvisible[PIECE5_ID].y=0; this.piecesInvisible[PIECE5_ID].z=11;
  mat4.translate(this.piecesInvisible[PIECE5_ID].transformMatrix,this.piecesInvisible[PIECE5_ID].origin,[5,0,11]);
  this.piecesInvisible[PIECE6_ID].x=5; this.piecesInvisible[PIECE6_ID].y=0; this.piecesInvisible[PIECE6_ID].z=15;
  mat4.translate(this.piecesInvisible[PIECE6_ID].transformMatrix,this.piecesInvisible[PIECE6_ID].origin,[5,0,15]);
  this.piecesInvisible[PIECE7_ID].x=5; this.piecesInvisible[PIECE7_ID].y=0; this.piecesInvisible[PIECE7_ID].z=19.8;
  mat4.translate(this.piecesInvisible[PIECE7_ID].transformMatrix,this.piecesInvisible[PIECE7_ID].origin,[5,0,19.8]);
  this.piecesInvisible[PIECE8_ID].x=8.7; this.piecesInvisible[PIECE8_ID].y=0; this.piecesInvisible[PIECE8_ID].z=13;
  mat4.translate(this.piecesInvisible[PIECE8_ID].transformMatrix,this.piecesInvisible[PIECE8_ID].origin,[8.7,0,13]);
  this.piecesInvisible[PIECE9_ID].x=8.7; this.piecesInvisible[PIECE9_ID].y=0; this.piecesInvisible[PIECE9_ID].z=8.6;
  mat4.translate(this.piecesInvisible[PIECE9_ID].transformMatrix,this.piecesInvisible[PIECE9_ID].origin,[8.7,0,17.5]);
  this.piecesInvisible[PIECE10_ID].x=5.8; this.piecesInvisible[PIECE10_ID].y=0; this.piecesInvisible[PIECE10_ID].z=7.6;
  mat4.translate(this.piecesInvisible[PIECE10_ID].transformMatrix,this.piecesInvisible[PIECE10_ID].origin,[11.5,0,15]);
}
else if(id==1){
  this.pieces[PIECE1_ID].x=8.3; this.pieces[PIECE1_ID].y=0; this.pieces[PIECE1_ID].z=28.6;
  mat4.translate(this.pieces[PIECE1_ID].transformMatrix,this.pieces[PIECE1_ID].origin,[8.3,0,28.6]);
  this.pieces[PIECE2_ID].x=12.7; this.pieces[PIECE2_ID].y=0; this.pieces[PIECE2_ID].z=28.6;
  mat4.translate(this.pieces[PIECE2_ID].transformMatrix,this.pieces[PIECE2_ID].origin,[12.7,0,28.6]);
  this.pieces[PIECE3_ID].x=17.2; this.pieces[PIECE3_ID].y=0; this.pieces[PIECE3_ID].z=28.6;
  mat4.translate(this.pieces[PIECE3_ID].transformMatrix,this.pieces[PIECE3_ID].origin,[17.2,0,28.6]);
  this.pieces[PIECE4_ID].x=21.5; this.pieces[PIECE4_ID].y=0; this.pieces[PIECE4_ID].z=28.6;
  mat4.translate(this.pieces[PIECE4_ID].transformMatrix,this.pieces[PIECE4_ID].origin,[21.5,0,28.6]);
  this.pieces[PIECE5_ID].x=10.5; this.pieces[PIECE5_ID].y=0; this.pieces[PIECE5_ID].z=25.5;
  mat4.translate(this.pieces[PIECE5_ID].transformMatrix,this.pieces[PIECE5_ID].origin,[10.5,0,25.5]);
  this.pieces[PIECE6_ID].x=15; this.pieces[PIECE6_ID].y=0; this.pieces[PIECE6_ID].z=25.5;
  mat4.translate(this.pieces[PIECE6_ID].transformMatrix,this.pieces[PIECE6_ID].origin,[15,0,25.5]);
  this.pieces[PIECE7_ID].x=19.5; this.pieces[PIECE7_ID].y=0; this.pieces[PIECE7_ID].z=25.5;
  mat4.translate(this.pieces[PIECE7_ID].transformMatrix,this.pieces[PIECE7_ID].origin,[19.5,0,25.5]);
  this.pieces[PIECE8_ID].x=12.7; this.pieces[PIECE8_ID].y=0; this.pieces[PIECE8_ID].z=22;
  mat4.translate(this.pieces[PIECE8_ID].transformMatrix,this.pieces[PIECE8_ID].origin,[12.7,0,22]);
  this.pieces[PIECE9_ID].x=17; this.pieces[PIECE9_ID].y=0; this.pieces[PIECE9_ID].z=22;
  mat4.translate(this.pieces[PIECE9_ID].transformMatrix,this.pieces[PIECE9_ID].origin,[17,0,22]);


  this.piecesInvisible[PIECE1_ID].x=8.3; this.piecesInvisible[PIECE1_ID].y=0; this.piecesInvisible[PIECE1_ID].z=28.6;
  mat4.translate(this.piecesInvisible[PIECE1_ID].transformMatrix,this.piecesInvisible[PIECE1_ID].origin,[8.3,0,28.6]);
  this.piecesInvisible[PIECE2_ID].x=12.7; this.piecesInvisible[PIECE2_ID].y=0; this.piecesInvisible[PIECE2_ID].z=28.6;
  mat4.translate(this.piecesInvisible[PIECE2_ID].transformMatrix,this.piecesInvisible[PIECE2_ID].origin,[12.7,0,28.6]);
  this.piecesInvisible[PIECE3_ID].x=17.2; this.piecesInvisible[PIECE3_ID].y=0; this.piecesInvisible[PIECE3_ID].z=28.6;
  mat4.translate(this.piecesInvisible[PIECE3_ID].transformMatrix,this.piecesInvisible[PIECE3_ID].origin,[17.2,0,28.6]);
  this.piecesInvisible[PIECE4_ID].x=21.5; this.piecesInvisible[PIECE4_ID].y=0; this.piecesInvisible[PIECE4_ID].z=28.6;
  mat4.translate(this.piecesInvisible[PIECE4_ID].transformMatrix,this.piecesInvisible[PIECE4_ID].origin,[21.5,0,28.6]);
  this.piecesInvisible[PIECE5_ID].x=10.5; this.piecesInvisible[PIECE5_ID].y=0; this.piecesInvisible[PIECE5_ID].z=25.5;
  mat4.translate(this.piecesInvisible[PIECE5_ID].transformMatrix,this.piecesInvisible[PIECE5_ID].origin,[10.5,0,25.5]);
  this.piecesInvisible[PIECE6_ID].x=15; this.piecesInvisible[PIECE6_ID].y=0; this.piecesInvisible[PIECE6_ID].z=25.5;
  mat4.translate(this.piecesInvisible[PIECE6_ID].transformMatrix,this.piecesInvisible[PIECE6_ID].origin,[15,0,25.5]);
  this.piecesInvisible[PIECE7_ID].x=19.5; this.piecesInvisible[PIECE7_ID].y=0; this.piecesInvisible[PIECE7_ID].z=25.5;
  mat4.translate(this.piecesInvisible[PIECE7_ID].transformMatrix,this.piecesInvisible[PIECE7_ID].origin,[19.5,0,25.5]);
  this.piecesInvisible[PIECE8_ID].x=12.7; this.piecesInvisible[PIECE8_ID].y=0; this.piecesInvisible[PIECE8_ID].z=22;
  mat4.translate(this.piecesInvisible[PIECE8_ID].transformMatrix,this.piecesInvisible[PIECE8_ID].origin,[12.7,0,22]);
  this.piecesInvisible[PIECE9_ID].x=17; this.piecesInvisible[PIECE9_ID].y=0; this.piecesInvisible[PIECE9_ID].z=22;
  mat4.translate(this.piecesInvisible[PIECE9_ID].transformMatrix,this.piecesInvisible[PIECE9_ID].origin,[17,0,22]);
  this.piecesInvisible[PIECE10_ID].x=15; this.piecesInvisible[PIECE10_ID].y=0; this.piecesInvisible[PIECE10_ID].z=18.8;
  mat4.translate(this.piecesInvisible[PIECE10_ID].transformMatrix,this.piecesInvisible[PIECE10_ID].origin,[15,0,18.8]);
}

else if(id==2){
  this.pieces[PIECE1_ID].x=22; this.pieces[PIECE1_ID].y=0; this.pieces[PIECE1_ID].z=1.5;
  mat4.translate(this.pieces[PIECE1_ID].transformMatrix,this.pieces[PIECE1_ID].origin,[22,0,1.5]);
  this.pieces[PIECE2_ID].x=17.5; this.pieces[PIECE2_ID].y=0; this.pieces[PIECE2_ID].z=1.5;
  mat4.translate(this.pieces[PIECE2_ID].transformMatrix,this.pieces[PIECE2_ID].origin,[17.5,0,1.5]);
  this.pieces[PIECE3_ID].x=13.5; this.pieces[PIECE3_ID].y=0; this.pieces[PIECE3_ID].z=1.5;
  mat4.translate(this.pieces[PIECE3_ID].transformMatrix,this.pieces[PIECE3_ID].origin,[13.5,0,1.5]);
  this.pieces[PIECE4_ID].x=9; this.pieces[PIECE4_ID].y=0; this.pieces[PIECE4_ID].z=1.5;
  mat4.translate(this.pieces[PIECE4_ID].transformMatrix,this.pieces[PIECE4_ID].origin,[9,0,1.5]);
  this.pieces[PIECE5_ID].x=19.8; this.pieces[PIECE5_ID].y=0; this.pieces[PIECE5_ID].z=5.2;
  mat4.translate(this.pieces[PIECE5_ID].transformMatrix,this.pieces[PIECE5_ID].origin,[19.8,0,5.2]);
  this.pieces[PIECE6_ID].x=1.5; this.pieces[PIECE6_ID].y=0; this.pieces[PIECE6_ID].z=5.2;
  mat4.translate(this.pieces[PIECE6_ID].transformMatrix,this.pieces[PIECE6_ID].origin,[15.5,0,5.2]);
  this.pieces[PIECE7_ID].x=11.3; this.pieces[PIECE7_ID].y=0; this.pieces[PIECE7_ID].z=5.2;
  mat4.translate(this.pieces[PIECE7_ID].transformMatrix,this.pieces[PIECE7_ID].origin,[11.3,0,5.2]);
  this.pieces[PIECE8_ID].x=13.3; this.pieces[PIECE8_ID].y=0; this.pieces[PIECE8_ID].z=8;
  mat4.translate(this.pieces[PIECE8_ID].transformMatrix,this.pieces[PIECE8_ID].origin,[13.3,0,8]);
  this.pieces[PIECE9_ID].x=17.8; this.pieces[PIECE9_ID].y=0; this.pieces[PIECE9_ID].z=8;
  mat4.translate(this.pieces[PIECE9_ID].transformMatrix,this.pieces[PIECE9_ID].origin,[17.8,0,8]);


  this.piecesInvisible[PIECE1_ID].x=22; this.piecesInvisible[PIECE1_ID].y=0; this.piecesInvisible[PIECE1_ID].z=1.5;
  mat4.translate(this.piecesInvisible[PIECE1_ID].transformMatrix,this.piecesInvisible[PIECE1_ID].origin,[22,0,1.5]);
  this.piecesInvisible[PIECE2_ID].x=17.5; this.piecesInvisible[PIECE2_ID].y=0; this.piecesInvisible[PIECE2_ID].z=1.5;
  mat4.translate(this.piecesInvisible[PIECE2_ID].transformMatrix,this.piecesInvisible[PIECE2_ID].origin,[17.5,0,1.5]);
  this.piecesInvisible[PIECE3_ID].x=13.5; this.piecesInvisible[PIECE3_ID].y=0; this.piecesInvisible[PIECE3_ID].z=1.5;
  mat4.translate(this.piecesInvisible[PIECE3_ID].transformMatrix,this.piecesInvisible[PIECE3_ID].origin,[13.5,0,1.5]);
  this.piecesInvisible[PIECE4_ID].x=9; this.piecesInvisible[PIECE4_ID].y=0; this.piecesInvisible[PIECE4_ID].z=1.5;
  mat4.translate(this.piecesInvisible[PIECE4_ID].transformMatrix,this.piecesInvisible[PIECE4_ID].origin,[9,0,1.5]);
  this.piecesInvisible[PIECE5_ID].x=19.8; this.piecesInvisible[PIECE5_ID].y=0; this.piecesInvisible[PIECE5_ID].z=5.2;
  mat4.translate(this.piecesInvisible[PIECE5_ID].transformMatrix,this.piecesInvisible[PIECE5_ID].origin,[19.8,0,5.2]);
  this.piecesInvisible[PIECE6_ID].x=1.5; this.piecesInvisible[PIECE6_ID].y=0; this.piecesInvisible[PIECE6_ID].z=5.2;
  mat4.translate(this.piecesInvisible[PIECE6_ID].transformMatrix,this.piecesInvisible[PIECE6_ID].origin,[15.5,0,5.2]);
  this.piecesInvisible[PIECE7_ID].x=11.3; this.piecesInvisible[PIECE7_ID].y=0; this.piecesInvisible[PIECE7_ID].z=5.2;
  mat4.translate(this.piecesInvisible[PIECE7_ID].transformMatrix,this.piecesInvisible[PIECE7_ID].origin,[11.3,0,5.2]);
  this.piecesInvisible[PIECE8_ID].x=13.3; this.piecesInvisible[PIECE8_ID].y=0; this.piecesInvisible[PIECE8_ID].z=8;
  mat4.translate(this.piecesInvisible[PIECE8_ID].transformMatrix,this.piecesInvisible[PIECE8_ID].origin,[13.3,0,8]);
  this.piecesInvisible[PIECE9_ID].x=17.8; this.piecesInvisible[PIECE9_ID].y=0; this.piecesInvisible[PIECE9_ID].z=8;
  mat4.translate(this.piecesInvisible[PIECE9_ID].transformMatrix,this.piecesInvisible[PIECE9_ID].origin,[17.8,0,8]);
  this.piecesInvisible[PIECE10_ID].x=15.5; this.piecesInvisible[PIECE10_ID].y=0; this.piecesInvisible[PIECE10_ID].z=11.5;
  mat4.translate(this.piecesInvisible[PIECE10_ID].transformMatrix,this.piecesInvisible[PIECE10_ID].origin,[15.5,0,11.5]);
}
else if(id==3){
  this.pieces[PIECE1_ID].x=28.6; this.pieces[PIECE1_ID].y=0; this.pieces[PIECE1_ID].z=21.5;
  mat4.translate(this.pieces[PIECE1_ID].transformMatrix,this.pieces[PIECE1_ID].origin,[28.6,0,21.5]);
  this.pieces[PIECE2_ID].x=28.6; this.pieces[PIECE2_ID].y=0; this.pieces[PIECE2_ID].z=17.5;
  mat4.translate(this.pieces[PIECE2_ID].transformMatrix,this.pieces[PIECE2_ID].origin,[28.6,0,17.5]);
  this.pieces[PIECE3_ID].x=28.6; this.pieces[PIECE3_ID].y=0; this.pieces[PIECE3_ID].z=13;
  mat4.translate(this.pieces[PIECE3_ID].transformMatrix,this.pieces[PIECE3_ID].origin,[28.6,0,13]);
  this.pieces[PIECE4_ID].x=28.6; this.pieces[PIECE4_ID].y=0; this.pieces[PIECE4_ID].z=9;
  mat4.translate(this.pieces[PIECE4_ID].transformMatrix,this.pieces[PIECE4_ID].origin,[28.6,0,9]);
  this.pieces[PIECE5_ID].x=25; this.pieces[PIECE5_ID].y=0; this.pieces[PIECE5_ID].z=10.8;
  mat4.translate(this.pieces[PIECE5_ID].transformMatrix,this.pieces[PIECE5_ID].origin,[25,0,10.8]);
  this.pieces[PIECE6_ID].x=25; this.pieces[PIECE6_ID].y=0; this.pieces[PIECE6_ID].z=15;
  mat4.translate(this.pieces[PIECE6_ID].transformMatrix,this.pieces[PIECE6_ID].origin,[25,0,15]);
  this.pieces[PIECE7_ID].x=25; this.pieces[PIECE7_ID].y=0; this.pieces[PIECE7_ID].z=19.8;
  mat4.translate(this.pieces[PIECE7_ID].transformMatrix,this.pieces[PIECE7_ID].origin,[25,0,19.8]);
  this.pieces[PIECE8_ID].x=21.5; this.pieces[PIECE8_ID].y=0; this.pieces[PIECE8_ID].z=13;
  mat4.translate(this.pieces[PIECE8_ID].transformMatrix,this.pieces[PIECE8_ID].origin,[21.5,0,13]);
  this.pieces[PIECE9_ID].x=21.5; this.pieces[PIECE9_ID].y=0; this.pieces[PIECE9_ID].z=17.5;
  mat4.translate(this.pieces[PIECE9_ID].transformMatrix,this.pieces[PIECE9_ID].origin,[21.5,0,17.5]);

  this.piecesInvisible[PIECE1_ID].x=28.6; this.piecesInvisible[PIECE1_ID].y=0; this.piecesInvisible[PIECE1_ID].z=21.5;
  mat4.translate(this.piecesInvisible[PIECE1_ID].transformMatrix,this.piecesInvisible[PIECE1_ID].origin,[28.6,0,21.5]);
  this.piecesInvisible[PIECE2_ID].x=28.6; this.piecesInvisible[PIECE2_ID].y=0; this.piecesInvisible[PIECE2_ID].z=17.5;
  mat4.translate(this.piecesInvisible[PIECE2_ID].transformMatrix,this.piecesInvisible[PIECE2_ID].origin,[28.6,0,17.5]);
  this.piecesInvisible[PIECE3_ID].x=28.6; this.piecesInvisible[PIECE3_ID].y=0; this.piecesInvisible[PIECE3_ID].z=13;
  mat4.translate(this.piecesInvisible[PIECE3_ID].transformMatrix,this.piecesInvisible[PIECE3_ID].origin,[28.6,0,13]);
  this.piecesInvisible[PIECE4_ID].x=28.6; this.piecesInvisible[PIECE4_ID].y=0; this.piecesInvisible[PIECE4_ID].z=9;
  mat4.translate(this.piecesInvisible[PIECE4_ID].transformMatrix,this.piecesInvisible[PIECE4_ID].origin,[28.6,0,9]);
  this.piecesInvisible[PIECE5_ID].x=25; this.piecesInvisible[PIECE5_ID].y=0; this.piecesInvisible[PIECE5_ID].z=10.8;
  mat4.translate(this.piecesInvisible[PIECE5_ID].transformMatrix,this.piecesInvisible[PIECE5_ID].origin,[25,0,10.8]);
  this.piecesInvisible[PIECE6_ID].x=25; this.piecesInvisible[PIECE6_ID].y=0; this.piecesInvisible[PIECE6_ID].z=15;
  mat4.translate(this.piecesInvisible[PIECE6_ID].transformMatrix,this.piecesInvisible[PIECE6_ID].origin,[25,0,15]);
  this.piecesInvisible[PIECE7_ID].x=25; this.piecesInvisible[PIECE7_ID].y=0; this.piecesInvisible[PIECE7_ID].z=19.8;
  mat4.translate(this.piecesInvisible[PIECE7_ID].transformMatrix,this.piecesInvisible[PIECE7_ID].origin,[25,0,19.8]);
  this.piecesInvisible[PIECE8_ID].x=21.5; this.piecesInvisible[PIECE8_ID].y=0; this.piecesInvisible[PIECE8_ID].z=13;
  mat4.translate(this.piecesInvisible[PIECE8_ID].transformMatrix,this.piecesInvisible[PIECE8_ID].origin,[21.5,0,13]);
  this.piecesInvisible[PIECE9_ID].x=21.5; this.piecesInvisible[PIECE9_ID].y=0; this.piecesInvisible[PIECE9_ID].z=17.5;
  mat4.translate(this.piecesInvisible[PIECE9_ID].transformMatrix,this.piecesInvisible[PIECE9_ID].origin,[21.5,0,17.5]);
  this.piecesInvisible[PIECE10_ID].x=18.5; this.piecesInvisible[PIECE10_ID].y=0; this.piecesInvisible[PIECE10_ID].z=15;
  mat4.translate(this.piecesInvisible[PIECE10_ID].transformMatrix,this.piecesInvisible[PIECE10_ID].origin,[18.5,0,15]);
}

};

Area.prototype = Object.create(CGFobject.prototype);
Area.prototype.constructor = Area;

Area.prototype.display= function(){

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE1_ID].display();
  this.piecesInvisible[PIECE1_ID].display();
  this.scene.popMatrix();


  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE2_ID].display();
  this.piecesInvisible[PIECE2_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE3_ID].display();
  this.piecesInvisible[PIECE3_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE4_ID].display();
  this.piecesInvisible[PIECE4_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE5_ID].display();
  this.piecesInvisible[PIECE5_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE6_ID].display();
  this.piecesInvisible[PIECE6_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE7_ID].display();
  this.piecesInvisible[PIECE7_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE8_ID].display();
  this.piecesInvisible[PIECE8_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.pieces[PIECE9_ID].display();
  this.piecesInvisible[PIECE9_ID].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.piecesInvisible[PIECE10_ID].display();
  this.scene.popMatrix();



}
