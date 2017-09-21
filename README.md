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
## Running
## Site
