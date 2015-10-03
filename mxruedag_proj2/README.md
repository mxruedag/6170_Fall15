## Project 2

My program is divided in the following modules:

- board.js is the model of the Game of Life board. It contains all the functions necessary to "manually" edit the state (with a specified user input) and transition into a new state according to the rules of Game of Life.

- gamewidget.js controls the interaction between board.js and the user input from the view.

- gamemain.js initializes the minimum parameters to start a Game of Life session

- configurations.js has the configurations that I chose for the game (e.g. the size of the board and the preset configurations)

- utils.js contains functions that are useful for implementing functionality throughout the code

- index.html is the template for the web view of the Game of Life

- tests.js and tests.html contain the tests and the HTML to run them in QUnit, respectively