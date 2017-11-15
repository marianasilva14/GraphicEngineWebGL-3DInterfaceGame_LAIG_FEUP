/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/

function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;

    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    this.animations = [];
    this.animationIndex = 0;
    this.animationFinished = false;
    this.initial_time = 0;
    this.delta_time = 0;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}

MyGraphNode.prototype.updateAnimation = function(current_time){
    var currentAnimation = this.animations[this.animationIndex];
    console.log('currentAnimation' + currentAnimation);

    if(this.initial_time == null)
      this.initial_time = current_time;

    this.delta_time=current_time-this.initial_time;

    if(this.delta_time >= currentAnimation.time)
      this.animationFinished = true;
  /*  else {
      this.graph.animations[this.animations[this.animationIndex]].update(current_time);
    }*/


}

MyGraphNode.prototype.getMatrix = function(){

    var animation = this.graph.animations[this.animations[this.animationIndex]];
    //console.log('animation');
    //console.log(animation);

    if(animation != null){
      console.log('animation.matrix');
      console.log(animation.matrix);
      return animation.matrix;
    }

    return mat4.create();

}
