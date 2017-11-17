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

  for (var i = 0; i < controlPoints[0].length-1; i++) {

    this.distance[i] = Math.sqrt(Math.pow((controlPoints[0][i+1][0] - controlPoints[0][i][0]),2) + Math.pow((controlPoints[0][i+1][1] - controlPoints[0][i][1]),2) + Math.pow((controlPoints[0][i+1][2] - controlPoints[0][i][2]),2));


    this.direction[i]=[];
    this.direction[i][0] = speed * ((controlPoints[0][i+1][0] - controlPoints[0][i][0])/this.distance[i]);
    this.direction[i][1] = speed * ((controlPoints[0][i+1][1] - controlPoints[0][i][1])/this.distance[i]);
    this.direction[i][2] = speed * ((controlPoints[0][i+1][2] - controlPoints[0][i][2])/this.distance[i]);

    this.time[i] = this.distance[i]/speed;

  }

}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = Object;

LinearAnimation.prototype.update = function(current_time){
   mat4.identity(this.matrix);

  for (var i = 0; i < this.controlPoints[0].length-1; i++) {

      mat4.translate(this.matrix,this.matrix,[((this.distance[i]*current_time)/this.time[i])*this.direction[i][0],
      ((this.distance[i]*current_time)/this.time[i])*this.direction[i][1],
      ((this.distance[i]*current_time)/this.time[i])*this.direction[i][2]]);
}

    mat4.translate(this.matrix,this.matrix,[this.controlPoints[0][0][0], this.controlPoints[0][0][1], this.controlPoints[0][0][2]]);
};
