
MyPatch.prototype = Object.create(CGFscene.prototype);
MyPatch.prototype.constructor = MyPatch;

function MyPatch(scene,divisionsU,divisionsV,degreesU,degreesV,controlPoints) {
    CGFscene.call(this);
    this.texture = null;
   	this.appearance = null;
   	this.surface = null;
   	this.translations = [];
    this.divisionsU=divisionsU;
    this.divisionsV=divisionsV;
    this.degreesU=degreesU;
    this.degreesV=degreesV;
    this.controlPoints=controlPoints;
}

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


MyPatch.prototype.makeSurface = function (id, degree1, degree2, controlvertexes, translation) {

	var knots1 = this.getKnotsVector(degree1); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(degree2); // to be built inside webCGF in later versions

	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

	var obj = new CGFnurbsObject(this, getSurfacePoint, 20, 20 );
	this.surface = obj;
}

MyPatch.prototype.display = function () {

  if(this.surface != null){
    this.surface.display();
  }

}
