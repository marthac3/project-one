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
				$("ul").append($("<li id='"+i+"'></li>"));
			}
			$("li").css({"width": sideLength, "height": sideLength});
		}

	// on click print a number

	// randomly generate 2 mine locations (0-8)
		// generate number of mines based on difficulty (0-(n-1))

		function generateMines(){
			mineNumbers = generateMineNumbers();
			console.log(mineNumbers);


			$("li").each(function(index, li){
				var id = parseInt($(li).attr("id"));
				if (mineNumbers.indexOf(id) != -1) {
					$(li).addClass("mine");
				}
			});

			$("li").each(function(index, li){
				console.log($(li).hasClass("mine"));
			});

		}

		function generateMineNumbers(){
			var mineNumbers = []
			var mines = 0;

			if (gridWidth == 3) {
				mines = 2;
			} else if (gridWidth == 4) {
				mines = 3;
			} else {
				mines = gridWidth;
			}

			for (var i = 0; i < mines; i++) {
				mineNumbers.push(Math.floor(Math.random()*gridSize));
			}

			return mineNumbers;
		}

	// set mines

	// on click print a mine

	// game over when mine clicked

	// game win when all non-mines clicked

	// mine counter
		// add logic for mine counter

	}

});