/**
 * MyRectangle
 * @constructor
 */
 function MyRectangle(scene, left_top_x, left_top_y, right_bottom_x, right_bottom_y) {
 	CGFobject.call(this,scene);

  this.left_top_x = left_top_x;
  this.left_top_y = left_top_y;
  this.right_bottom_x = right_bottom_x;
  this.right_bottom_y = right_bottom_y;

 	this.initBuffers();
 };

 MyRectangle.prototype = Object.create(CGFobject.prototype);
 MyRectangle.prototype.constructor = MyRectangle;

 MyRectangle.prototype.initBuffers = function() {

  this.vertices = [
    this.left_top_x, this.left_top_y, 0,
    this.right_bottom_x, this.left_top_y, 0,
    this.right_bottom_x, this.right_bottom_y, 0,
    this.left_top_x, this.right_bottom_y, 0
 	];

 	this.indices = [
 	    2, 1, 0,
      0, 3, 2
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;

 	this.normals = [
 	0, 0, 1,
 	0, 0, 1,
 	0, 0, 1,
 	0, 0, 1
 	];

 	this.initGLBuffers();
 };
