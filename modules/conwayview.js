/**
* GameView is the constructor of the grid/board object
* @param {void}
* @return {void}
*/
var GameView = function () {
  var that = Object.create(GameView.prototype);

  var xMax;
  var yMax;
  var width;
  var height;

  var canvas;
  var ctx;
  var cellSize;
  var gridColor;
  var cellColor;
      
  var alive;
  var timer;
  var cycle;
  var runState=1;

  // Handle reset button click
  $("#reset").click(function (event) {
	  reset();
	  cycle=0;
	  clearInterval(timer);
	  runState=0;
	  $("#cycle").text(cycle);
  });

  // Handle start button click - start the automated playGame
  $('#start').click(function(e) {
	   timer = setInterval(function(){playGame()}, 75);
	runState=1;
  });

  // Handle stop button click - if timer is active then clear it
  $('#stop').click(function(e) {
	    if (timer !== undefined) {
	      clearInterval(timer);
	      timer = undefined;
	      runState=0;
	    }
  });

  // Handle presets dropdown
  $("#presets").change(function(e){
	  if ($("#presets").val()==='beehive'){
		  reset();
		  cycle=0;
		  $("#cycle").text(cycle);
		  conway.reset();
		  clearInterval(timer);
		  conway.setPattern('beehive');
	  };
	  if ($("#presets").val()==='glider'){
		  reset();
		  cycle=0;
		  $("#cycle").text(cycle);
		  conway.reset();
		  clearInterval(timer);
		  conway.setPattern('glider');
	  };
	  if ($("#presets").val()==='boat'){
		  reset();
		  cycle=0;
		  $("#cycle").text(cycle);
		  conway.reset();
		  clearInterval(timer);
		  conway.setPattern('boat');
	  };
    // set random pattern 
	  if ($("#presets").val()==='random'){
		  reset();
		  cycle=0;
		  $("#cycle").text(cycle);
		  conway.reset();
		  clearInterval(timer);
		  conway.setPattern('random');
	  };
	  drawGrid();
  });

  
  // Handle button click on canvas to toggle cell
  $('#canvas').click(function(e) {
	    if (runState===1) return;
	  	var x;
	  	var y;
	  	
	  	// determine click position
	  	if (e.pageX !== undefined && e.pageY !== undefined) {
	  		x = e.pageX-101;
	  		y = e.pageY-201;
	  	} else {
	  		return;
	  	}

	  	// calculate clicked cell
	  	x = Math.floor(x/cellSize);
	  	y = Math.floor(y/cellSize);
	  	toggleCell(y, x);
  	}); 
	/**
	 * Toggles the state of one cell at the given coordinates.
	 * @param {Integer} cx row of the given cell
	 * @param {Integer} cy column of the given cell
	 */
	var toggleCell=function(cx, cy) {
		if (cx >= 0 && cx < xMax && cy >= 0 && cy < yMax) {
			//this.matrix[cx][cy] = !this.matrix[cx][cy];
			conway.setCell(cx,cy);
			drawGrid();
		}
	}
  
  /**
  * Runs the game - one step 
  * @param {void}
  * @return {void}
  */
  var playGame=function (){ 
	    conway.updateAllStates();
	    drawGrid();
	    cycle++;
	    $("#cycle").text(cycle);
  }

  /*
   * Draws the grid onto the canvas
   * @param {void} 
   * @return {void}
   */
  var drawGrid = function () {
    //clears the canvas 
    ctx.clearRect(0, 0, height, width); 
    ctx.strokeStyle=gridColor;
    ctx.fillStyle=cellColor;
    //draw the grid
    for (x = 0.5; x < xMax*cellSize; x+=cellSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, yMax*cellSize);
    }
    for (y = 0.5; y < yMax*cellSize; y+=cellSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(xMax*cellSize, y);
    }
    ctx.stroke();

  	//matrix:r=y;x=c
  	for (y = 0; y < yMax; y++) {
  		for (x = 0; x < xMax; x++) {
  			if (conway.isAlive(y,x) === 1) {
  				ctx.fillRect(x*cellSize+1, y*cellSize+1, cellSize-1, cellSize-1);
  			}
  		}
  	}
  }


  /**
   * Clear entire board
   * @param {void}
   * @return {void}
   */
  var reset = function () {
    conway.reset();
    drawGrid();
  };
  

  /**
  * Initialize the canvas and game
  * @param {Integer} xMax  width of board
  * @param {Integer} yMax  height of board
  * @return {void}
  */
  that.init = function (){
    canvas = $("#canvas");
    ctx = $("#canvas")[0].getContext('2d');
    height = $("#canvas").width();
    width = $("#canvas").height();
    
    yMax = 40;
    xMax = 40;
    cellSize=10;
	  gridColor="#000000";
  	cellColor="#000000";
  	canvas[0].width=xMax*cellSize;
  	canvas[0].height=yMax*cellSize;

    conway = Conway(xMax); //size=xMax=yMax, square
    conway.init(false);
    
    cycle = 0;
    timer = setInterval(function() {playGame()}, 75);

  };
  //prevent object modification
  Object.freeze(that);
  return that;
}

