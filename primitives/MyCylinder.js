/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, height, bottom_radius, top_radius, stacks, slices) {
 	CGFobject.call(this,scene);

  this.height = height;
  this.bottom_radius = bottom_radius;
  this.top_radius = top_radius;
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();

 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
   this.vertices = [];
   this.normals = [];
   this.indices = [];

  var delta_height = this.height/this.stacks;
  var delta_radius = (this.top_radius - this.bottom_radius)/this.stacks;
  var ang = 2*Math.PI/slices;
  var m = this.height / (this.bottom_radius - this.top_radius);
  var max_height;
  var r = this.bottom_radius;

  var slices = this.slices;
 	var stacks = this.stacks;

  if(this.bottom_radius > this.top_radius)
    max_height = this.top_radius*m+this.height;
  else
    max_height = this.bottom_radius*m+this.height;

	for(var stack = 0; stack < stacks; stack++)
	{
		for(var slice = 0; slice < slices; slice++)
		{
			this.vertices.push(r * Math.cos(slice*ang),
      r * Math.sin(slice*ang), stack * delta_height);

      if(Math.abs(this.bottom_radius - this.top_radius) < 0.0001){
        this.normals.push(Math.cos(slice*ang), Math.sin(slice*ang), 0);
      }
      else if(this.bottom_radius > this.top_radius){
        this.normals.push(max_height * Math.cos(slice*ang)/Math.sqrt(Math.pow(this.bottom_radius, 2) + Math.pow(max_height, 2)),
        max_height * Math.sin(slice*ang)/Math.sqrt(Math.pow(this.bottom_radius, 2) + Math.pow(max_height, 2)),
        this.bottom_radius/Math.sqrt(Math.pow(this.bottom_radius, 2) + Math.pow(max_height, 2)));
      }
      else{
        this.normals.push(max_height * Math.cos(slice*ang)/Math.sqrt(Math.pow(this.top_radius, 2) + Math.pow(max_height, 2)),
        max_height * Math.sin(slice*ang)/Math.sqrt(Math.pow(this.top_radius, 2) + Math.pow(max_height, 2)),
        this.top_radius/Math.sqrt(Math.pow(this.top_radius, 2) + Math.pow(max_height, 2)));
      }
		}
    r = stack * delta_radius + this.bottom_radius;
	}

	for(var stack = 0; stack < stacks; stack++)
	{
		for(var slice = 0; slice < slices; slice++)
		{
      this.indices.push(stack*(slices+1)+slice,stack*(slices+1)+(slice+1),
        (stack+1)*(slices+1)+(slice+1));
      this.indices.push((stack+1)*(slices+1)+(slice+1),(stack+1)*(slices+1)+slice,
        stack*(slices+1)+slice);
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
