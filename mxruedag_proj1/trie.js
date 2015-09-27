/**
* Create a trie object
*/
var Trie = function(){

  var that = Object.create(Trie.prototype);

  // The root of the trie
  var root = Node();

  /**
  * Gets the words in the trie with the given prefix
  * @param prefix the prefix
  * @numWords the number of words to get
  */
  that.getWordsWithPrefix = function(prefix, numWords){
    return root.getWordsThatContainAfterNode(prefix, 0).slice(0,numWords);
  }

  /**
  * Inserts a word in the trie
  * @param word the word
  */
  that.insertWord = function(word){
    root.insertSuffix(word, 0);
  }

  Object.freeze(that);

  return that;

}