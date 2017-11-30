/**
 * ComboAnimation
 * @param id id of animation
 * @param animations array of animations
 * @constructor
 */
 function ComboAnimation(scene, id, animations) {
   this.scene = scene;
   this.animations = animations;
   this.totalTime = 0;
   this.time=[];
   this.matrix=mat4.create();
   this.currentAnimationID = 0;
   this.ellapsedTimeLastAnimations = 0;

   for(var i=0; i < animations.length;i++){
     this.totalTime+=this.scene.graph.animations[animations[i]].totalTime;
   }
 };

 ComboAnimation.prototype = Object.create(Animation.prototype);
 ComboAnimation.prototype.constructor = Object;

 /**
 * Function that updates the animation
 * @param delta_time delta time
 **/
 ComboAnimation.prototype.update=function(delta_time){
   mat4.identity(this.matrix);

   var currentAnimation=this.scene.graph.animations[this.animations[this.currentAnimationID]];

   if((delta_time - this.ellapsedTimeLastAnimations) > currentAnimation.totalTime){
     this.currentAnimationID++;
     this.ellapsedTimeLastAnimations += currentAnimation.totalTime;
   }
    else{
      currentAnimation.update(delta_time);
      this.matrix=currentAnimation.matrix;
    }

 };
