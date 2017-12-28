function GamingHouse(scene){
  this.scene = scene;
  this.reader = this.scene.reader;
  this.graph = this.scene.graph;

  this.board= new MyRectangle(this.scene,0,10,10,0);
  this.boardAppearence=new CGFappearance(this.scene);
  this.boardAppearence.loadTexture("../scenes/images/board.png");

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
  this.wallpaperAppearence.loadTexture("../scenes/images/wallpaper.jpg");

  this.tableCoverAppearence= new CGFappearance(this.scene);
  this.tableCoverAppearence.loadTexture("../scenes/images/wood.jpg");

  this.tableCoverGreenAppearence= new CGFappearance(this.scene);
  this.tableCoverGreenAppearence.loadTexture("../scenes/images/green.png");


  this.ashtray= new MyCylinder(this.scene,4,2,2,70,70,1,1);
  this.ashtrayAppearence=new CGFappearance(this.scene);
  this.ashtrayAppearence.loadTexture("../scenes/images/metal.jpeg");

  this.ashtrayHead= new MyCylinder(this.scene,4,2,2,70,70,0,1);
  this.ashtrayHeadAppearence=new CGFappearance(this.scene);
  this.ashtrayHeadAppearence.loadTexture("../scenes/images/metal.jpeg");

  this.cigarette=[];
  for(var i=0; i < 2;i++)
  this.cigarette[i] =new MyCylinder(this.scene,2,0.15,0.15,70,70,1,1);
  this.cigaretteAppearence=new CGFappearance(this.scene);
  this.cigaretteAppearence.loadTexture("../scenes/images/cigarette.jpg");
}

GamingHouse.prototype.display=function(){
  this.scene.pushMatrix();
  this.scene.scale(1.65,1.65,1.65);
  this.scene.translate(4.3,4.6,15.2);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.scene.rotate(20*Math.PI/180,0,0,1);
  this.boardAppearence.apply();
  this.board.display();
  this.scene.popMatrix();

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
  this.scene.scale(12,0.1,12);
  this.scene.translate(1,70,1.2);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.tableCoverAppearence.apply();
  this.tableCover.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(12,0.1,12);
  this.scene.translate(1,70.5,1.2);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.tableCoverGreenAppearence.apply();
  this.tableCoverGreen.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(0.5,0.05,0.5);
  this.scene.translate(20,150,9);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.ashtrayAppearence.apply();
  this.ashtray.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(0.5,0.15,0.5);
  this.scene.translate(20,50,9);
  this.scene.rotate(-90*Math.PI/180,1,0,0);
  this.ashtrayHeadAppearence.apply();
  this.ashtrayHead.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(9.8,8.3,4.5);
  this.scene.rotate(35*Math.PI/180,1,0,0);
  this.scene.rotate(-45*Math.PI/180,0,1,0);
  this.cigaretteAppearence.apply();
  this.cigarette[0].display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(10.8,8.4,4.6);
  this.scene.rotate(80*Math.PI/180,1,0,0);
  this.scene.rotate(-300*Math.PI/180,0,1,0);
  this.cigaretteAppearence.apply();
  this.cigarette[1].display();
  this.scene.popMatrix();

}
