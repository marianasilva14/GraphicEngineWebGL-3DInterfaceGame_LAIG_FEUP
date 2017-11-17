/**
 * CircularAnimation
 * @constructor
 */
 function CircularAnimation(scene, id, center, radius, startAng, rotAng, speed) {
  this.scene = scene;
  this.center=center;
  this.radius=radius;
  this.startAng=startAng;
  this.rotAng=rotAng;
  this.speed=speed;
  this.matrix = mat4.create();
  this.totalTime = 0;

  this.startAng=this.startAng * (Math.PI / 180);
  this.rotAng=this.rotAng * (Math.PI / 180);

  this.perimeter=Math.PI*2*radius;
  this.time=[];
  this.time[0]=((this.perimeter*this.rotAng)/(2*Math.PI))/this.speed;
  this.totalTime = this.time[0];

 };

 CircularAnimation.prototype = Object.create(Animation.prototype);
 CircularAnimation.prototype.constructor = Object;

 CircularAnimation.prototype.update = function(current_time){
    mat4.identity(this.matrix);

    var percent_time = current_time / this.time[0];

    mat4.translate(this.matrix,this.matrix,this.center);
    mat4.rotate(this.matrix,this.matrix,percent_time*this.rotAng + this.startAng, [0,1,0]);
    mat4.translate(this.matrix,this.matrix,[this.radius,0,0]);
    mat4.rotate(this.matrix,this.matrix,90*(Math.PI/180),[0,1,0]);

}
