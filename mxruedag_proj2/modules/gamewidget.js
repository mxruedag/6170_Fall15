GameWidget_install = function(boardContainer, buttonsContainer, instructionsContainer, board){

  var playGame = false;

  var board = board;

  // Setting up the instructions
  var instructionsP = $("<p>", {text: instructions})
  instructionsContainer.append(instructionsP);

  // Setting up the menu bar
  var dropdownElm = $("<select>");
  var startButton = $("<button>", {text: "Start"});
  var pauseButton = $("<button>", {text: "Pause"});
  buttonsContainer.append(dropdownElm, startButton, pauseButton);
  // Functions to be called when each of the menu bar tools is called
  presetConfigurationsNames.forEach(function(configName){
    dropdownElm.append($("<option>", {"value": configName, text: configName }));
  });
  dropdownElm.change(function(){
    if (!playGame){
      board.changeBoardConfiguration(presetConfigurations[dropdownElm.val()]);
    }
  });
  startButton.click(function() {playGame = true;});
  pauseButton.click(function() {playGame = false;});

  // Setting up the board
  var tableElm = $("<table>");
  boardContainer.append(tableElm);

  /**
  * Rebuilds the table element that represents the Game of Life board.
  */
  var rebuild_board = function(){
    var newTableElm = $("<table class='GameWidget'>");
    from_to(0, board.getSideLength()-1, function(row){
      var newRow = $("<tr>");
      from_to(0, board.getSideLength()-1, function(col){
        cell = $("<td>");
        if (board.getCellState(row,col)){
          cell.addClass('life');
        }
        else {
          cell.addClass('dead');
        }
        cell.click(function(){
          if (!playGame){
            board.changeCellState(row,col);
          }
        })
        newRow.append(cell);
      });
      newTableElm.append(newRow);
    });
    tableElm.replaceWith(newTableElm);
    tableElm = newTableElm;
  }

  rebuild_board();

  window.setInterval(function(){
    if (playGame){
      board.updateBoard();
    }
  }, 1000);

  board.subscribe(rebuild_board);

}