/**
* Create a Node object
*/
var Node = function(value){

  // The node object to be returned
  var that = Object.create(Node.prototype);

  // The letter value represented by the node
  var letterValue = value;

  // The children nodes
  var children = [];

  // If the sequence of ancestors of the node plus itself form a valid word, the
  // word that is represented. Otherwise, undefined.
  var word;

  /**
  * Returns the letter value of the node
  */
  that.getLetterValue = function(){
    return letterValue;
  }

  /**
  * Returns the child with the corresponding letter value
  * @param the letter value wanted
  */
  that.getChildWithLetterValue = function(letter){
    // EXAMPLE USE OF FUNCTIONALS
    // Filtering only the children of the node that have the letterValue letter,
    // and then taking the first element in that array (which should be the only one)
    return children.filter(function(child){
      return child.getLetterValue() === letter;
    })[0];
  }

  /**
  * Inserts a substring of a suffix starting from i if not contained already
  * @param suffix the suffix to insert
  * @i the index form which to insert the suffix
  */
  that.insertSuffix = function(suffix, i){
    if (i === suffix.length){
      word = suffix;
      return;
    }
    if ( that.getChildWithLetterValue(suffix[i]) === undefined ){
      children.push(Node(suffix[i]));
    }
    that.getChildWithLetterValue(suffix[i]).insertSuffix(suffix, i+1);
  }

  /**
  * Gets all the words contained in the leaves of the subtree that has this node as its root
  */
  that.getWords = function(){
    var words = [];
    if (word !== undefined){
      words.push(word);
    }
    // EXAMPLE USE OF FUNCTIONALS
    // Concatenating the lists of words for each child in children
    words = children.reduce( function(x,y) {
      return x.concat(y.getWords());
    }, words );
    words.sort();
    return words;
  }

  /**
  * Gets all the words contained in the leaves of the subtree that has this node as its root
  * that begin with the prefix represented by each node, and are followed by the letters of
  * prefix from the i-th letter onwards. For example, if this node represents "arr", prefix
  * is "an", and i is 2, the function returns all the words that begin with "arran". 
  * @param prefix the prefix
  * @i the index
  */
  that.getWordsThatContainAfterNode = function(prefix, i){
    if (i === prefix.length){
      return that.getWords();
    }
    if (that.getChildWithLetterValue(prefix[i]) === undefined){
      return [];
    }
    return that.getChildWithLetterValue(prefix[i]).getWordsThatContainAfterNode(prefix, i+1);
  }

  Object.freeze(that);  

  return that;
}
