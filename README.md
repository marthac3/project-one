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
* HTML5
* CSS
* Javascript using JQuery

## Creation
### Building

>**Part 1 - Calculations**

I began by working out all the calculations needed to work out where any chosen square is, regardless of grid size, for example the index of the square in the top right corner will always be (n-1) where n is the width of the grid.

I then worked out the calculations to find the indexes of all the squares adjacent to the chosen square. If the square is in a centre position, all these will need to be checked for mines. However, for squares in corners or edges, only some will be needed, and checking all of them would check squares not adjacent to the chosen square.

>**Part 2 - Functioning Game**

The first step in getting the game to function as a game of minesweeper was to create the grid.

>**Part 3 - Visuals**

Menu

Based on my wireframes, I created two sidebars, one on either side of the grid.

>**Day 4 - DRYing Code**

Put all calculations into a shorter funtion

### Issues

I had two major issues when creating this game, both related to faulty calculations printing incorrect numbers on clicked squares.

>**Issue 1 - Adding anything to the ID of the square not working**

I noticed all mines on the line above or to the left of the clicked square were being counted, but any below or to the right were not. I realised that any calculation adding the square's ID to another number were the ones that were not functioning.

The problem was being caused by the square's ID being a string.

I added a parseInt() to each function using the square's ID for calculations in order to be able to use it as an int, which fixed the problem.

>**Issue 2 - Mines below the third row not being counted**

I noticed that while most squares were showing the correct number, a small number of them were showing a number one or two lower than they should. After checking many grids at various sizes, I realised that all the incorrect numbers were on the third row, and any mines not being counted were on the row below them.

The problem was a faulty calculation in sideArray mistaking all squares on the third row as being on the bottom row. I had written the calculation to find squares on the bottom row based on a 3x3 grid rather than to be universal.

I changed the calculation from (i + (2 * gridWidth)) to ((gridSize - 1) - i).

## Running
## Site
