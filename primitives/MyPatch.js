
function MyPatch(scene,divisionsU,divisionsV,degreesU,degreesV,controlPoints) {
    CGFobject.call(this,scene);
    this.scene = scene;
    this.texture = null;
   	this.appearance = null;
   	this.surface = null;
   	this.translations = [];
    this.divisionsU=divisionsU;
    this.divisionsV=divisionsV;
    this.degreesU=degreesU;
    this.degreesV=degreesV;
    this.controlPoints=controlPoints;

    console.log("AQUI");
    console.log(controlPoints);
    console.log(degreesU);
    console.log(degreesV);
    console.log(divisionsU);
    console.log(divisionsV);

    this.makeSurface();
}

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface

	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;
}


MyPatch.prototype.makeSurface = function () {

	var knots1 = this.getKnotsVector(this.degreesU); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(this.degreesV); // to be built inside webCGF in later versions

  console.log(this.controlPoints);
	var nurbsSurface = new CGFnurbsSurface(this.degreesU, this.degreesV, knots1, knots2, this.controlPoints); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {

		return nurbsSurface.getPoint(u, v);
	};
  console.log(nurbsSurface);
	this.surface = new CGFnurbsObject(this.scene, getSurfacePoint,this.divisionsU, this.divisionsV);
  console.log(this.surface);
}

MyPatch.prototype.display = function () {

  if(this.surface != null){
    this.surface.display();
  }

}
