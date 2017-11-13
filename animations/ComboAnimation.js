/**
 * ComboAnimation
 * @constructor
 */
 function ComboAnimation(scene, center, radius, startAng, rotAng, speed) {
   this.scene = scene;
  this.center=center;
  this.radius=radius;
  this.startAng=startAng;
  this.rotAng=rotAng;
  this.speed=speed;
 };

 ComboAnimation.prototype = Object.create(Animation.prototype);
 ComboAnimation.prototype.constructor = ComboAnimation;
