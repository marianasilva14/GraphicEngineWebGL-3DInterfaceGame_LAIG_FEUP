
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
	this.resFinal;
};

Timer.prototype = Object.create(CGFobject.prototype);
Timer.prototype.constructor = Timer;

/**
* Gets the time to be displayed on the screen
* @param secs Seconds passed to be processed in hours/minuts/seconds format
*/

Timer.prototype.getTime = function(nameTexture){

this.scene.graph.nodes.timer.textureID = nameTexture;

}

Timer.prototype.update = function(current_time){

	var current_time2 = current_time/1000;

	if(this.initialTime == 0)
		this.initialTime = current_time2;
	else
		this.deltaTime=current_time2-this.initialTime;

		var res = Math.floor(this.deltaTime);
		var res2 = (res/10);
		var res3 = (res2%1);
		this.resFinal = Math.floor(Math.round(res3*10));

		if(this.resFinal == 0)
			this.getTime("zero");
		else if(this.resFinal == 1)
			this.getTime("one");
		else if(this.resFinal == 2)
			this.getTime("two");
		else if(this.resFinal == 3)
			this.getTime("three");
		else if(this.resFinal == 4)
			this.getTime("four");
		else if(this.resFinal == 5)
			this.getTime("five");
		else if(this.resFinal == 6)
			this.getTime("six");
		else if(this.resFinal == 7)
			this.getTime("seven");
		else if(this.resFinal == 8)
			this.getTime("eight");
		else{
			this.getTime("nine");
		}

}
