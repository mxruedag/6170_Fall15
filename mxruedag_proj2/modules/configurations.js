// Configurations specific for the current game

var BOARD_SIZE = 31;

// Preset board configurations
var presetConfigurationsNames = ["Dead", "Cross", "Pentadecathlon", "Glider"];
var presetConfigurations = {};
presetConfigurations["Cross"] = [];
from_to(0,BOARD_SIZE-1,function(n){
  presetConfigurations["Cross"].push([n,n]);
  presetConfigurations["Cross"].push([n,BOARD_SIZE-n-1]);
});
presetConfigurations["Dead"] = [];
presetConfigurations["Glider"] = [[1,3], [2,3], [3,3], [3,2], [2,1]];
presetConfigurations["Pentadecathlon"] = [[7,16], [8,16], [9,15], [9,16], [9,17], [12,15], [12,16], [12,17], [13,16], [14,16], [15,16], [16,16], [17,15], [17,16], [17,17], [20,15], [20,16], [20,17], [21,16], [22,16]];

// Game instructions
var instructions = "Welcome to the game of life. Red and green cells represent live and dead cells, respectively. Click on a cell while the game is paused -or not running- to change the color of a cell. Click on play to start the game of life with the current board configuration. Choose one of the preset configurations only while the game is paused or not yet running."