class Area {
 constructor(scene,graph,idPlayer,id){
   this.graph=graph;
   this.scene=scene;

   this.pieces=[];


   this.pieces[PIECE1_ID]=new Piece(scene);
   this.pieces[PIECE2_ID]=new Piece(scene);
   this.pieces[PIECE3_ID]=new Piece(scene);
   this.pieces[PIECE4_ID]=new Piece(scene);
   this.pieces[PIECE5_ID]=new Piece(scene);
   this.pieces[PIECE6_ID]=new Piece(scene);
   this.pieces[PIECE7_ID]=new Piece(scene);
   this.pieces[PIECE8_ID]=new Piece(scene);
   this.pieces[PIECE9_ID]=new Piece(scene);

 }


};

Area.prototype = Object.create(CGFobject.prototype);
Area.prototype.constructor = Area;

Area.prototype.display= function(){

}
