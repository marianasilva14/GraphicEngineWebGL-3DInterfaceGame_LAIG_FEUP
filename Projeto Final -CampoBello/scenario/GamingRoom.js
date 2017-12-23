function GamingRoom(scene){
  this.scene = scene;
  this.reader = this.scene.reader;
  this.graph = this.scene.graph;

  this.wallpaper=[];
  this.floor= new MyRectangle(this.scene,0,10,10,0);
  this.wallpaper[0]= new MyRectangle(this.scene,0,10,10,0);
  this.wallpaper[1]=  new MyRectangle(this.scene,0,10,10,0);
  this.tableCover= new MyCylinder(this.scene,4,1,1,70,70,1,1);
  this.tableCoverGreen= new MyCylinder(this.scene,4,1,1,70,70,1,1);
  this.tableLeg= new MyCylinder(this.scene,4,2,1,70,70,1,1);

  this.floorAppearence= new CGFappearance(this.scene);
  this.floorAppearence.loadTexture("../scenes/images/wood.jpg");

  this.wallpaperAppearence= new CGFappearance(this.scene);
  this.wallpaperAppearence.loadTexture("../scenes/images/roomWallpaper.jpg");


  this.table=new Array(6);
  for(var i=0; i < this.table.length;i++)
  this.table[i]= new MyRectangle(this.scene,0,1,1,0);

  this.tableAppearence=new CGFappearance(this.scene);
  this.tableAppearence.loadTexture("../scenes/images/wood.jpg");


}

GamingRoom.prototype.display=function(){
  this.scene.pushMatrix();
  this.scene.scale(2.9,3.2,3.1);
  this.scene.translate(0,0,10);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.floorAppearence.apply();
  this.floor.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(2.9,1.5,3.1);
  this.wallpaperAppearence.apply();
  this.wallpaper[0].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(2.9,1.5,3.1);
  this.scene.translate(0,0,10);
  this.scene.rotate(90*Math.PI/180,0,1,0);
  this.wallpaperAppearence.apply();
  this.wallpaper[1].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(18,0.5,18);
  this.scene.translate(0.66,14.5,0.8);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.scene.rotate(20*Math.PI/180,0,0,1);
  this.scene.translate(-0.5,-0.5,0.5);
  this.tableAppearence.apply();
  this.table[0].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(18,0.5,18);
  this.scene.translate(0.66,14.5,0.8);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.scene.rotate(20*Math.PI/180,0,0,1);
  this.scene.translate(-0.5,-0.5,-0.5);
  this.scene.rotate(-90*Math.PI/180,0,1,0);
  this.tableAppearence.apply();
  this.table[1].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(18,0.5,18);
  this.scene.translate(0.66,14.5,0.8);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.scene.rotate(20*Math.PI/180,0,0,1);
  this.scene.translate(0.5,-0.5,0.5);
  this.scene.rotate(90*Math.PI/180,0,1,0);
  this.tableAppearence.apply();
  this.table[2].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(18,0.5,18);
  this.scene.translate(0.66,14.5,0.8);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.scene.rotate(20*Math.PI/180,0,0,1);
  this.scene.translate(0.5,-0.5,-0.5);
  this.scene.rotate(180*Math.PI/180,0,1,0);
  this.tableAppearence.apply();
  this.table[3].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(18,0.5,18);
  this.scene.translate(0.66,14.5,0.8);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.scene.rotate(20*Math.PI/180,0,0,1);
  this.scene.translate(-0.5,0.5,0.5);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.tableAppearence.apply();
  this.table[4].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(18,0.5,18);
  this.scene.translate(0.66,14.5,0.8);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.scene.rotate(20*Math.PI/180,0,0,1);
  this.scene.translate(-0.5,-0.5,-0.5);
  this.scene.rotate(90*Math.PI/180,1,0,0);
  this.tableAppearence.apply();
  this.table[5].display();
  this.scene.popMatrix();

}
