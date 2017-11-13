/**
 * Animation
 * @constructor
 */
 function Animation(id, scene) {
   this.scene = scene;
 	this.id=id;
 };

 Animation.prototype = Object.create(CGFobject.prototype);
 Animation.prototype.constructor = Animation;
