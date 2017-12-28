
/**
 * Constructor of a Timer object. Used to display decrescing time.
 *
 * @constructor Timer
 *
 */

function Timer(scene) {
	this.scene = scene;

	this.initialTime = 0;
  this.deltaTime = 0;
	this.resFinalDozens;
};

Timer.prototype = Object.create(CGFobject.prototype);
Timer.prototype.constructor = Timer;

/**
* Gets the time to be displayed on the screen
* @param secs Seconds passed to be processed in hours/minuts/seconds format
*/

Timer.prototype.getTime = function(nameTextureUnits, nameTextureDozens){

this.scene.graph.nodes.timerUnits.textureID = nameTextureUnits;
this.scene.graph.nodes.timerDozens.textureID = nameTextureDozens;


}

Timer.prototype.update = function(current_time){

	var current_time2 = current_time/1000;

	if(this.initialTime == 0)
		this.initialTime = current_time2;
	else
		this.deltaTime=current_time2-this.initialTime;

		var res = Math.floor(this.deltaTime);
		var res2 = (res/10);
		var res3 = Math.floor(res2);
		var res4 = (res2%1);

		if(res < 10){
			this.resFinalUnits = res;
			this.resFinalDozens = 0;
		}

		else{
			this.resFinalDozens = res3;
			this.resFinalUnits = Math.floor(Math.round(res4*10));
		}

		this.scene.graph.nodes.pointsPlayerX.textureID = this.scene.CampoBello.numberOfPiecesPlayer1.toString();
		this.scene.graph.nodes.pointsPlayerY.textureID = this.scene.CampoBello.numberOfPiecesPlayer2.toString();
		this.getTime(this.resFinalUnits.toString(), this.resFinalDozens.toString());

}
