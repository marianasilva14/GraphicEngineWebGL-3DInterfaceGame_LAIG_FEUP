function Camera(camera){
  this.camera =  camera;
}

Camera.prototype.moveToFinalPoint = function (finalPoint) {
  this.camera.setPosition(finalPoint);
};

Camera.prototype.update = function (delta_time) {

};
