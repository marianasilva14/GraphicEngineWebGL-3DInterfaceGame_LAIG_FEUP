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
   {'x':8, 'y':38.5, 'z':27.7},
   {'x':9.3, 'y':38.5, 'z':32},
   {'x':11.3, 'y':38.5, 'z':37},
   {'x':13, 'y':38.5, 'z':41},
   {'x':12.3, 'y':38.5, 'z':28.2},
   {'x':14, 'y':38.5, 'z':33},
   {'x':15.7, 'y':38.5, 'z':37.8},
   {'x':16.9, 'y':38.5, 'z':29.2},
   {'x':18.3, 'y':38.5, 'z':34}
 ];

 var piecesInvisibleAux=[
   {'x':8, 'y':38.5, 'z':27.7},
   {'x':9.3, 'y':38.5, 'z':32},
   {'x':11.3, 'y':38.5, 'z':37},
   {'x':13, 'y':38.5, 'z':41},
   {'x':12.3, 'y':38.5, 'z':28.2},
   {'x':14, 'y':38.5, 'z':33},
   {'x':15.7, 'y':38.5, 'z':37.8},
   {'x':16.9, 'y':38.5, 'z':29.2},
   {'x':18.3, 'y':38.5, 'z':34},
   {'x':21, 'y':38.5, 'z':30.5},
  ];

}
else if(id==1){

  var piecesAux=[
 {'x':22.6, 'y':38.5, 'z':45.7},
 {'x':27, 'y':38.5, 'z':44},
 {'x':32, 'y':38.5, 'z':42.5},
 {'x':36, 'y':38.5, 'z':40.8},
 {'x':23.5, 'y':38.5, 'z':41.5},
 {'x':28.2, 'y':38.5, 'z':40},
 {'x':32.5, 'y':38.5, 'z':38},
 {'x':24.5, 'y':38.5, 'z':37},
 {'x':29, 'y':38.5, 'z':35.5}
];

var piecesInvisibleAux=[
  {'x':22.6, 'y':38.5, 'z':45.7},
  {'x':27, 'y':38.5, 'z':44},
  {'x':32, 'y':38.5, 'z':42.5},
  {'x':36, 'y':38.5, 'z':40.8},
  {'x':23.5, 'y':38.5, 'z':41.5},
  {'x':28.2, 'y':38.5, 'z':40},
  {'x':32.5, 'y':38.5, 'z':38},
  {'x':24.5, 'y':38.5, 'z':37},
  {'x':29, 'y':38.5, 'z':35.5},
  {'x':25.5, 'y':38.5, 'z':33},
];

}

else if(id==2){

  var piecesAux=[
 {'x':26, 'y':38.5, 'z':12.5},
 {'x':21.5, 'y':38.5, 'z':14},
 {'x':17.3, 'y':38.5, 'z':15.7},
 {'x':12.8, 'y':38.5, 'z':17.3},
 {'x':25.3, 'y':38.5, 'z':17},
 {'x':21, 'y':38.5, 'z':18.5},
 {'x':16, 'y':38.5, 'z':20},
 {'x':24.5, 'y':38.5, 'z':21},
 {'x':20, 'y':38.5, 'z':22.8}
];

var piecesInvisibleAux=[
  {'x':26, 'y':38.5, 'z':12.5},
  {'x':21.5, 'y':38.5, 'z':14},
  {'x':17.3, 'y':38.5, 'z':15.7},
  {'x':12.8, 'y':38.5, 'z':17.3},
  {'x':25.3, 'y':38.5, 'z':17},
  {'x':21, 'y':38.5, 'z':18.5},
  {'x':16, 'y':38.5, 'z':20},
  {'x':24.5, 'y':38.5, 'z':21},
  {'x':20, 'y':38.5, 'z':22.8},
  {'x':23.4, 'y':38.5, 'z':25.5}
];

}
else if(id==3){

  var piecesAux=[
 {'x':40.8, 'y':38.5, 'z':30.8},
 {'x':39, 'y':38.5, 'z':26.5},
 {'x':37.5, 'y':38.5, 'z':21.8},
 {'x':36, 'y':38.5, 'z':17.3},
 {'x':33, 'y':38.5, 'z':21},
 {'x':35, 'y':38.5, 'z':25.5},
 {'x':36.5, 'y':38.5, 'z':30},
 {'x':30.5, 'y':38.5, 'z':24.5},
 {'x':32, 'y':38.5, 'z':29}
];

var piecesInvisibleAux=[
  {'x':40.8, 'y':38.5, 'z':30.8},
  {'x':39, 'y':38.5, 'z':26.5},
  {'x':37.5, 'y':38.5, 'z':21.8},
  {'x':36, 'y':38.5, 'z':17.3},
  {'x':33, 'y':38.5, 'z':21},
  {'x':35, 'y':38.5, 'z':25.5},
  {'x':36.5, 'y':38.5, 'z':30},
  {'x':30.5, 'y':38.5, 'z':24.5},
  {'x':32, 'y':38.5, 'z':29},
  {'x':28, 'y':38.5, 'z':28}
];
}

 for(var i=0; i < piecesAux.length;i++){
   this.pieces[i+1].x=piecesAux[i].x;
   this.pieces[i+1].y=piecesAux[i].y;
   this.pieces[i+1].z=piecesAux[i].z;
   var addCoordinates=[
     {'x':piecesAux[i].x,
     'y':piecesAux[i].y,
     'z':piecesAux[i].z}];
   this.pieces[i+1].coordinates.push(addCoordinates);
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
  this.scene.scale(0.5,0.2,0.5);
  this.pieces[i].display();
  this.piecesInvisible[i].display();
  this.scene.popMatrix();
  }
  this.scene.pushMatrix();
  this.scene.scale(0.5,0.2,0.5);
  this.piecesInvisible[PIECE10_ID].display();
  this.scene.popMatrix();
}

else{
    for(var i=1; i <=9;i++){
    this.scene.pushMatrix();
    this.scene.scale(0.5,0.2,0.5);
    this.pieces[i].display();
    this.scene.popMatrix();
    }
}


}
