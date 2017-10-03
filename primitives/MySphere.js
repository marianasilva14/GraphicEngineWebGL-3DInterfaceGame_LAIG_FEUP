/**
 * MyCylinder
 * @constructor
 */
 function MySphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MySphere.prototype = Object.create(CGFobject.prototype);
 MySphere.prototype.constructor = MyLamp;

 MySphere.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	var slices = this.slices;
 	var stacks = this.stacks;

	var t = 0;
	var s = 0;

	this.vertices = [];
	this.normals = [];
	this.indices = [];
	this.texCoords = [];

	var ang_height = Math.PI/2/stacks;
	var ang = 2*Math.PI / slices;

	for(var stack = 0; stack < stacks+1; stack++){

		for(var slice = 0; slice < slices; slice++)
		{
			this.vertices.push(Math.cos(slice*ang)*Math.cos(stack*ang_height),Math.sin(slice*ang)*Math.cos(stack*ang_height), Math.sin(stack*ang_height));
			this.normals.push(Math.cos(slice*ang)*Math.cos(stack*ang_height),Math.sin(slice*ang)*Math.cos(stack*ang_height), Math.sin(stack*ang_height));
		}
	}

	for(var stack = 0; stack < stacks; stack++){
		for(var slice = 0; slice < slices; slice++)
		{
			if (slice != (slices - 1))
			{
				this.indices.push(this.slices*stack+slice,this.slices*stack+slice+1,this.slices*(stack+1)+slice);
				this.indices.push(this.slices*(stack+1)+slice+1,this.slices*(stack+1)+slice,this.slices*stack+slice+1);
			}
			else
			{
				this.indices.push(this.slices*stack+slice,this.slices*stack+slice+1,this.slices*(stack+1)+slice);
				this.indices.push(this.slices*stack,this.slices*stack+slice+1,this.slices*stack+slice);
			}

		}

	}

	//apply texture to lamp

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
