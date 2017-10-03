/**
 * MyTriangle
 * @constructor
 */
 function MyTriangle(scene, coord1_x, coord1_y, coord1_z, coord2_x, coord2_y, coord2_z, coord3_x, coord3_y, coord3_z) {
 	CGFobject.call(this,scene);

  this.coord1_x = coord1_x;
  this.coord1_y = coord1_y;
  this.coord1_z = coord1_z;

  this.coord2_x = coord2_y;
  this.coord2_y = coord2_y;
  this.coord2_z = coord2_z;

  this.coord3_x = coord3_y;
  this.coord3_y = coord3_y;
  this.coord3_z = coord3_z;

 	this.initBuffers();
 };

 MyTriangle.prototype = Object.create(CGFobject.prototype);
 MyTriangle.prototype.constructor = MyRectangle;

 MyTriangle.prototype.initBuffers = function() {

  this.vertices = [
    this.coord1_x, this.coord1_y, this.coord1_z,
    this.coord2_x, this.coord2_y, this.coord2_z,
    this.coord3_x, this.coord3_y, this.coord3_z
 	];

 	this.indices = [
 	    0, 1, 2
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;

 	this.normals = [
 	0, 0, 1,
 	0, 0, 1,
 	0, 0, 1
 	];

 	this.initGLBuffers();
 };
