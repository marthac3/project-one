$(function() {

	var gridWidth = 5;
	var gridSize = Math.pow(gridWidth, 2);
	var blankSquares = [];
	run();

	function run() {
		createGrid();
		clickSquare();
		console.log();
	}

	// create 3x3 grid
		// create grid based on difficulty selected

		function createGrid() {
			var sideLength = 600/gridWidth;
			
			for (var i = 0; i < gridSize; i++) {
				$("ul").append($("<li id='"+i+"'></li>"));
			}
			$("li").css({"width": sideLength, "height": sideLength});
			return generateMines();
		}

	// set mines

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

			/*$("li").each(function(index, li){
				console.log($(li).hasClass("mine"));
			});*/

		}

	// randomly generate 2 mine locations (0-8)
		// generate number of mines based on difficulty (0-(n-1))

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

			// on click print a number

		function clickSquare(){
			$("li").click(function() {
				if ($(this).hasClass("mine")) {
					$(this).text("*");
					gameOver();
				} else {
					var printNumber = getNumber($(this).attr("id"));
					$(this).text(printNumber);
					var id = parseInt($(this).attr("id"));
					var blank = blankSquares.indexOf(id);
					if (blank != -1) {
						blankSquares.splice(blank, 1);
					}
					checkEmpty(blankSquares);
				}
			});
		}


	// on click print a mine

	// game over when mine clicked
		function gameOver() {
			console.log("GAME OVER");
		}

	// game win when all non-mines clicked
	// APPEARING EARLY FIX THIS
		function gameWin(){
			console.log("YOU WIN");
		}

		function checkEmpty() {
			if (blankSquares.length == 0) {
				gameWin();
			} else {
				return false;
			}
		}

	// mine counter
		// add logic for mine counter

		function getNumber(square){
			var mineCount = 0;
			topArray = sideArray("a");
			bottomArray = sideArray("b");
			leftArray = sideArray("c");
			rightArray = sideArray("d");

			if ((square == 0) || (square == (gridWidth - 1)) || (square == ((Math.pow(gridWidth, 2) - gridWidth))) || (square == ((Math.pow(gridWidth, 2) - 1)))) {
				mineCount = getCornerNumber(square);
			} else if ((topArray.indexOf(parseInt(square)) != -1) || (bottomArray.indexOf(parseInt(square)) != -1) || (leftArray.indexOf(parseInt(square)) != -1) || (rightArray.indexOf(parseInt(square)) != -1)) {
				mineCount = getSideNumber(square, topArray, bottomArray, leftArray, rightArray);
			} else {
				mineCount = getCenterNumber(square);
			}

			return mineCount;
		}

		function getCornerNumber(square) {
			calcSquare = parseInt(square);
			var mineCount = 0;
				if (square == 0) {
					// right
					if (checkMine(calcSquare, "right") == true) {
						mineCount++
					} 
				 	// below
					if (checkMine(calcSquare, "below") == true) {
						mineCount++
					}
					// lower right
					if (checkMine(calcSquare, "down-right") == true) {
						mineCount++
					}
				} else if (square == (gridWidth - 1)){
					// left
					if (checkMine(calcSquare, "left") == true) {
						mineCount++
					} 
					// lower left
					if (checkMine(calcSquare, "down-left") == true) {
						mineCount++
					}  
					// below
					if (checkMine(calcSquare, "below") == true) {
						mineCount++
					}
				} else if (square == ((Math.pow(gridWidth, 2)) - gridWidth)) {
					// above
					if (checkMine(calcSquare, "above") == true) {
						mineCount++
					}
					// upper right
					if (checkMine(calcSquare, "up-right") == true) {
						mineCount++
					} 
					// right
					if (checkMine(calcSquare, "right") == true) {
						mineCount++
					}
				} else if (square == ((Math.pow(gridWidth, 2) - 1))) {
					// upper left
					if (checkMine(calcSquare, "up-left") == true) {
						mineCount++
					} 
					// above
					if (checkMine(calcSquare, "above") == true) {
						mineCount++
					}
					// left
					if (checkMine(calcSquare, "left") == true) {
						mineCount++
					}
				}

			return mineCount;
		}

		function getSideNumber(square, top, bottom, left, right){
			mineCount = 0;
			calcSquare = parseInt(square);
			if (top.indexOf(calcSquare) != -1){
				// left
				if (checkMine(calcSquare, "left") == true) {
					mineCount++
				}
				// right
				if (checkMine(calcSquare, "right") == true) {
					mineCount++
				}
				// lower left
				if (checkMine(calcSquare, "down-left") == true) {
					mineCount++
				}  
				// below
				if (checkMine(calcSquare, "below") == true) {
					mineCount++
				}
				// lower right
				if (checkMine(calcSquare, "down-right") == true) {
					mineCount++
				}

			} else if (bottom.indexOf(calcSquare) != -1){
				// left
				if (checkMine(calcSquare, "left") == true) {
					mineCount++
				}
				// right
				if (checkMine(calcSquare, "right") == true) {
					mineCount++
				} 
				// upper right
				if (checkMine(calcSquare, "up-right") == true) {
					mineCount++
				} 
				// above
				if (checkMine(calcSquare, "above") == true) {
					mineCount++
				}
				// upper left
				if (checkMine(calcSquare, "up-left") == true) {
					mineCount++
				}  
			} else if (left.indexOf(calcSquare) != -1){
				// right
				if (checkMine(calcSquare, "right") == true) {
					mineCount++
				} 
				// upper right
				if (checkMine(calcSquare, "up-right") == true) {
					mineCount++
				} 
				// above
				if (checkMine(calcSquare, "above") == true) {
					mineCount++
				}
				// below
				if (checkMine(calcSquare, "below") == true) {
					mineCount++
				}
				// lower right
				if (checkMine(calcSquare, "down-right") == true) {
					mineCount++
				}
			} else if (right.indexOf(calcSquare) != -1){
				// left
				if (checkMine(calcSquare, "left") == true) {
					mineCount++
				}
				// above
				if (checkMine(calcSquare, "above") == true) {
					mineCount++
				}
				// upper left
				if (checkMine(calcSquare, "up-left") == true) {
					mineCount++
				}  
				// lower left
				if (checkMine(calcSquare, "down-left") == true) {
					mineCount++
				} 
				// below
				if (checkMine(calcSquare, "below") == true) {
					mineCount++
				}
			}
			return mineCount;
		}

		function getCenterNumber(square){
			calcSquare = parseInt(square);
			mineCount = 0;
			// above
			if (checkMine(calcSquare, "above") == true) {
					mineCount++
			}
			// left
			if (checkMine(calcSquare, "left") == true) {
					mineCount++
			}
			// right
			if (checkMine(calcSquare, "right") == true) {
					mineCount++
			}
			// upper right
			if (checkMine(calcSquare, "up-right") == true) {
					mineCount++
			} 
			// upper left
			if (checkMine(calcSquare, "up-left") == true) {
					mineCount++
			}  
			// lower left
			if (checkMine(calcSquare, "down-left") == true) {
					mineCount++
			} 
			// below
			if (checkMine(calcSquare, "below") == true) {
					mineCount++
			}
			// lower right
			if (checkMine(calcSquare, "down-right") == true) {
					mineCount++
			}
			return mineCount;
		}

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

		function sideArray(side) {
			var sideArray = [];
			for (i = 1; i < (gridWidth - 1); i++) {
				if (side == "a") {
					sideArray.push(i);
				} else if (side == "b") {
					sideArray.push((gridSize - 1) - i);
				} else if (side == "c") {
					sideArray.push(i*gridWidth);
				} else if (side == "d") {
					sideArray.push((i*gridWidth)+(gridWidth - 1));
				}
			}
				
			return sideArray;
		}

});