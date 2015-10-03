/**
* Create a square board for Game of Life, in which edge coordinates are neighbor with the coordinates in the
* opposite edge
* @param boardSize the side length of the board
* @param liveCells a list of arrays [i,j] such that the cell in the cell in the i-th row, j-th column is alive,
*        and any other cell is dead
*/
var Board = function(boardSize, liveCells){
  
  var that = Object.create(Board.prototype);

  var sideLength = boardSize;

  // Populating the board, represented by a list of lists, such that each sublist represents a row, and each
  // element of a sublist is a boolean representing whether the cell is alive
  var board = [];
  from_to(0,sideLength-1,function(rowIndex){
    var newRow = [];
    from_to(0,sideLength-1,function(colIndex){
      newRow.push(false);
    });
    board.push(newRow);
  });
  liveCells.forEach(function(coords){
    board[coords[0]][coords[1]] = true;
  });

  // Offsets to determine neighbor cells
  var offsets = [-1,0,1];

  var subscribers = [];

  /*
  * Return the side length of the board
  **/
  that.getSideLength = function(){
    return sideLength;
  }

  /**
  * Subscribe a function to be called when the board is updated
  * @param subscriber the function to be subscribed
  */
  that.subscribe = function(subscriber) {
    subscribers.push(subscriber);
  }
  /**
  * Apply the changes of the subscriber functions
  */
  var publishChanges = function(){
    subscribers.forEach(function(x){ x(); });
  }

  /**
  * Return a boolean saying whether the cell is alive
  * @param rowIndex the row index of the cell
  * @param colIndex the column index of the cell
  */
  that.getCellState = function(rowIndex, colIndex){
    return board[rowIndex][colIndex];
  }

  /**
  * Change the state of a cell to the opposite
  * @param rowIndex the row index of the cell
  * @param colIndex the column index of the cell
  */
  that.changeCellState = function(rowIndex, colIndex){
    board[rowIndex][colIndex] = !(board[rowIndex][colIndex]);
    publishChanges();
  }

  /**
  * Return whether a cell would live after transitioning to a new state
  * @param state the current state of the cell
  * @param numLiveNeighbors the number of live neighbors of the cell
  */
  var willCellLive = function(state, numLiveNeighbors){
    if (state){
      return numLiveNeighbors === 2 || numLiveNeighbors === 3;
    }
    return numLiveNeighbors === 3;
  }

  /**
  * Return the next state of the cell
  * @param rowIndex the row index of the cell
  * @param colIndex the column index of the cell
  */
  var getNextCellState = function(rowIndex, colIndex){
    var neighborsCoordsList = []
    offsets.forEach(function(dy){
      offsets.forEach(function(dx){
        if (dy != 0 || dx != 0){
          neighborsCoordsList.push([ (rowIndex+dy+sideLength)%sideLength , (colIndex+dx+sideLength)%sideLength ]);
        }
      })
    });
    var numLiveNeighbors = neighborsCoordsList.filter(function(cellCoords){
      return board[cellCoords[0]][cellCoords[1]];
    }).length;

    return willCellLive(board[rowIndex][colIndex], numLiveNeighbors);
  }

  /** 
  * Returns a list of lists such that each sublist represents a row, and each element of the sublist 
  * represents the state of the cell that will be contained there after a transition to the next state
  */
  var getNextBoardState = function(){
    return board.map(function(row, y){
      return row.map(function(cell, x){
        return getNextCellState(y,x);
      });
    });
  }

  /**
  * Changes the state of all cells to be dead
  */
  var clearBoard = function(){
    from_to(0,sideLength-1,function(m){
      from_to(0,sideLength-1,function(n){
        board[m][n] = false;
      })
    })
  }

  /** 
  * Updates the board cells to the next state of the game
  */
  that.updateBoard = function(){
    getNextBoardState().forEach(function(row, y){
      row.forEach(function(cellState, x){
        board[y][x] = cellState;
      });
    });
    publishChanges();
  }

  /**
  * Changes the board configuration
  * @param liveCells a list of arrays [i,j] such that the cell in the cell in the i-th row, j-th column is alive,
  *        and any other cell is dead
  */
  that.changeBoardConfiguration = function(liveCellsCoords){
    clearBoard();
    liveCellsCoords.forEach(function(coords){
      board[coords[0]][coords[1]] = true;
    });
    publishChanges();
  }

  Object.freeze(that);
  return that;
}