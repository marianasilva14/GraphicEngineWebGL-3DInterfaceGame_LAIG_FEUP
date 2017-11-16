/**
 * BezierAnimation
 * @constructor
 */
 function BezierAnimation(scene, id, controlPoints, speed) {
   this.scene = scene;
   this.controlPoints=controlPoints;
   this.speed=speed;
 };

 BezierAnimation.prototype = Object.create(Animation.prototype);
 BezierAnimation.prototype.constructor = Object;

BezierAnimation.prototype.update= function(current_time){
  
}
