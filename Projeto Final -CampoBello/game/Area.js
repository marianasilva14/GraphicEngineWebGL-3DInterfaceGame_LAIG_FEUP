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
   for(var j=id*9+1; j < (id*9+10);j++){

    if(id==0 || id==1){
     this.pieces[i]=new Piece(scene,idPlayer,j,PIECEX,true);
    }
     else if(id==2 || id==3){
       this.pieces[i]=new Piece(scene,idPlayer,j,PIECEY,true);
     }
   i++;
  }
  var k=1;
  for(var j=id*9+1; j < (id*9+10);j++){
    if(id==0 || id==1){
     this.piecesInvisible[k]=new Piece(scene,idPlayer,j,PIECEX,false);
    }
     else if(id==2 || id==3){
      this.piecesInvisible[k]=new Piece(scene,idPlayer,j,PIECEY,false);
     }
   k++;
  }
  var lastID;
  if(id==0)
    lastID=37;
  else if(id==1){
      lastID=38;
    }
  else if (id==2) {
    lastID=39;
  }
  else if (id==3) {
    lastID=40;
  }
  this.piecesInvisible[10]=new Piece(scene,idPlayer,lastID,NO_PIECE,false);


 //coordenadas pecas
 if(id==0){
    var piecesAux=[
   {'x':1.5, 'y':0, 'z':9},
   {'x':1.5, 'y':0, 'z':13},
   {'x':1.5, 'y':0, 'z':17.3},
   {'x':1.5, 'y':0, 'z':22},
   {'x':5, 'y':0, 'z':11},
   {'x':5, 'y':0, 'z':15},
   {'x':5, 'y':0, 'z':19.8},
   {'x':8.7, 'y':0, 'z':13},
   {'x':8.7, 'y':0, 'z':17.5}
 ];

 var piecesInvisibleAux=[
    {'x':1.5, 'y':0, 'z':9},
    {'x':1.5, 'y':0, 'z':13},
    {'x':1.5, 'y':0, 'z':17.3},
    {'x':1.5, 'y':0, 'z':22},
    {'x':5, 'y':0, 'z':11},
    {'x':5, 'y':0, 'z':15},
    {'x':5, 'y':0, 'z':19.8},
    {'x':8.7, 'y':0, 'z':13},
    {'x':8.7, 'y':0, 'z':17.5},
    {'x':11.5, 'y':0, 'z':15}
  ];

}
else if(id==1){

  var piecesAux=[
 {'x':8.3, 'y':0, 'z':28.6},
 {'x':12.7, 'y':0, 'z':28.6},
 {'x':17.2, 'y':0, 'z':28.6},
 {'x':21.5, 'y':0, 'z':28.6},
 {'x':10.5, 'y':0, 'z':25.5},
 {'x':15, 'y':0, 'z':25.5},
 {'x':19.5, 'y':0, 'z':25.5},
 {'x':12.7, 'y':0, 'z':22},
 {'x':17, 'y':0, 'z':22}
];

var piecesInvisibleAux=[
  {'x':8.3, 'y':0, 'z':28.6},
  {'x':12.7, 'y':0, 'z':28.6},
  {'x':17.2, 'y':0, 'z':28.6},
  {'x':21.5, 'y':0, 'z':28.6},
  {'x':10.5, 'y':0, 'z':25.5},
  {'x':15, 'y':0, 'z':25.5},
  {'x':19.5, 'y':0, 'z':25.5},
  {'x':12.7, 'y':0, 'z':22},
  {'x':17, 'y':0, 'z':22},
  {'x':15, 'y':0, 'z':18.8}
];

}

else if(id==2){

  var piecesAux=[
 {'x':22, 'y':0, 'z':1.5},
 {'x':17.5, 'y':0, 'z':1.5},
 {'x':13.5, 'y':0, 'z':1.5},
 {'x':9, 'y':0, 'z':1.5},
 {'x':19.8, 'y':0, 'z':5.2},
 {'x':15.5, 'y':0, 'z':5.2},
 {'x':11.3, 'y':0, 'z':5.2},
 {'x':13.3, 'y':0, 'z':8},
 {'x':17.8, 'y':0, 'z':8}
];

var piecesInvisibleAux=[
  {'x':22, 'y':0, 'z':1.5},
  {'x':17.5, 'y':0, 'z':1.5},
  {'x':13.5, 'y':0, 'z':1.5},
  {'x':9, 'y':0, 'z':1.5},
  {'x':19.8, 'y':0, 'z':5.2},
  {'x':15.5, 'y':0, 'z':5.2},
  {'x':11.3, 'y':0, 'z':5.2},
  {'x':13.3, 'y':0, 'z':8},
  {'x':17.8, 'y':0, 'z':8},
  {'x':15.5, 'y':0, 'z':11.5}
];

}
else if(id==3){

  var piecesAux=[
 {'x':28.6, 'y':0, 'z':21.5},
 {'x':28.6, 'y':0, 'z':17.5},
 {'x':28.6, 'y':0, 'z':13},
 {'x':28.6, 'y':0, 'z':9},
 {'x':25, 'y':0, 'z':10.8},
 {'x':25, 'y':0, 'z':15},
 {'x':25, 'y':0, 'z':19.8},
 {'x':21.5, 'y':0, 'z':13},
 {'x':21.5, 'y':0, 'z':17.5}
];

var piecesInvisibleAux=[
  {'x':28.6, 'y':0, 'z':21.5},
  {'x':28.6, 'y':0, 'z':17.5},
  {'x':28.6, 'y':0, 'z':13},
  {'x':28.6, 'y':0, 'z':9},
  {'x':25, 'y':0, 'z':10.8},
  {'x':25, 'y':0, 'z':15},
  {'x':25, 'y':0, 'z':19.8},
  {'x':21.5, 'y':0, 'z':13},
  {'x':21.5, 'y':0, 'z':17.5},
  {'x':18.5, 'y':0, 'z':15}
];
}

 for(var i=0; i < piecesAux.length;i++){
   this.pieces[i+1].x=piecesAux[i].x;
   this.pieces[i+1].y=piecesAux[i].y;
   this.pieces[i+1].z=piecesAux[i].z;
 }

  for(var i=0; i < piecesInvisibleAux.length;i++){
     this.piecesInvisible[i+1].x=piecesInvisibleAux[i].x;
     this.piecesInvisible[i+1].y=piecesInvisibleAux[i].y;
    this.piecesInvisible[i+1].z=piecesInvisibleAux[i].z;
   }

   console.log('invisible',this.piecesInvisible[10]);
 for(var i=1; i<= 9;i++){
    mat4.translate(this.pieces[i].transformMatrix,this.pieces[i].origin,[this.pieces[i].x,this.pieces[i].y,this.pieces[i].z]);
    mat4.translate(this.piecesInvisible[i].transformMatrix,this.piecesInvisible[i].origin,[this.piecesInvisible[i].x,this.piecesInvisible[i].y,this.piecesInvisible[i].z]);
 }
    mat4.translate(this.piecesInvisible[10].transformMatrix,this.piecesInvisible[10].origin,[this.piecesInvisible[10].x,this.piecesInvisible[10].y,this.piecesInvisible[10].z]);

};

Area.prototype = Object.create(CGFobject.prototype);
Area.prototype.constructor = Area;

Area.prototype.display= function(){

if(this.scene.pickMode){
  for(var i=1; i <=9;i++){
  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.pieces[i].display();
  this.piecesInvisible[i].display();
  this.scene.popMatrix();
  }
  this.scene.pushMatrix();
  this.scene.scale(1,0.5,1);
  this.piecesInvisible[PIECE10_ID].display();
  this.scene.popMatrix();
}

else{
    for(var i=1; i <=9;i++){
    this.scene.pushMatrix();
    this.scene.scale(1,0.5,1);
    this.pieces[i].display();
    this.scene.popMatrix();
    }
}


}
