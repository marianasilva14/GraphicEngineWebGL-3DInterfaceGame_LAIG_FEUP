
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

		var numPiecesPlayer1 = this.scene.CampoBello.numberOfPiecesPlayer1;
		var numPiecesPlayer2 = this.scene.CampoBello.numberOfPiecesPlayer2;
		var dozensPlayer1 = Math.floor((numPiecesPlayer1 % 1)*10);
		var dozensPlayer2 = Math.floor((numPiecesPlayer2 % 1)*10);
		var unitsPlayer1 = Math.floor(numPiecesPlayer1 / 10);
		var unitsPlayer2 = Math.floor(numPiecesPlayer2 / 10);


		if(this.scene.CampoBello.numberOfPiecesPlayer1 < 10){
			this.scene.graph.nodes.pointsPlayerXUnits.textureID = "0";
			this.scene.graph.nodes.pointsPlayerXDozens.textureID = numPiecesPlayer1.toString();
		}

		else{
			this.scene.graph.nodes.pointsPlayerXUnits.textureID = unitsPlayer1.toString();
			this.scene.graph.nodes.pointsPlayerXDozens.textureID = dozensPlayer1.toString();
		}

		if(this.scene.CampoBello.numberOfPiecesPlayer2 < 10){
			this.scene.graph.nodes.pointsPlayerYUnits.textureID = "0";
			this.scene.graph.nodes.pointsPlayerYDozens.textureID = numPiecesPlayer2.toString();
		}

		else{
			this.scene.graph.nodes.pointsPlayerYUnits.textureID = unitsPlayer2.toString();
			this.scene.graph.nodes.pointsPlayerYDozens.textureID = dozensPlayer2.toString();
		}


		if(this.scene.CampoBello.winner.length!=0){
			if(this.scene.CampoBello.winner[0]==1){
				this.scene.graph.nodes.winner.textureID = "winnerPlayer1";
			}
			else{
			this.scene.graph.nodes.winner.textureID = "winnerPlayer2";
		}
		}
		else{
			this.scene.graph.nodes.winner.textureID = "paper";
		}




		this.getTime(this.resFinalUnits.toString(), this.resFinalDozens.toString());

}
