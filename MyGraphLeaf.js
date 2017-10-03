/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {
  this.part = null;
  var type = graph.reader.getItem(xmlelem, 'type', ['rectangle', 'cylinder', 'sphere', 'triangle']);
  var args = graph.reader.getString(xmlelem, 'args');

  if(type == 'rectangle'){
    this.part = new MyRectangle(graph.scene, args[0], args[1], args[2], args[3]);
    return;
  }
  if(type == 'cylinder'){
    return;
  }
  if(type == 'triangle'){
    return;
  }
  if(type == 'sphere'){
  }
  else{
  }
}

MyGraphLeaf.prototype.display = function () {
  this.part.display();
};
