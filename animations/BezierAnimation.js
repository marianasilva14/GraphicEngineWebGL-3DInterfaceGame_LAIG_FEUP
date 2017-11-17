/**
* BezierAnimation
* @constructor
*/
function BezierAnimation(scene, id, controlPoints, speed) {
  this.scene = scene;
  this.controlPoints=controlPoints;
  this.speed=speed;
  this.matrix = mat4.create();

  this.time = [];
  this.totalTime = 0;
  
  this.pointP1=controlPoints[0][0];
  this.pointP2=controlPoints[0][1];
  this.pointP3=controlPoints[0][2];
  this.pointP4=controlPoints[0][3];

  this.pointP12=[(this.pointP2[0]+this.pointP1[0])/2,(this.pointP2[1]+this.pointP1[1])/2,(this.pointP2[2]+this.pointP1[2])/2];
  this.pointP23=[(this.pointP3[0]+this.pointP2[0])/2,(this.pointP3[1]+this.pointP2[1])/2,(this.pointP3[2]+this.pointP2[2])/2];
  this.pointP34=[(this.pointP4[0]+this.pointP3[0])/2,(this.pointP4[1]+this.pointP3[1])/2,(this.pointP4[2]+this.pointP3[2])/2];
  this.pointP123=[(this.pointP12[0]+this.pointP23[0])/2,(this.pointP12[1]+this.pointP23[1])/2,(this.pointP12[2]+this.pointP23[2])/2];
  this.pointP234=[(this.pointP23[0]+this.pointP34[0])/2,(this.pointP23[1]+this.pointP34[1])/2,(this.pointP23[2]+this.pointP34[2])/2];


  this.distanceP1P12 = Math.sqrt(Math.pow((this.pointP1[0] - this.pointP12[0]),2) + Math.pow((this.pointP1[1] - this.pointP12[1]),2) + Math.pow((this.pointP1[2] - this.pointP12[2]),2));
  this.distanceP12P123= Math.sqrt(Math.pow((this.pointP12[0] - this.pointP123[0]),2) + Math.pow((this.pointP12[1] - this.pointP123[1]),2) + Math.pow((this.pointP12[2] - this.pointP123[2]),2));
  this.distanceP123P234= Math.sqrt(Math.pow((this.pointP123[0] - this.pointP234[0]),2) + Math.pow((this.pointP123[1] - this.pointP234[1]),2) + Math.pow((this.pointP123[2] - this.pointP234[2]),2));
  this.distanceP234P34= Math.sqrt(Math.pow((this.pointP234[0] - this.pointP34[0]),2) + Math.pow((this.pointP234[1] - this.pointP34[1]),2) + Math.pow((this.pointP234[2] - this.pointP34[2]),2));
  this.distanceP34P4= Math.sqrt(Math.pow((this.pointP34[0] - this.pointP4[0]),2) + Math.pow((this.pointP34[1] - this.pointP4[1]),2) + Math.pow((this.pointP34[2] - this.pointP4[2]),2));

  this.distance=this.distanceP1P12+this.distanceP12P123+this.distanceP123P234+this.distanceP234P34+this.distanceP34P4;
  this.time[0] = this.distance/speed;
  this.totalTime = this.time[0];


};

BezierAnimation.prototype = Object.create(Animation.prototype);
BezierAnimation.prototype.constructor = Object;

BezierAnimation.prototype.update= function(current_time){

      mat4.identity(this.matrix);

      var s= current_time/this.time[0];
      var calculateQ=[];
      var calculateDervQ=[];
      calculateQ[0]=Math.pow(1-s,3)*this.pointP1[0]+3*s*Math.pow(1-s,2)*this.pointP2[0]+3*Math.pow(s,2)*(1-s)*this.pointP3[0]+Math.pow(s,3)*this.pointP4[0];
      calculateQ[1]=Math.pow(1-s,3)*this.pointP1[1]+3*s*Math.pow(1-s,2)*this.pointP2[1]+3*Math.pow(s,2)*(1-s)*this.pointP3[1]+Math.pow(s,3)*this.pointP4[1];
      calculateQ[2]=Math.pow(1-s,3)*this.pointP1[2]+3*s*Math.pow(1-s,2)*this.pointP2[2]+3*Math.pow(s,2)*(1-s)*this.pointP3[2]+Math.pow(s,3)*this.pointP4[2];
      calculateDervQ[0]=-3*Math.pow(1-s,2)*this.pointP1[0]+(3*Math.pow(1-s,2)-6*s*(1-s))*this.pointP2[0]+(6*s*(1-s)-3*Math.pow(s,2))*this.pointP3[0]+3*Math.pow(s,2)*this.pointP4[0];
      calculateDervQ[1]=-3*Math.pow(1-s,2)*this.pointP1[1]+(3*Math.pow(1-s,2)-6*s*(1-s))*this.pointP2[1]+(6*s*(1-s)-3*Math.pow(s,2))*this.pointP3[1]+3*Math.pow(s,2)*this.pointP4[1];
      calculateDervQ[2]=-3*Math.pow(1-s,2)*this.pointP1[2]+(3*Math.pow(1-s,2)-6*s*(1-s))*this.pointP2[2]+(6*s*(1-s)-3*Math.pow(s,2))*this.pointP3[2]+3*Math.pow(s,2)*this.pointP4[2];

      var angle=Math.atan(calculateDervQ[0]/calculateDervQ[2]);
      mat4.translate(this.matrix,this.matrix,this.pointP1);
      mat4.translate(this.matrix,this.matrix,calculateQ);
      mat4.rotate(this.matrix,this.matrix,angle,[0,1,0]);
}
