QUnit.test( "No words inserted in trie", function( assert ){
  var emptyTrie = Trie();
  assert.strictEqual(emptyTrie.getWordsWithPrefix("hello").length, 0);
});

QUnit.test( "No words with given prefix" , function(assert){
  var myTrie = Trie();
  myTrie.insertWord("hello");
  myTrie.insertWord("hall");
  myTrie.insertWord("good");
  assert.strictEqual(myTrie.getWordsWithPrefix("ho", 10).length, 0);
})  

QUnit.test( "Get the number of words desired in alphabetical order", function(assert){
  var myTrie = Trie();
  myTrie.insertWord("ball");
  myTrie.insertWord("ban");
  myTrie.insertWord("band");
  myTrie.insertWord("bear");
  myTrie.insertWord("become");
  myTrie.insertWord("bin");
  myTrie.insertWord("blast");
  myTrie.insertWord("bloom");
  myTrie.insertWord("bomb");
  myTrie.insertWord("bored");
  myTrie.insertWord("bold");
  assert.strictEqual(myTrie.getWordsWithPrefix("b",10)[0], "ball");
  assert.strictEqual(myTrie.getWordsWithPrefix("b",10)[1], "ban");
  assert.strictEqual(myTrie.getWordsWithPrefix("b",10)[2], "band");
  assert.strictEqual(myTrie.getWordsWithPrefix("b",10)[3], "bear");
  assert.strictEqual(myTrie.getWordsWithPrefix("b",10)[4], "become");
  assert.strictEqual(myTrie.getWordsWithPrefix("b",10)[5], "bin");
  assert.strictEqual(myTrie.getWordsWithPrefix("b",10)[6], "blast");
  assert.strictEqual(myTrie.getWordsWithPrefix("b",10)[7], "bloom");
  assert.strictEqual(myTrie.getWordsWithPrefix("b",10)[8], "bold");
  assert.strictEqual(myTrie.getWordsWithPrefix("b",10)[9], "bomb");
  assert.strictEqual(myTrie.getWordsWithPrefix("b",10).length, 10);
  assert.equal(myTrie.getWordsWithPrefix("bo")[0], "bold");
});

QUnit.test( "Get a word inserted more than once only once", function(assert){
  var myTrie = Trie();
  myTrie.insertWord("ball");
  myTrie.insertWord("ball");
  myTrie.insertWord("ball");
  myTrie.insertWord("ball");
  myTrie.insertWord("band");
  assert.strictEqual(myTrie.getWordsWithPrefix("ba").length, 2);
});

QUnit.test("Empty string prefix", function(assert){
  var myTrie = Trie();
  myTrie.insertWord("band");
  myTrie.insertWord("hello")
  assert.strictEqual(myTrie.getWordsWithPrefix("").length, 2);
  assert.strictEqual(myTrie.getWordsWithPrefix("")[0], "band");
  assert.strictEqual(myTrie.getWordsWithPrefix("")[1], "hello");
});
