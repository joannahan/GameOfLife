/**
* GameController is the constructor of the controller object
* @param {void}
* @return {void}
*/
var GameController=function(){
	var that = Object.create(GameController.prototype);	
	var gameView = GameView();
	gameView.init();

	//prevent object modification
	Object.freeze(that);
	return that;	
};

/**
 * Create the controller object
 */
(function(){
	var ctrl = GameController();
})()
