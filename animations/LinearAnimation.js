/**
 * LinearAnimation
 * @constructor
 */
 function LinearAnimation(scene, id,controlPoints, speed) {
   this.scene = scene;
  this.id=id;
  this.controlPoints=controlPoints;
  this.speed=speed;

 };

 LinearAnimation.prototype = Object.create(Animation.prototype);
 LinearAnimation.prototype.constructor = LinearAnimation;
