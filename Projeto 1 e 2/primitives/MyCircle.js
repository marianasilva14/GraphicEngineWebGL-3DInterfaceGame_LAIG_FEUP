/**
 * MyCircle
 * @constructor
 */
 function MyCircle(scene, slices, stacks, radius) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
  this.radius=radius;

 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function() {

 	var slices = this.slices;
 	var stacks = this.stacks;

	this.vertices = [];
	this.normals = [];
	this.indices = [];
	this.texCoords = [];

	var t = 0;
	var s = 0;

	var ang = 2*Math.PI/slices;

	this.vertices.push(0,0,0);
	this.normals.push(0,0, stacks);
	this.texCoords.push(0.5,0.5);

    for(var slice = 0; slice < slices; slice++){
    	this.vertices.push(Math.cos(ang*slice)*this.radius);
      this.vertices.push(Math.sin(ang*slice)*this.radius);
      this.vertices.push(0);

      this.normals.push(0);
      this.normals.push(0);
      this.normals.push(1);

      this.texCoords.push(0.5+Math.cos(slice*ang)/2);
      this.texCoords.push(0.5-Math.sin(slice*ang)/2);
    }

    for (var slice = 0; slice < slices; slice++) {

		if (slice + 1 == slices) {
			this.indices.push(0,slice + 1, 1);
		}
		else {
			this.indices.push(0, slice + 1,slice + 2);
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
