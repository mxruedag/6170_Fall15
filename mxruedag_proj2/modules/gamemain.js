// Main function to initialize a board for the Game of Life
$(function() {
  var gameOfLifeBoard = Board(BOARD_SIZE, []);

  GameWidget_install($("#game_board"), $("#game_choices"), $("#instructions"), gameOfLifeBoard);
})