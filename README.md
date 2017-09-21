# minesweeper

## Purpose

This is a simplified game of Minesweeper I created in order to improve my skills in HTML, CSS and Javascript.

## Functionality

The game can be played at three different grid sizes (difficulty levels). The game functions like normal minesweeper, clicking on squares to reveal how many mines are nearby and using these to try to avoid mines until all non-mine squares have been cleared. If a mine is clicked on, the game is over. However, unlike normal minesweeper, this version does not include flags to mark where known mines are, and the grid must always be square.

When a game is won, you win points based on the difficulty of the game.

The difficulty you are playing at is displayed next to the grid, as is your score.

The game includes an option to return to the main menu, which resets the game.

## Implementation

* Sublime Text
* Semantic HTML5
* CSS
* Javascript using JQuery

## Creation
### Building

>**Part 1 - Calculations**

I began by working out all the calculations needed to work out where any chosen square is, regardless of grid size, for example the index of the square in the top right corner will always be (n-1) where n is the width of the grid.

I then worked out the calculations to find the indexes of all the squares adjacent to the chosen square. If the square is in a centre position, all these will need to be checked for mines. However, for squares in corners or edges, only some will be needed, and checking all of them would check squares not adjacent to the chosen square.

>**Part 2 - Functioning Game**

The first step in getting the game to function as a game of minesweeper was to create the grid. It is contained as being 600px x 600px but can have any number of squares across. The ul is created in the HTML but the li elements are generated in the Javascript using the variable 'gridWidth'. By changing 'gridWidth', the grid can have a different number of squares.

Then squares are chosen to be mines. This is done by setting the number of mines based on the size of the grid. Then random numbers between 0 and the index of the final square are chosen, and pushed to an array. These random numbers can be repeats of each other, meaning as few as 1 mine could be on the grid, but I left this as it was as it adds an extra random element to the game.

These chosen squares then had to be assigned the class of 'mine'. The generateMines() function loops through all the li elements and if their index matches a number in the array of mine numbers, it is assigned the class of 'mine'. If it is not a mine its index is pushed to the array blankSquares[], used to check whether a player has won the game.

The function clickSquare prints * if the square clicked on is a mine, or uses the getNumber() function to calculate which number to print. This square's index is then removed from the array blankSquares[].

The calculation functions for the number printed in a clicked square were one function, getNumber(), to sort the squares into corners, sides and centres. There were then three functions, one for each category, which directs which calculations are needed to check for mines. The calculations themselves were originally performed in these functions as discussed in Part 4. Then all the calculations themselves are in one function, mineCalculations().

The functions for the end of the game, gameOver (when a mine is clicked) and gameWin (when blankSquares[] is empty) originally printed 'GAME OVER' or 'YOU WIN' to the console but were expanded later on, which will be discussed in Part 3. gameWin also calculates your score based on the difficulty of the grid.

>**Part 3 - Visuals**

The menu was designed to cover a large portion of the screen, covering up the empty grid behind it. It is toggled on and off at various prompts

Based on my wireframes, I created two sidebars, one on either side of the grid. The left one has a button to return to the menu, which resets the game. This is where the flag toggle would have been if I had implemented flags. The right one has boxes telling you which difficulty you are currently playing, and one telling you your current score, which is only reset on refreshing the page.

The colour scheme mostly uses grey and purple, with white for emphasis (the grid itself, the printed score etc.). And red, orange and green for the difficulty buttons. The same red and green are used to colour the mines on a game lose or win.

An explosion noise plays when a mine is clicked.

>**Part 4 - DRYing Code**

Put all calculations into a shorter funtion

Many functions involved resetting the game by removing all the li elements, setting the difficulty to 0 and emptying the blankSquares[] array. These were all taken out an put into one function reset() that they could call.

### Issues

I had two major issues when creating this game, both related to faulty calculations printing incorrect numbers on clicked squares.

>**Issue 1 - Adding anything to the index of the square not working**

I noticed all mines on the line above or to the left of the clicked square were being counted, but any below or to the right were not. I realised that any calculation adding the square's index to another number were the ones that were not functioning.

The problem was being caused by the square's index being a string.

I added a parseInt() to each function using the square's index for calculations in order to be able to use it as an int, which fixed the problem.

>**Issue 2 - Mines below the third row not being counted**

I noticed that while most squares were showing the correct number, a small number of them were showing a number one or two lower than they should. After checking many grids at various sizes, I realised that all the incorrect numbers were on the third row, and any mines not being counted were on the row below them.

The problem was a faulty calculation in sideArray mistaking all squares on the third row as being on the bottom row. I had written the calculation to find squares on the bottom row based on a 3x3 grid rather than to be universal.

I changed the calculation from (i + (2 * gridWidth)) to ((gridSize - 1) - i).

### Future Improvements

## Running
## Site
