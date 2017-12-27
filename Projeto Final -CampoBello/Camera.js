function Camera(camera, speed, finalPoint){
  this.camera =  camera;
  this.speed = speed;
  this.finalPoint = finalPoint;
  this.startPoint = [this.camera.position[0],this.camera.position[1],this.camera.position[2]];

  this.distance = [];
  this.initialTime = 0;
  this.totalTime = 0;
  this.deltaTime = 0;
  this.animationCameraFinished = false;

  this.distance[0] = this.finalPoint[0]-this.startPoint[0];
  this.distance[1] = this.finalPoint[1]-this.startPoint[1];
  this.distance[2] = this.finalPoint[2]-this.startPoint[2];

  this.lengthDistance = Math.sqrt((Math.pow(this.distance[0], 2)) + (Math.pow(this.distance[1], 2)) +
  (Math.pow(this.distance[2], 2)));

  this.totalTime = this.lengthDistance/this.speed;
  console.log('totalTime', this.totalTime);
  console.log('lengthDistance', this.lengthDistance);
  console.log('this.startPoint', this.startPoint);
  console.log('this.distance', this.distance);
}

Camera.prototype = Object.create(Camera.prototype);
Camera.prototype.constructor = Object;


Camera.prototype.moveToFinalPoint = function (finalPoint) {
  this.camera.setPosition(finalPoint);
};

Camera.prototype.update = function (current_time) {

  if (!this.animationCameraFinished) {

    var current_time2 = current_time/1000;

    if(this.initialTime == 0)
      this.initialTime = current_time2;
    else
      this.deltaTime=current_time2-this.initialTime;

    console.log('current_time2', current_time2);
    console.log('this.totalTime', this.totalTime);
    console.log('deltaTime', this.deltaTime);
    console.log('time distance', this.distance);
    this.distanceAux = [((this.deltaTime * this.distance[0]) / this.totalTime),
                    ((this.deltaTime * this.distance[1]) / this.totalTime),
                    ((this.deltaTime * this.distance[2]) / this.totalTime)];

    console.log('this.distanceAux',this.distanceAux);


    this.lengthStartPoint = Math.sqrt((Math.pow(this.startPoint[0], 2)) + (Math.pow(this.startPoint[1], 2)) +
    (Math.pow(this.startPoint[2], 2)));

    this.distanceAuxFinal = [(this.startPoint[0] + this.distanceAux[0]), (this.startPoint[1] + this.distanceAux[1]),
                            (this.startPoint[2] + this.distanceAux[2])];
    console.log('this.distanceAuxFinal', this.distanceAuxFinal);

    this.moveToFinalPoint(this.distanceAuxFinal);

    if(this.deltaTime >= this.totalTime){
      this.animationCameraFinished = true;
      console.log("ENTROU NO IF!!!")
    }

  }

};
