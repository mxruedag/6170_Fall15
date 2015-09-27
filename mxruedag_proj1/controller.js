var CONTROLLER = (function(document) {

  // The <input type="text"> containing the search term.
  var searchTermInput;

  // The <ul> containing the possible autocompletions.
  var resultsList;

  // Function to be called on every keyup event
  var autocompleteListener;

  /**
   * Registers a listener function to be called after each keypress. 
   * The listener will be passed a single String word as an argument
   * when invoked.
   *
   * @param {Function} listener - The function to be called. Function
   *   must accept a single String as an argument.
   */
  function registerAutocompleteListener(listener) {
    autocompleteListener = listener;
  }

  /**
   * Appends a String value to the end of the search results list.
   *
   * @param {String} value - The text to append to the search list.
   */
  function appendToSearchResults(value) {
    resultsList.appendChild(createListElement(value, onResultClick));
  }

  /**
   * Removes all entries existing in the search results.
   */
  function clearSearchResults() {
    resultsList.innerHTML = '';
  }

  /**
   * Create an <li> that contains the given value and executes the given
   * handler when it is clicked.
   *
   * @param {String} value - The text to place inside the <li>.
   * @param {Function} onClick - The event handler to execute when the <li> is
   *  clicked.
   */
  function createListElement(value, onClick) {
    var li = document.createElement('li');
    li.innerHTML = value;
    li.addEventListener('click', onClick, false);
    return li;
  }

  /**
   * Handle the click of an autocompletion.
   *
   * @param {Object} event - The click event.
   */
  function onResultClick(event) {
    searchTermInput.value = event.target.innerHTML;
    clearSearchResults();
  }

  /**
   * Perform autocompletion each time a key is typed.
   */
  function onKeyUp() {
    clearSearchResults();
    // If there's a search term and a registered listener,
    // invoke the listener with the search term.
    var searchTerm = searchTermInput.value
    if (searchTerm.length > 0 && autocompleteListener != undefined) {
      autocompleteListener(searchTerm);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    searchTermInput = document.getElementById('search-term-input');
    resultsList = document.getElementById('results-list');
    searchTermInput.addEventListener('keyup', onKeyUp, false);
  });

  /** Public exports for CONTROLLER module **/
  return {
    "registerAutocompleteListener" : registerAutocompleteListener,
    "clearSearchResults" : clearSearchResults,
    "appendToSearchResults" : appendToSearchResults
  };

})(document);
