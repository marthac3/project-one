$(function() {

	console.log("loaded");
	var gridWidth = 3;
	var gridSize = Math.pow(gridWidth, 2);
	var blankSquares = [];
	run();

	function run() {
		createGrid();
		generateMines();
		clickSquare();
		console.log();
	}

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

	// set mines

		function generateMines(){
			mineNumbers = generateMineNumbers(gridWidth);
			console.log(mineNumbers);

			$("li").each(function(index, li){
				var id = parseInt($(li).attr("id"));
				if (mineNumbers.indexOf(id) != -1) {
					$(li).addClass("mine");
				}
				if ($(li).hasClass("mine") == false){
					blankSquares.push(id);
				}
			});

			$("li").each(function(index, li){
				console.log($(li).hasClass("mine"));
			});

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
					var id = $(this).attr("id");
					var blank = blankSquares.indexOf(parseInt(id));
					blankSquares.splice(blank, 1);
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
					if ($("#" + (1)).hasClass("mine") == true){
						mineCount++;
					} if ($("#" + gridWidth).hasClass("mine") == true){
						mineCount++;
					} if (($("#" + (gridWidth + 1)).hasClass("mine") == true)){
						mineCount++;
					}
				} else if (square == (gridWidth - 1)){
					if ($("#" + (calcSquare - 1)).hasClass("mine") == true){
						mineCount++;
					} if ($("#" + (calcSquare + (gridWidth - 1))).hasClass("mine") == true){
						mineCount++;
					} if ($("#" + (calcSquare + gridWidth)).hasClass("mine") == true){
						mineCount++;
					}
				} else if (square == ((Math.pow(gridWidth, 2)) - gridWidth)) {
					if ($("#" + (calcSquare - gridWidth)).hasClass("mine") == true){
						mineCount++;
					} if ($("#" + (calcSquare - (gridWidth - 1))).hasClass("mine") == true){
						mineCount++;
					} if ($("#" + (calcSquare + 1)).hasClass("mine") == true){
						mineCount++;
					}
				} else if (square == ((Math.pow(gridWidth, 2) - 1))) {
					if ($("#" + (calcSquare - (gridWidth + 1))).hasClass("mine") == true){
						mineCount++;
					} if ($("#" + (calcSquare - gridWidth)).hasClass("mine") == true){
						mineCount++;
					} if ($("#" + (calcSquare - 1)).hasClass("mine") == true){
						mineCount++;
					}
				}

			return mineCount;
		}

		function getSideNumber(square, top, bottom, left, right){
			mineCount = 0;
			console.log(top);
			console.log(bottom);
			console.log(left);
			console.log(right);
			if (top.indexOf(square) != -1){
				mineCount = 5;
			} else if (bottom.indexOf(square) != -1){
				mineCount = 10;
			}else if (left.indexOf(square) != -1){
				mineCount = 15;
			} else if (right.indexOf(square) != -1){
				mineCount = 20;
			}
			return mineCount;
		}

		function getCenterNumber(square){
			calcSquare = parseInt(square);
			mineCount = 0;
			if ($("#" + (calcSquare - 1)).hasClass("mine") == true){
				mineCount++;
			} if ($("#" + (calcSquare + 1)).hasClass("mine") == true){
				mineCount++;
			} if ($("#" + (calcSquare - (gridWidth - 1))).hasClass("mine") == true){
				mineCount++;
			} if ($("#" + (calcSquare - gridWidth)).hasClass("mine") == true){
				mineCount++;
			} if ($("#" + (calcSquare - (gridWidth + 1))).hasClass("mine") == true){
				mineCount++;
			} if ($("#" + (calcSquare + (gridWidth - 1))).hasClass("mine") == true){
				mineCount++;
			} if ($("#" + (calcSquare + gridWidth)).hasClass("mine") == true){
				mineCount++;
			} if ($("#" + (calcSquare + (gridWidth + 1))).hasClass("mine") == true){
				mineCount++;
			}
			return mineCount;
		}

		function sideArray(side) {
			var sideArray = [];
			for (i = 1; i < (gridWidth - 1); i++) {
				if (side == "a") {
					sideArray.push(i);
				} else if (side == "b") {
					sideArray.push(i + (2*gridWidth));
				} else if (side == "c") {
					sideArray.push(i*gridWidth);
				} else if (side == "d") {
					sideArray.push((i*gridWidth)+(gridWidth - 1));
				}
			}
				
			return sideArray;
		}

});