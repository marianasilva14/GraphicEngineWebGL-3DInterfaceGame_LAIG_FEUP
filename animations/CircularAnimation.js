/**
 * CircularAnimation
 * @constructor
 */
 function CircularAnimation(scene, center, radius, startAng, rotAng, speed) {
  this.scene = scene;
  this.center=center;
  this.radius=radius;
  this.startAng=startAng;
  this.rotAng=rotAng;
  this.speed=speed;
 };

 CircularAnimation.prototype = Object.create(Animation.prototype);
 CircularAnimation.prototype.constructor = CircularAnimation;
