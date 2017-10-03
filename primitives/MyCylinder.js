/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	var slices = this.slices;
 	var stacks = this.stacks;
	
	this.vertices = [];
	this.normals = [];
	this.indices = [];
	this.texCoords = [];

	var t = 0;
	var s = 0;
	
	var ang = 2*Math.PI/slices;
	
	for(var stack = 0; stack < stacks+1; stack++)
	{
		for(var slice = 0; slice < slices; slice++)
		{
			this.vertices.push(Math.cos(slice*ang), Math.sin(slice*ang), stack/stacks);
			this.normals.push(Math.cos(slice*ang), Math.sin(slice*ang), 0);
		}
	}

	for(var stack = 0; stack < stacks; stack++)
	{
		for(var slice = 0; slice < slices; slice++)
		{	
			if (slice != slices-1) 
			{
				this.indices.push(slices*(stack+1)+slice+1, slices*(stack+1)+slice, slices*stack+slice+1);
				this.indices.push(slices*stack+slice, slices*stack+slice+1, slices*(stack+1)+slice);
				
				this.indices.push(slices*stack+slice+1, slices*(stack+1)+slice, slices*(stack+1)+slice+1);
				this.indices.push(slices*(stack+1)+slice, slices*stack+slice+1, slices*stack+slice);
			}
			else 
			{
				this.indices.push(slices*stack, slices*stack+slice+1, slices*stack+slice);
				this.indices.push(slices*stack+slice, slices*stack+slice+1, slices*(stack+1)+slice);

				this.indices.push(slices*stack+slice, slices*stack+slice+1, slices*stack);
				this.indices.push(slices*(stack+1)+slice, slices*stack+slice+1, slices*stack+slice);

			}
		}
	}

	//apply texture to cylinder

	for(var i = 0; i <= stacks; i++){
		for(var j =  0; j < slices; j++){
			this.texCoords.push(s,t);
			s = s + 1/slices;
		}
		s = 0;
		t = t + 1/stacks;
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
