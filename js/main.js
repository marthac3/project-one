$(function() {

	console.log("loaded");
	run();

	function run() {

		var gridWidth = 3;
		var gridSize = Math.pow(gridWidth, 2)
		createGrid();
		generateMines();

	// create 3x3 grid
		// create grid based on difficulty selected

		function createGrid() {
			var sideLength = 600/gridWidth;
			console.log(sideLength);
			
			for (var i = 0; i < gridSize; i++) {
				$("ul").append($("<li value='"+i+"'></li>"));
			}
			$("li").css({"width": sideLength, "height": sideLength});
		}

	// on click print a number

	// randomly generate 2 mine locations (0-8)
		// generate number of mines based on difficulty (0-(n-1))

		function generateMines(){
			var mineNumbers = []
			var mines = 0;
			if (gridWidth == 3) {
				mines = 2;
			} else if (gridWidth == 4) {
				mines = 3;
			} else if (gridWidth == 5) {
				mines = 5;
			}
			for (var i = 0; i < mines; i++) {
				mineNumbers.push(Math.floor(Math.random()*gridSize));
			}
			console.log(mineNumbers);
		}

	// set mines

	// on click print a mine

	// game over when mine clicked

	// game win when all non-mines clicked

	// mine counter
		// add logic for mine counter

	}

});