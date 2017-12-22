 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {

    var group = this.gui.addFolder("Lights");
    group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }
    group.close();
}

/**
 * Adds a drop dropDown containing the IDs of the selectable objects
 */
MyInterface.prototype.dropDown = function(){

this.gui.add(this.scene, 'objectsSelectableID', this.scene.objectsSelectableNames).name('Selectable Nodes');

}

MyInterface.prototype.levelDifficulty = function(){

this.gui.add(this.scene, 'level', {
  'High Level':0,
  'Low Level':1
}).name('Choose level');

}

MyInterface.prototype.modeGame = function(){

this.gui.add(this.scene, 'modeGame', {
  'PC vs PC':0,
  'Human vs Human':1,
  'Human vs PC':2,
}).name('Choose game mode');

}

MyInterface.prototype.options = function() {

    var group = this.gui.addFolder("Options");
    group.open();

    let menu = {
      startGame: this.scene.startGame.bind(this.scene)
    };

    let continueGame = {
      continueGame: this.scene.continueGame.bind(this.scene)
    };

    let undo = {
        undo: this.scene.undo.bind(this.scene)
    };

    group.add(menu, 'startGame').name('Start Game');
    group.add(continueGame, 'continueGame').name('Continue Game');
    group.add(undo, 'undo').name('Undo');
    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;


    group.close();
}
