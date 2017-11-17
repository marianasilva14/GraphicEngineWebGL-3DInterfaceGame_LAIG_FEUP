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
  this.time[0]=0;
  this.totalTime =0;

  for (var i = 1; i < controlPoints[0].length; i++) {

    this.distance[i-1] = Math.sqrt(Math.pow((controlPoints[0][i][0] - controlPoints[0][i-1][0]),2) + Math.pow((controlPoints[0][i][1] - controlPoints[0][i-1][1]),2) + Math.pow((controlPoints[0][i][2] - controlPoints[0][i-1][2]),2));


    this.direction[i-1]=[];
    this.direction[i-1][0] = speed * ((controlPoints[0][i][0] - controlPoints[0][i-1][0])/this.distance[i-1]);
    this.direction[i-1][1] = speed * ((controlPoints[0][i][1] - controlPoints[0][i-1][1])/this.distance[i-1]);
    this.direction[i-1][2] = speed * ((controlPoints[0][i][2] - controlPoints[0][i-1][2])/this.distance[i-1]);

    this.time[i] = this.distance[i-1]/speed;
    this.totalTime += this.distance[i-1]/speed;
  }

  console.log(this.time);
}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = Object;

LinearAnimation.prototype.update = function(current_time){
  console.log(current_time);
   mat4.identity(this.matrix);

  // mat4.translate(this.matrix,this.matrix,[this.controlPoints[0][0][0], this.controlPoints[0][0][1], this.controlPoints[0][0][2]]);
  for (var i = 0; i < this.controlPoints[0].length-1; i++) {
    if(current_time>=this.time[i+1]){
        current_time-=this.time[i+1];
        mat4.translate(this.matrix,this.matrix,[this.controlPoints[0][i+1][0], this.controlPoints[0][i+1][1], this.controlPoints[0][i+1][2]]);
        console.log(this.matrix);
      }
    else {
      mat4.translate(this.matrix,this.matrix,[this.controlPoints[0][i][0], this.controlPoints[0][i][1], this.controlPoints[0][i][2]]);
      mat4.translate(this.matrix,this.matrix,[((this.distance[i]*current_time)/this.time[i+1])*this.direction[i][0],
      ((this.distance[i]*current_time)/this.time[i+1])*this.direction[i][1],
      ((this.distance[i]*current_time)/this.time[i+1])*this.direction[i][2]]);

      break;
    }


  }


};
