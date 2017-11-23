/**
 * ComboAnimation
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

 ComboAnimation.prototype.update=function(current_time){
   mat4.identity(this.matrix);

   var currentAnimation=this.scene.graph.animations[this.animations[this.currentAnimationID]];

   if((current_time - this.ellapsedTimeLastAnimations) > currentAnimation.totalTime){
     this.currentAnimationID++;
     this.ellapsedTimeLastAnimations += currentAnimation.totalTime;
   }
    else{
      currentAnimation.update(current_time);
      this.matrix=currentAnimation.matrix;
    }

 };
