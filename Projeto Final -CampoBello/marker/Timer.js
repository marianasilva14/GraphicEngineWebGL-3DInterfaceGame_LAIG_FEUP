
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

		if(res == 0)
			this.getTime("zero");
		else if(res == 1)
			this.getTime("one");
		else if(res == 2)
			this.getTime("two");
		else if(res == 3)
			this.getTime("three");
		else if(res == 4)
			this.getTime("four");
		else if(res == 5)
			this.getTime("five");
		else if(res == 6)
			this.getTime("six");
		else if(res == 7)
			this.getTime("seven");
		else if(res == 8)
			this.getTime("eight");
		else
			this.getTime("nine");
}
