var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;
    this.lightValues = {};

    this.texture = null;
    this.appearance = null;
    this.objects=0;
    this.wireframe=false;
    this.scaleFactor=50.0;
    this.selectObjectOrigin=0;
    this.selectObjectDestiny=0;
    this.anotherMove;
    this.pieceToRemove=0;
    this.modeGame=0;
    this.startGame=0;
    this.continueGame=0;
    this.undo=0;
    this.CampoBello;
    this.newCamera = false;
    this.marker;
    this.animcam;

}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;


/**
* Sets First Scenario - GamingRoom
*/
XMLscene.prototype.setScenarioGamingRoom = function() {
    this.scenario = new GamingRoom(this);
    this.scenarioNumber=1;
    for(var i=0; i<this.CampoBello.areas.length;i++){
      for(var j=1; j < this.CampoBello.areas[i].pieces.length;j++){
        this.CampoBello.areas[i].pieces[j].setAppearence();
      }
    }
}

/**
* Sets second Scenario - GamingHouse
*/
XMLscene.prototype.setScenarioGamingHouse = function() {
    this.scenario = new GamingHouse(this);
    this.scenarioNumber=2;
    for(var i=0; i<this.CampoBello.areas.length;i++){
      for(var j=1; j < this.CampoBello.areas[i].pieces.length;j++){
        this.CampoBello.areas[i].pieces[j].setAppearence();
      }
    }
}

/**
* Sets second Scenario - GamingKidsRoom
*/
XMLscene.prototype.setScenarioGamingKidsRoom = function() {
    this.scenario = new GamingKidsRoom(this);
    this.scenarioNumber=3;
    for(var i=0; i<this.CampoBello.areas.length;i++){
      for(var j=1; j < this.CampoBello.areas[i].pieces.length;j++){
        this.CampoBello.areas[i].pieces[j].setAppearence();
      }
    }
}

/**
* Starts a game
*/
XMLscene.prototype.setStartGame = function() {
  this.marker.initialTime=0;
  this.marker.deltaTime=0;

  if(this.CampoBello.gameMode == 0)
    this.CampoBello= new CampoBello(this,XMLscene.gameMode.PLAYER_VS_PLAYER);
  else
    this.CampoBello= new CampoBello(this,XMLscene.gameMode.PC_VS_PC);

};

/**
  * Game movie
*/
XMLscene.prototype.viewMovie = function() {
  this.CampoBello.viewMovie();
};


/**
* Undos a play
*/
XMLscene.prototype.undoMove = function() {
  let infoToReturn= this.CampoBello.infoPlay.length-1;
  let piecesUndo= this.CampoBello.infoPlay[infoToReturn];
  console.log('piecesUndo',piecesUndo);
  this.CampoBello.undoMove(piecesUndo);
  this.CampoBello.infoPlay.pop();

}

/**
  * Possible game mode
*/
XMLscene.gameMode = {
   PLAYER_VS_PLAYER: 0,
   PC_VS_PC:1,
   PC_VS_PLAYER:2
};

/**
* Set player vs player mode
*/
XMLscene.prototype.setPlayerVsPlayer = function() {
    this.CampoBello = new CampoBello(this, XMLscene.gameMode.PLAYER_VS_PLAYER);
}

/**
* Set Pc vs Pc
*/
XMLscene.prototype.setPcVsPc = function() {
    this.CampoBello = new CampoBello(this,  XMLscene.gameMode.PC_VS_PC);
}

/**
* Set Pc vs Player
*/
XMLscene.prototype.setPcVsPlayer = function() {
    this.CampoBello = new CampoBello(this,  XMLscene.gameMode.PC_VS_PLAYER);
}

/**
  * Set Camera default
*/
XMLscene.prototype.setCameraDefault = function() {
  this.newCamera = false;
}

/**
  * Set new camara
*/
XMLscene.prototype.setNewCamera = function() {
  this.newCamera = true;
}

/* Handler called when the graph is finally loaded.
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function()
{
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this,this.graph.referenceLength);

    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1],
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);

    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);

    this.initLights();

    this.setUpdatePeriod(1000/60);

    // Adds lights group.
    this.interface.addLightsGroup(this.graph.lights);
    this.interface.modeGame();
    this.interface.scenarios();
    this.interface.menuOptions();
    this.interface.chooseCamera();

  console.log("no campo bello", this.graph.nodes.timer);
  this.marker = new Marker(this);
}

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.enableTextures(true);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    this.setPickEnabled(true);

  	this.shader=
  		new CGFshader(this.gl, "shaders/flat.vert", "shaders/flat.frag");


  	// texture will have to be bound to unit 1 later, when using the shader, with "this.texture2.bind(1);"
  	this.shader.setUniformsValues({uSampler2: 1});
  	this.shader.setUniformsValues({uSampler2: 1});


  	this.updateScaleFactor(0);
    this.scenario = new GamingRoom(this);
    this.scenarioNumber=1;

    this.piece1AppearanceScenario1 = new CGFappearance(this);
	  this.piece1AppearanceScenario1.loadTexture("scenes/images/yellow.png");

    this.piece2AppearanceScenario1 = new CGFappearance(this);
	  this.piece2AppearanceScenario1.loadTexture("scenes/images/red.png");

    this.piece1AppearanceScenario2 = new CGFappearance(this);
	  this.piece1AppearanceScenario2.loadTexture("scenes/images/blue.png");

    this.piece2AppearanceScenario2 = new CGFappearance(this);
	  this.piece2AppearanceScenario2.loadTexture("scenes/images/greenBoard.png");

    this.piece1AppearanceScenario3 = new CGFappearance(this);
    this.piece1AppearanceScenario3.loadTexture("scenes/images/blue.png");

    this.piece2AppearanceScenario3 = new CGFappearance(this);
    this.piece2AppearanceScenario3.loadTexture("scenes/images/red.png");

    this.CampoBello= new CampoBello(this,XMLscene.gameMode.PLAYER_VS_PLAYER);



    this.initCameras();
}

XMLscene.prototype.updateScaleFactor=function(current_time)
{
	this.shader.setUniformsValues({normScale: 0.5+0.5*Math.sin(current_time/1000)});
}
/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.

    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];

            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);

            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();

            this.lights[i].update();

            i++;
        }
    }

}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {
  this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(15, 15, 15),vec3.fromValues(0, 0, 0));
  this.baseanimcam = new CGFcamera(0.4,0.1,500,vec3.fromValues(15, 15, 15),vec3.fromValues(0, 0, 0));
    //this.cam=new Camera(this.camera, 10, vec3.fromValues(5, 10, 14));
      this.animcam=new Camera(this.baseanimcam, 8, vec3.fromValues(5, 10, 14));

//   this.cam=new Camera(this.camera, 10, vec3.fromValues(12, 11.5, 7));

}


/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {
    this.logPicking();
    this.clearPickRegistration();
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    //this.multMatrix(this.animcam.camera.getViewMatrix());
    if (!this.newCamera) {
      this.multMatrix(this.camera.getViewMatrix());
    }
    else{
      this.multMatrix(this.animcam.camera.getViewMatrix());
    }

    this.pushMatrix();

    if (this.graph.loadedOk)
    {
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

		// Draw axis
		this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        // Displays the scene.
        this.graph.displayScene();


    }
	else
	{
		// Draw axis
		this.axis.display();
	}

  this.CampoBello.display();
  this.scenario.display();


}

/**
* Function that will update the animations over time and also refresh the scale of the selectable object
* @param current_time time of the system
*/
XMLscene.prototype.update = function(current_time){

for(node in this.graph.nodes){
  if(this.graph.nodes[node].animations.length!=0){
    this.graph.nodes[node].updateAnimation(current_time);
  }
}

for(var j=0; j < this.CampoBello.areas.length;j++){
  for(var i=1;i < this.CampoBello.areas[j].pieces.length;i++){
    this.CampoBello.areas[j].pieces[i].updateAnimation(current_time);
  }
}

this.updateScaleFactor(current_time);
this.animcam.update(current_time);
this.marker.update(current_time);

if(this.marker.resFinalDozens>2){
  this.marker.initialTime=0;
  this.marker.deltaTime=0;
  this.CampoBello.switchPlayer();
}

}

/**
  * Log picking function
*/
XMLscene.prototype.logPicking = function ()
{
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];
					console.log("Picked object: " + obj + ", with pick id " + customId);
          switch (this.CampoBello.currentState) {
            case this.CampoBello.state.CHOOSE_ORIGIN:
            if(this.CampoBello.currentPlayer==PLAYER1_ID){
              if(this.CampoBello.piecesPlayer1.indexOf(customId)!=-1 || this.CampoBello.noPieces.indexOf(customId)!=-1){
                this.selectObjectOrigin=customId;
                this.CampoBello.currentState=this.CampoBello.state.CHOOSE_DESTINY;
              }
            }
            else{
              if(this.CampoBello.piecesPlayer2.indexOf(customId)!=-1 || this.CampoBello.noPieces.indexOf(customId)!=-1){
                this.selectObjectOrigin=customId;
                this.CampoBello.currentState=this.CampoBello.state.CHOOSE_DESTINY;
              }
            }
              break;
            case this.CampoBello.state.CHOOSE_DESTINY:
            this.selectObjectDestiny=customId;
            this.CampoBello.chooseDestiny();
            break;
            case this.CampoBello.state.REMOVE_PIECE:
            this.pieceToRemove=customId;
            this.CampoBello.choosePieceToRemove();
            break;
            case this.CampoBello.state.ANOTHER_MOVE:
            console.log('cheguei aqui');
            this.anotherMove=customId;
            var pieceDestiny=this.CampoBello.pieceChosen(this.anotherMove);
            this.CampoBello.validateMove(this.CampoBello.actualOrigin,pieceDestiny);

            break;
            default:

          }

				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}
	}
}
