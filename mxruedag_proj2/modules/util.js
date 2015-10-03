// Utility functions
/**
* Executes a function that takes a parameter i, with all the numbers between x and y -inclusive-, given x and y
* @param from the first number to execute the function with
* @param to the last number to execute the function with
* @param f the function to execute
*/
var from_to = function (from, to, f) {
  if (from > to) return;
  f(from); from_to(from+1, to, f);
  }