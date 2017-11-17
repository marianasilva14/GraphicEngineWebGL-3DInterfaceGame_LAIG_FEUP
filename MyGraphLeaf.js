/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {
  this.part = null;
  var type = graph.reader.getItem(xmlelem, 'type', ['rectangle', 'cylinder', 'sphere', 'triangle','patch']);
  var args = graph.reader.getString(xmlelem, 'args');


  args = args.split(" ");

  if(type == 'rectangle'){
    this.part = new MyRectangle(graph.scene, args[0], args[1], args[2], args[3]);
    return;
  }
  if(type == 'cylinder'){
    this.part = new MyCylinder(graph.scene,args[0],args[1],args[2],args[3],args[4], args[5], args[6]);
    return;
  }
  if(type == 'triangle'){
    this.part = new MyTriangle(graph.scene, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
    return;
  }
  if(type == 'sphere'){
    this.part = new MySphere(graph.scene, args[0], args[1], args[2]);
    return;
    }
  if(type=='patch'){
    var lengthU=0;
    var lengthV=0;
    var controlPoints=[];
    var cplines= xmlelem.children;
    lengthU= cplines.length;
    for(var i=0; i < cplines.length;i++){
      var cpline= cplines[i];
      var points=cpline.children;
      lengthV=points.length;
      var U=[];
      for(var j=0;j < points.length;j++){
        cpoints=points[j];
        var newVector=[];
        var xx=parseFloat(graph.reader.getString(cpoints, 'xx'));
        var yy=parseFloat(graph.reader.getString(cpoints, 'yy'));
        var zz=parseFloat(graph.reader.getString(cpoints, 'zz'));
        var ww=parseFloat(graph.reader.getString(cpoints, 'ww'));
        newVector.push(xx,yy,zz,ww);
        U.push(newVector);
      }
      controlPoints.push(U);
    }
    this.part= new MyPatch(graph.scene,parseFloat(args[0]),parseFloat(args[1]),lengthU-1,lengthV-1,controlPoints);
    return;
  }
  else{
    this.part = new MyRectangle(graph.scene,0,0,0,0);
  }
}

MyGraphLeaf.prototype.display = function () {
  this.part.display();
};

MyGraphLeaf.prototype.setTexCoords = function (ampli_factor_s,ampli_factor_t) {
  this.part.setTexCoords(ampli_factor_s,ampli_factor_t);
};
