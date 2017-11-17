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

   for(var i=0; i < animations.length;i++){
     this.totalTime+=this.scene.graph.animations[animations[i]].totalTime;
     this.time[i] = this.scene.graph.animations[animations[i]].totalTime;
   }

 };

 ComboAnimation.prototype = Object.create(Animation.prototype);
 ComboAnimation.prototype.constructor = Object;

 ComboAnimation.prototype.update=function(current_time){
//   mat4.identity(this.matrix);

   for(var i=0; i < this.animations.length;i++){
     this.scene.graph.animations[this.animations[i]].update(current_time/this.time[i]);
     this.matrix=this.scene.graph.animations[this.animations[i]].matrix;
     console.log('aquiiii');
   }
 };
