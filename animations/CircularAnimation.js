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

  this.startAng=this.startAng * (Math.PI / 180);
  this.rotAng=this.rotAng * (Math.PI / 180);

  this.perimeter=Math.PI*2*radius;
  this.time=[];
  this.time[0]=((this.perimeter*this.rotAng)/(2*Math.PI))/speed;

 };

 CircularAnimation.prototype = Object.create(Animation.prototype);
 CircularAnimation.prototype.constructor = Object;

 CircularAnimation.prototype.update = function(current_time){

  var distance = (this.rotAng * this.perimeter) / (2*Math.PI);
  console.log('distance'+distance);


  console.log('rotang'+this.rotAng);
  console.log('centerx '+this.center[0]);
  console.log('centery '+this.center[1]);
  console.log('centerz '+this.center[2]);

    mat4.translate(this.matrix,this.matrix,[this.center[0], this.center[1], this.center[2]]);
    if(current_time < this.time[0])
      mat4.rotate(this.matrix,this.matrix, this.rotAng, [0,(current_time*distance)/this.time[0],0]);

    mat4.rotate(this.matrix,this.matrix,this.startAng,[0,1,0]);
    mat4.translate(this.matrix,this.matrix,[this.radius,0,0]);



}
