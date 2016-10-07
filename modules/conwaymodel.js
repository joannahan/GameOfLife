/**
* Conway is the constructor of the game of life game
* @param {Integer} size  Size of the board
* @return {Object}  Conway object instance
*/
var Conway = function(size) {
	var that = Object.create(Conway.prototype);
	var size = size;
	var grid = {};
	var gridArray = {};

	// static grid used for testing
	var staticGridArray = [[1,1,1,1,0], 
							[1,0,0,1,0], 
							[0,0,1,0,1], 
							[0,1,0,0,0], 
							[1,1,0,0,1]];

	// directions relative to a cell of all its surrounding neighbors
	var translations = [ [-1,-1], [-1,0], 
						[-1,1], [0,-1], 
						[0,1], [1,-1], 
						[1,0], [1,1] ];

	/**
	* Initializes the board
	* @param {Boolean} isUnitTest  used to determine if board is used for testing (i.e. to randomized or not)
	* @return {void}
	*/
	var initialize = function (isUnitTest) {		
		for (var i=0; i<size; i++) {
			gridArray[i] = {};
			for (var j=0; j<size; j++) {
				if (isUnitTest === false) {
					gridArray[i][j] = {alive: Math.round(Math.random()), neighbors: 0};
				} 
				else {
				 	gridArray[i][j] = {alive: staticGridArray[i][j], neighbors: 0};
				 }
			}
		}
		//console.log(JSON.stringify(gridArray));
		if (isUnitTest === false) {
			fillRandom();
		} 
	};
	
	// public init
	that.init = function(isUnitTest) {
		initialize(isUnitTest);
	};
	
	/**
	* Sets the grid array for the presets
	* @param {Integer} i,j  coordinates for the cell
	* @param {Integer} alive  1 if alive, 0 if dead
	* @param {Integer} neighbors  Number of neighbors for cell
	* @return {void}
	*/
	var setGridArray=function(i,j,alive,neighbors){
		gridArray[i][j].alive=alive;
		gridArray[i][j].neighbors=neighbors;
	};

	// sets cell attributes for toggle
	that.setCell = function (x,y) {
		gridArray[x][y] = {alive: 1, neighbors: 0};
	}
	/**
	* Sets the different preset patterns onto the grid
	* @param {String} patternName  name of the pattern referencing the DOM
	* @return {void}
	*/
	that.setPattern = function (patternName) {
		var hs=Math.floor(size/2);
		if (patternName==="beehive"){
			for (var i=hs-1; i<hs+2; i++) {
				for (var j=hs-1; j<hs+3; j++) {
						gridArray[i][j] = {alive: 1, neighbors: 0};
				}
			}
			setGridArray(hs,hs,0,0);
			setGridArray(hs,hs+1,0,0);
			setGridArray(hs-1,hs-1,0,0);
			setGridArray(hs-1,hs+2,0,0);
			setGridArray(hs+1,hs-1,0,0);
			setGridArray(hs+1,hs+2,0,0);	
		}
		if (patternName==="glider"){
			for (var i=hs-1; i<hs+2; i++) {
				for (var j=hs-1; j<hs+2; j++) {
						gridArray[i][j] = {alive: 1, neighbors: 0};
				}
			}
			setGridArray(hs,hs,0,0);
			setGridArray(hs,hs-1,0,0);
			setGridArray(hs-1,hs-1,0,0);
			setGridArray(hs-1,hs+1,0,0);
		}
		if (patternName==="boat"){
			for (var i=hs-1; i<hs+2; i++) {
				for (var j=hs-1; j<hs+2; j++) {
						gridArray[i][j] = {alive: 1, neighbors: 0};
				}
			}
			setGridArray(hs,hs,0,0);
			setGridArray(hs+1,hs+1,0,0);
			setGridArray(hs+1,hs-1,0,0);
			setGridArray(hs-1,hs+1,0,0);
		}
		if (patternName==="random"){
			//alert("random");
			initialize(false);
		}
	};

	/**
	* Checks if the cell has less than 2 neighbors
	* @param {Integer} r  Row index of the cell
	* @param {Integer} c  Column index of the cell
	* @return {Boolean}  Whether or not the cell is underpopulated
	*/
	var isUnderpopulated = function (r,c) {
		var cell = gridArray[r][c];
		return cell.neighbors < 2;
	};

	/**
	* Checks if the cell has more than 3 neighbors
	* @param {Integer} r  Row index of the cell
	* @param {Integer} c  Column index of the cell
	* @return {Boolean}  Whether or not the cell is overpopulated
	*/
	var isOverpopulated = function (r,c) {
		var cell = gridArray[r][c];
		return cell.neighbors > 3;
	};

	/**
	* Checks if the cell has 3 neighbors and is dead
	* @param {Integer} r  Row index of the cell
	* @param {Integer} c  Column index of the cell
	* @return {Boolean}  Whether or not the cell can come back to life
	*/
	var isRevivable = function (r,c) {
		var cell = gridArray[r][c];
		return !cell.alive && cell.neighbors === 3
	};

	/**
	* Checks if the cell is within the board
	* @param {Integer} r  Row index of the cell
	* @param {Integer} c  Column index of the cell
	* @return {Boolean}  Whether or not the cell is in bounds
	*/
	var isInBounds = function (r,c) {
		//alert("innnnisbound:r:"+r+",c:",c);
		return r >= 0 && r < size && c >= 0 && c < size;
	};

	/**
	* Updates the cell's neighbors count
	* @param {Integer} r  Row index of the cell
	* @param {Integer} c  Column index of the cell
	* @return {void}  
	*/
	var updateCellNeighbors = function (r,c) {
		var cell = gridArray[r][c];
		cell.neighbors = 0;
		//alert("updateCellNeighbors:translations.length"+translations.length);
		translations.forEach(function(translation, i) {
			var dr = translation[0];
			var dc = translation[1];
			if (isInBounds(r+dr,c+dc)) { 
				var neighbor = gridArray[r+dr][c+dc];
				if (neighbor.alive) {
					cell.neighbors++;
				} 	
			}
		})
	};

	/**
	* Updates the counts of all cells' neighbors
	* @param {void}
	* @return {void}  
	*/
	var updateAllNeighbors = function () {
		for (var i=0; i<size; i++) {
			for (var j=0; j<size; j++) {
				updateCellNeighbors(i,j);
			}
		} 
	};

	/**
	* Resets the board and all the cell objects
	* @param {void}
	* @return {void}  
	*/	
	that.reset = function () {
		for (var i=0; i<size; i++) {
			for (var j=0; j<size; j++) {
				var cell = gridArray[j][i];
				cell.alive=0;
				cell.neighbors = 0;
			}
		}
	};

	/**
	* Updates the state of the cell
	* @param {Integer} r  Row index of the cell
	* @param {Integer} c  Column index of the cell
	* @return {void}  
	*/	
	var updateCellState = function (r,c) {
		var cell = gridArray[r][c];
		if (isUnderpopulated(r,c) || isOverpopulated(r,c)) {
			cell.alive = 0;
		} else if (isRevivable(r,c)) {
			cell.alive = 1;
		}
	};

	/**
	* Updates the states of all the cells
	* @param {void}
	* @return {void}  
	*/	
	that.updateAllStates = function () {
		updateAllNeighbors();
		for (var i=0; i<size; i++) {
			for (var j=0; j<size; j++) {
				updateCellState(i,j);
			}
		}
	};

	/**
	* Gets the size of the board
	* @param {void}
	* @return {Integer} Size of the board  
	*/
	that.getSize = function() {
		return size;
	}

	/**
	* Gets the gridArray object of the board
	* @param {void}
	* @return {Object} gridArray object  
	*/
	that.getGrid = function() {
		return gridArray;
	}

	/**
	* Gets the number of neighbors of the cell
	* @param {Integer} r  Row index of the cell
	* @param {Integer} c  Column index of the cell
	* @return {Integer} Number of cell's neighbors
	*/
	that.getNeighbors = function(r,c) {
		var cell = gridArray[r][c];
		return cell.neighbors;
	}

	/**
	* Gets the state of the cell, whether it's alive or not
	* @param {Integer} r  Row index of the cell
	* @param {Integer} c  Column index of the cell
	* @return {Integer} 1 if cell is alive, 0 if cell is dead
	*/
	that.isAlive = function(r,c) {
		return gridArray[r][c].alive;
	}

	/**
	* Gets the status of the cell: overpopulated, underpopulated, revivable
	* @param {Integer} r  Row index of the cell
	* @param {Integer} c  Column index of the cell
	* @return {Boolean List} [isOverpopulated, isUnderpopulated, isRevivable]
	*/
	that.getCellStatus = function(r,c) {
		var cell = gridArray[r][c];
		var ans = [];
		ans.push(cell.neighbors>3);
		ans.push(cell.neighbors<2);
		ans.push(cell.neighbors===3 && cell.alive===1);
		return ans;
	}

	/**
	* Fills the board with random cell states
	* @param {void}
	* @return {void} 
	*/
	var fillRandom = function() { 
		doubleFor(size, function() {
			var randomNum = Math.floor(Math.random() * 2); //convert it to an int
			if (randomNum === 1) {
				cell.alive = 1;
			} else {
				cell.alive = 0;
			}
		})
	}

	// for loop abstraction, when need gridArray[r][c]
	var doubleFor = function(size, f) {
		for (var r=0; r<size; r++) {
			for (var c=0; c<size; c++) {
				var cell = gridArray[r][c];
				return cell;
				f();
			}
		}
	}

	//prevent object modification
	Object.freeze(that);
	return that;
};



