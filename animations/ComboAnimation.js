/**
 * ComboAnimation
 * @constructor
 */
 function ComboAnimation(scene, id, animations) {
   this.scene = scene;
   this.animations = [];
 };

 ComboAnimation.prototype = Object.create(Animation.prototype);
 ComboAnimation.prototype.constructor = Object;
