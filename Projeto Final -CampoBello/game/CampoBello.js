/**
 * CampoBello
 */
 class CampoBello {
 	constructor(scene,graph){
    this.graph=graph;
    this.scene=scene;

    this.board = [][];
    this.areas=[];


    this.areas[0]=new Area(scene,1,1);
    this.areas[1]=new Area(scene,1,2);
    this.areas[2]=new Area(scene,2,1);
    this.areas[3]=new Area(scene,2,2);

  }


 };

 CampoBello.prototype = Object.create(CGFobject.prototype);
 CampoBello.prototype.constructor = CampoBello;
