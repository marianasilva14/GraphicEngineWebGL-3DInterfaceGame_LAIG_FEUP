/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {
  this.part = null;
  var type = graph.reader.getItem(xmlelem, 'type', ['rectangle', 'cylinder', 'sphere', 'triangle']);
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
