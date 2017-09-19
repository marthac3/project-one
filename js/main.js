$(function() {

	var gridWidth = 5;
	var gridSize = Math.pow(gridWidth, 2);
	var blankSquares = [];
	run();

	function run() {
		createGrid();
		clickSquare();
		//console.log();
	}

		// creates a square grid for a given size
		function createGrid() {
			var sideLength = 600/gridWidth;

			// creates arrays of all squares on the edges of the grid
			topArray = sideArray("top");
			bottomArray = sideArray("bottom");
			leftArray = sideArray("left");
			rightArray = sideArray("right");
			
			// creates squares
			for (var i = 0; i < gridSize; i++) {
				$("ul").append($("<li id='"+i+"'></li>"));
			}

			// changes width and height of the squares to fit in to the grid
			$("li").css({"width": sideLength, "height": sideLength});
			return generateMines();
		}

		// gives chosen squares the class of 'mine'
		function generateMines(){
			mineNumbers = generateMineNumbers(gridWidth);

			$("li").each(function(index, li){
				var id = parseInt($(li).attr("id"));
				if (mineNumbers.indexOf(id) != -1) {
					$(li).addClass("mine");
				}
				if ($(li).hasClass("mine") == false){
					blankSquares.push(id);
				}
			});

		}

		// returns the values for the ids of the mine squares
		function generateMineNumbers(){
			var mineNumbers = []
			var mines = 0;

			// decides number of mines
			if (gridWidth == 3) {
				mines = 2;
			} else if (gridWidth == 4) {
				mines = 3;
			} else {
				mines = gridWidth;
			}

			// chooses mine squares
			for (var i = 0; i < mines; i++) {
				mineNumbers.push(Math.floor(Math.random()*gridSize));
			}

			return mineNumbers;
		}

		// runs when a square is clicked
		function clickSquare(){
			$("li").click(function() {
				// if a mine is clicked on, prints * then runs 'gameOver'
				if ($(this).hasClass("mine")) {
					$(this).text("*");
					gameOver();
				} else {
					// if not a mine, prints number of mines surrounding the square
					var printNumber = getNumber($(this).attr("id"));
					$(this).text(printNumber);

					// removes the square from the array of non-mine squares
					var id = parseInt($(this).attr("id"));
					var blank = blankSquares.indexOf(id);
					if (blank != -1) {
						blankSquares.splice(blank, 1);
					}

					// checks if array of non-mine squares is empty, if true then game is won
					checkEmpty(blankSquares);
				}
			});
		}

		// game over when mine clicked
		function gameOver() {
			console.log("GAME OVER");
		}

		// game win when all non-mines clicked
		function gameWin(){
			console.log("YOU WIN");
		}

		// checks if blankSquares array is empty, if it is runs gameWin
		function checkEmpty() {
			if (blankSquares.length == 0) {
				gameWin();
			} else {
				return false;
			}
		}

		// FUNCTIONS FOR CALCULATING NUMBER PRINTED IN SQUARE (MINECOUNT)

		// splits squares into corners, sides and centres
		function getNumber(square){
			var mineCount = 0;

			if ((square == 0) || (square == (gridWidth - 1)) || (square == ((Math.pow(gridWidth, 2) - gridWidth))) || (square == ((Math.pow(gridWidth, 2) - 1)))) {
				mineCount = getCornerNumber(square);
			} else if ((topArray.indexOf(parseInt(square)) != -1) || (bottomArray.indexOf(parseInt(square)) != -1) || (leftArray.indexOf(parseInt(square)) != -1) || (rightArray.indexOf(parseInt(square)) != -1)) {
				mineCount = getSideNumber(square, topArray, bottomArray, leftArray, rightArray);
			} else {
				mineCount = getCenterNumber(square);
			}

			return mineCount;
		}

		// calculate numbers for corners
		function getCornerNumber(square) {
			calcSquare = parseInt(square);
			var mineCount = 0;

				// top left corner
				if (square == 0) {
					var locations = ["below", "right", "down-right"];
					$(locations).each(function(index, location) {
						if (checkMine(calcSquare, location)) mineCount++;
					});
				} 

				// top right corner
				else if (square == (gridWidth - 1)){
					var locations = ["below", "left", "down-left"];
					$(locations).each(function(index, location) {
						if (checkMine(calcSquare, location)) mineCount++;
					});
				} 

				// bottom left corner
				else if (square == ((Math.pow(gridWidth, 2)) - gridWidth)) {
					var locations = ["above", "right", "up-right"];
					$(locations).each(function(index, location) {
						if (checkMine(calcSquare, location)) mineCount++;
					});
				} 

				// bottom right corner
				else if (square == ((Math.pow(gridWidth, 2) - 1))) {
					var locations = ["above", "left", "up-left"];
					$(locations).each(function(index, location) {
						if (checkMine(calcSquare, location)) mineCount++;
					});
				}

			return mineCount;
		}

		// calculate numbers for sides
		function getSideNumber(square, top, bottom, left, right){
			mineCount = 0;
			calcSquare = parseInt(square);

			// top side
			if (top.indexOf(calcSquare) != -1){
				var locations = ["below", "left", "right", "down-left", "down-right"];
				$(locations).each(function(index, location) {
					if (checkMine(calcSquare, location)) mineCount++;
				});
			} 

			// bottom side
			else if (bottom.indexOf(calcSquare) != -1){
				var locations = ["above", "left", "right", "up-left", "up-right"];
				$(locations).each(function(index, location) {
					if (checkMine(calcSquare, location)) mineCount++;
				});
			} 

			// left side
			else if (left.indexOf(calcSquare) != -1){
				var locations = ["above", "below", "right", "up-right", "down-right"];
				$(locations).each(function(index, location) {
					if (checkMine(calcSquare, location)) mineCount++;
				});
			} 

			// right side
			else if (right.indexOf(calcSquare) != -1){
				var locations = ["above", "below", "left", "up-left", "down-left"];
				$(locations).each(function(index, location) {
					if (checkMine(calcSquare, location)) mineCount++;
				});
			}
			return mineCount;
		}

		// calculate numbers for centres
		function getCenterNumber(square){
			calcSquare = parseInt(square);
			mineCount = 0;
			var locations = ["above", "below", "left", "right", "up-left", "up-right", "down-left", "down-right"];
			$(locations).each(function(index, location) {
				if (checkMine(calcSquare, location)) mineCount++;
			});
			return mineCount;
		}

		// calculations that check for mines
		function checkMine(square, position) {
			if (position == "above"){
				if ($("#" + (calcSquare - gridWidth)).hasClass("mine") == true){
					return true;
				}
			} else if (position == "below"){
				if ($("#" + (calcSquare + gridWidth)).hasClass("mine") == true){
					return true;
				} 
			} else if (position == "left"){
				if ($("#" + (calcSquare - 1)).hasClass("mine") == true){
					return true;
				} 
			} else if (position == "right"){
				if ($("#" + (calcSquare + 1)).hasClass("mine") == true){
					return true;
				} 
			} else if (position == "up-left"){
				if ($("#" + (calcSquare - (gridWidth + 1))).hasClass("mine") == true){
					return true;
				} 
			} else if (position == "up-right"){
				if ($("#" + (calcSquare - (gridWidth - 1))).hasClass("mine") == true){
					return true;
				} 
			} else if (position == "down-left"){
				if ($("#" + (calcSquare + (gridWidth - 1))).hasClass("mine") == true){
					return true;
				}
			} else if (position == "down-right"){
				if ($("#" + (calcSquare + (gridWidth + 1))).hasClass("mine") == true){
					return true;
				}
			}
		}

		// generates arrays of squares on the edge of the grid
		function sideArray(side) {
			var sideArray = [];
			for (i = 1; i < (gridWidth - 1); i++) {
				if (side == "top") {
					sideArray.push(i);
				} else if (side == "bottom") {
					sideArray.push((gridSize - 1) - i);
				} else if (side == "left") {
					sideArray.push(i*gridWidth);
				} else if (side == "right") {
					sideArray.push((i*gridWidth)+(gridWidth - 1));
				}
			}
			return sideArray;
		}

});