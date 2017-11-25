/**
* LinearAnimation
* @param id id of animation
* @param controlPoints animation control points
* @param speed animation speed
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
  this.actualControlPoint=0;
  this.distanceAcu=0;
  this.lastTime=-1;

  for (var i = 1; i < controlPoints[0].length; i++) {

    this.distance.push(Math.sqrt(Math.pow((controlPoints[0][i][0] - controlPoints[0][i-1][0]),2) + Math.pow((controlPoints[0][i][1] - controlPoints[0][i-1][1]),2) + Math.pow((controlPoints[0][i][2] - controlPoints[0][i-1][2]),2)));
    this.totalTime += this.distance[i-1]/speed;
  }

}

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = Object;

LinearAnimation.prototype.update = function(current_time){

   mat4.identity(this.matrix);
   if(this.lastTime==-1){
     this.lastTime=current_time;
     return;
   }

   var ellapsedTime=current_time-this.lastTime;

   this.distanceAcu += ellapsedTime*this.speed;

   this.lastTime=current_time;
   var t = this.distanceAcu/this.distance[this.actualControlPoint];

   if(t >= 1){
     this.actualControlPoint++;
     this.distanceAcu = 0;
   }

     var P1 = this.controlPoints[0][this.actualControlPoint];
     var P2 = this.controlPoints[0][this.actualControlPoint+1];

      var x = P1[0] * (1-t) + P2[0]*t;
      var y = P1[1] * (1-t) + P2[1]*t;
      var z = P1[2] * (1-t) + P2[2]*t;

     mat4.translate(this.matrix,this.matrix,[x,y,z]);
     mat4.rotate(this.matrix,this.matrix,Math.atan2(P2[0]-P1[0],P2[2]-P1[2]),[0,1,0]);


};
