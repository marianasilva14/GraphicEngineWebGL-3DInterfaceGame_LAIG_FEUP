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

    // this.teste = mat4.create();
    // mat4.identity(this.teste);
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
    var currentAnimation = this.graph.animations[this.animations[this.animationIndex]];

    var current_time2 = current_time/1000;

    if(this.initial_time == 0)
      this.initial_time = current_time2;
    else
      this.delta_time=current_time2-this.initial_time;

    if(this.delta_time >= currentAnimation.totalTime)
      this.animationFinished = true;
    else {
      currentAnimation.update(this.delta_time);
    }

}

MyGraphNode.prototype.getMatrix = function(){

    var animation = this.graph.animations[this.animations[this.animationIndex]];

    if(animation != null || this.animationFinished){
      animation.update(this.delta_time);
      return animation.matrix;
    }

    return mat4.create();

}
