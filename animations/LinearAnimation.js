/**
* LinearAnimation
* @constructor
*/
function LinearAnimation(scene, id, controlPoints, speed) {
  this.scene = scene;
  this.id=id;
  this.controlPoints=controlPoints;
  this.speed=speed;
  this.direction = [];
  this.distance = [];
  this.matrix = mat4.create();
  this.time=[];

  for (var i = 0; i < controlPoints.length-1; i++) {

    this.distance[i] = Math.sqrt(Math.pow((controlPoints[i+1][0] - controlPoints[i][0]),2) + Math.pow((controlPoints[i+1][1] - controlPoints[i][1]),2) + Math.pow((controlPoints[i+1][2] - controlPoints[i][2]),2));

    this.direction[i]=[];
    this.direction[i][0] = (controlPoints[i+1][0] - controlPoints[i][0]);
    this.direction[i][1] = (controlPoints[i+1][1] - controlPoints[i][1]);
    this.direction[i][2] = (controlPoints[i+1][2] - controlPoints[i][2]);

    this.time[i] = this.distance[i]/this.speed;
  }

}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = Object;

LinearAnimation.prototype.update = function(current_time){

  console.log('current'+current_time);
  console.log('control points'+this.controlPoints[0]);
  mat4.translate(this.matrix,this.matrix,[this.controlPoints[0][0], this.controlPoints[0][1], this.controlPoints[0][2]]);

  //this.time[0] = this.time[0]/1000;

  if(current_time < this.time[0]){
    mat4.translate(this.matrix,this.matrix,[((this.distance[0]*current_time)/this.time[0])*this.direction[0][0],
    ((this.distance[0]*current_time)/this.time[0])*this.direction[0][1],
    ((this.distance[0]*current_time)/this.time[0])*this.direction[0][2]]);
  }
};
