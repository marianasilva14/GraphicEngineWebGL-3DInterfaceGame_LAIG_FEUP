/**
 * BezierAnimation
 * @constructor
 */
 function BezierAnimation(scene, controlPoints, speed) {
   this.scene = scene;
  this.controlPoints=controlPoints;
  this.speed=speed;
 };

 BezierAnimation.prototype = Object.create(Animation.prototype);
 BezierAnimation.prototype.constructor = BezierAnimation;
