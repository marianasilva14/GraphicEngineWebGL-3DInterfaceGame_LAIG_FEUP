/**
 * MyTriangle
 * @constructor
 */
 function MyTriangle(scene, coord1_x, coord1_y, coord1_z, coord2_x, coord2_y, coord2_z, coord3_x, coord3_y, coord3_z) {
 	CGFobject.call(this,scene);

  this.coord1_x = coord1_x;
  this.coord1_y = coord1_y;
  this.coord1_z = coord1_z;

  this.coord2_x = coord2_x;
  this.coord2_y = coord2_y;
  this.coord2_z = coord2_z;

  this.coord3_x = coord3_x;
  this.coord3_y = coord3_y;
  this.coord3_z = coord3_z;

  this.minS = 0;
	this.minT = 0;
	this.maxS = 1;
	this.maxT = 1;

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

  var nx = (this.coord2_y-this.coord1_y)*(this.coord3_z-this.coord1_z) - (this.coord2_z-this.coord1_z)*(this.coord3_y-this.coord1_y);
 	var ny = (this.coord2_z-this.coord1_z)*(this.coord3_x-this.coord1_x) - (this.coord2_x-this.coord1_x)*(this.coord3_z-this.coord1_z);
 	var nz = (this.coord2_x-this.coord1_x)*(this.coord3_y-this.coord1_y) - (this.coord2_y-this.coord1_y)*(this.coord3_x-this.coord1_x);

     this.normals = [
     nx, ny, nz,
     nx, ny, nz,
     nx, ny, nz ];

     var ab = Math.sqrt(Math.pow(this.coord2_x-this.coord1_x, 2) + Math.pow(this.coord2_y-this.coord1_y, 2) + Math.pow(this.coord2_z-this.coord1_z, 2));
     var bc = Math.sqrt(Math.pow(this.coord2_x-this.coord3_x, 2) + Math.pow(this.coord2_y-this.coord3_y, 2) + Math.pow(this.coord2_z-this.coord3_z, 2));
     var ac = Math.sqrt(Math.pow(this.coord1_x-this.coord3_x, 2) + Math.pow(this.coord1_y-this.coord3_y, 2) + Math.pow(this.coord1_z-this.coord3_z, 2));
     var beta = Math.acos((Math.pow(bc, 2) + Math.pow(ab, 2) - Math.pow(ac, 2))/(2*ab*bc));

     this.texCoords = [
 		this.minS, this.minT,
 		this.maxS, this.minT,
 		(ab - bc*Math.cos(beta))/ab, bc*Math.sin(beta)/ab
     ];

 	this.primitiveType=this.scene.gl.TRIANGLES;

 	this.initGLBuffers();
 };
