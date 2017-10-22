
function MyCylinder(scene, height, bottom_radius, top_radius, stacks, slices, top_cap, bottom_cap) {
	CGFobject.call(this,scene);

	this.height = height;
	this.bottom_radius = parseFloat(bottom_radius);
	this.top_radius = parseFloat(top_radius);
	this.stacks = stacks;
	this.slices = slices;
	this.top_cap = parseInt(top_cap);
	this.bottom_cap = parseInt(bottom_cap);


	if(top_cap == 1){
		this.top_circle = new MyCircle(scene, this.slices, this.stacks, this.top_radius);
	}
	if(bottom_cap == 1){
		this.bottom_circle = new MyCircle(scene, this.slices, this.stacks, this.bottom_radius);
	}

	this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor=MyCylinder;

MyCylinder.prototype.initBuffers = function () {

	var delta_angle = 2*Math.PI / this.slices;
	this.indices = [];
 	this.vertices = [];
 	this.normals = [];
	this.texCoords = [];
	var init_radius = this.bottom_radius;
	var delta_radius = (this.top_radius - this.bottom_radius)/this.stacks;
	var ang = 2*Math.PI/this.slices;

	for(var i = 0; i <= this.stacks; i++) {
		for(var j = 0; j <= this.slices; j++) {
			this.vertices.push((init_radius + i*delta_radius)*Math.cos(j*delta_angle),
			(init_radius + i*delta_radius)*Math.sin(j*delta_angle),
			this.height*i/this.stacks);

			if(this.height > 0) {
				var temp = Math.atan(Math.abs(this.top_radius-this.bottom_radius)/this.height);
				this.normals.push(Math.cos(temp)*Math.cos(j*delta_angle), Math.cos(temp)*Math.sin(j*delta_angle),Math.sin(temp));
			} else
				this.normals.push(0, 0, 1);

			this.texCoords.push(j/this.slices, i/this.stacks);

			if(i > 0 && j > 0) {
				var verts = this.vertices.length / 3;
				this.indices.push(verts-1, verts-2, verts-this.slices-2);
				this.indices.push(verts-2, verts-this.slices-3, verts-this.slices-2);
			}
		}
	}

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyCylinder.prototype.setTexCoords = function(ampli_factor_s, ampli_factor_t) {};

MyCylinder.prototype.display = function () {

	if(this.top_cap == 1){
		this.scene.pushMatrix();
		this.scene.translate(0, 0, parseFloat(this.height));
		this.top_circle.display();
		this.scene.popMatrix();
	}

	CGFobject.prototype.display.call(this);

	if(this.bottom_cap == 1){
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,0,1,0);
		this.bottom_circle.display();
		this.scene.popMatrix();
	}

}
