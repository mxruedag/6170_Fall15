QUnit.test("Board initialization and basic functions", function(assert) {
  var board = Board(5, []);
  assert.strictEqual(board.getSideLength(), 5, "Side length OK");
  assert.strictEqual(board.getCellState(0,3), false, "Get cell state when false OK");
  board.changeCellState(0,3);
  assert.strictEqual(board.getCellState(0,3), true, "Changed get cell state when changed cell state false to true");
  assert.strictEqual(0, 0, "Passed!");
  board.changeCellState(0,3);
  assert.strictEqual(board.getCellState(0,3), false, "Changed get cell state when changed cell state true to false");
  var otherBoard = Board(3, [[0,0]]);
  assert.strictEqual(otherBoard.getCellState(0,0), true, "Board with alive values config. intialized correct");
  from_to(0,2,function(row){
    from_to(0,2,function(col){
      if (!(row == 0 && col == 0)){
        assert.strictEqual(otherBoard.getCellState(row,col), false, "Board with alive values config. intialized correct");
      }
    });
  });
});

QUnit.test("Changing board to a given configuration", function(assert) {
  var board = Board(5, []);
  board.changeBoardConfiguration([[0,0], [0,1], [0,2], [0,3], [0,4]]);
  from_to(0,4,function(col){
    assert.strictEqual(board.getCellState(0,col), true, "Cell configured to alive has true state");
  });
  from_to(1,4,function(row){
    from_to(0,4,function(col){
      assert.strictEqual(board.getCellState(row,col), false, "Cell configured to dead has false state");
    });
  });
});

QUnit.test("Transfer board from one state to another", function(assert) {
  var squareConfig = [[1,1], [1,2], [2,1], [2,2]];
  var staticBoard = Board(5, squareConfig);
  staticBoard.updateBoard();
  from_to(0,4,function(row){
    from_to(0,4,function(col){
      if (row === 1 || row === 2){
        assert.strictEqual(staticBoard.getCellState(row,col), col === 1 || col === 2, "2x2 square stayed the same");
      } 
      else {
        assert.strictEqual(staticBoard.getCellState(row,col), false, "2x2 square stayed the same");
      }
    });
  });
  var threeCellsConfig = [[2,1], [2,2], [2,3]];
  var threeCellsBoard = Board(7,threeCellsConfig);
  threeCellsBoard.updateBoard();
  from_to(0,6,function(row){
    from_to(0,6,function(col){
      if (col === 2){
        assert.strictEqual(threeCellsBoard.getCellState(row,col), row === 1 || row === 2 || row === 3, "Three cells in line worked");
      }
      else {
        assert.strictEqual(threeCellsBoard.getCellState(row,col), false, "Three cells in line worked");
      }
    });
  });
  threeCellsBoard.updateBoard();
  from_to(0,6,function(row){
    from_to(0,6,function(col){
      if (row === 2){
        assert.strictEqual(threeCellsBoard.getCellState(row,col), col === 1 || col === 2 || col === 3, "Three cells in line worked");
      }
      else {
        assert.strictEqual(threeCellsBoard.getCellState(row,col), false, "Three cells in line worked");
      }
    });
  });
});