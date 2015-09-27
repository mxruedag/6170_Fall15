/**
* PROBLEM 1
* Write a function inc that takes a numeric argument x and returns the value x + 1. Don't worry
* about what happens if it's given a non-numeric argument; we will not test that case. The same
* guarantee of well-behaved arguments applies to all of items 1 through 6; it does not, however,
* apply to items 7 through 9.
*/
function inc(x){
	return x+1;
}

/**
* PROBLEM 2
* Write a function counter that takes no arguments. On its first invocation it returns 1; on its
* second invocation it returns 2; and in general on its nth invocation it returns n.
*/
counter = Counter();

/**
* PROBLEM 3
* Write a function 'Inc' (note the capital I!) that takes a numeric argument x and returns a
* function that increments by x. That is, the expression Inc(1) would evaluate to a function that
* behaves like inc.
*/
function Inc(x){
	return function(a){
		return a+x
	}
}

/**
* PROBLEM 4
* Write a function Counter that takes no arguments, and each time it is called, returns a function
* that operates like the function counter. If Counter is called twice, the two functions returned
* should be independent of one another, each producing its own series of values unaffected by calls
* to the other.
*/
function Counter(){
	var count = 0;
	return function(){
		count += 1;
		return count;
	}
}

/**
* PROBLEM 5
* Write a function CounterFrom that takes a single numeric argument x and returns a function that
* takes no arguments, and acts as a counter starting from x. That is, on its first invocation, the
* result function returns x + 1, on its second invocation, the result function returns x + 2; and
* so on. If CounterFrom is called twice, the two functions returned should be independent of one
* another, each producing its own series of values unaffected by calls to the other.
*/
function CounterFrom(x){
	var count = x;
	return function() {
		count += 1;
		return count;
	}
}

/**
* PROBLEM 6
* Write a function makeArray that takes two numeric arguments n (n is a non-negative integer) and
* v, and returns an array of length n, every element of which contains the value v.
*/
function makeArray(n,v){
	var myArray = [];
	for (var i = 0; i < n; i++){
		myArray[i] = v;
	}
	return myArray;
}

/**
* PROBLEM 7
* Write a function carefulMakeArray that also takes two numeric arguments n and v, and returns an
* array. Your function must check whether n is a non-negative number. If n is a non-negative
* number, then carefulMakeArray operates like makeArray. If n is a negative number, then
* carefulMakeArray throws an exception object, whose name is "BadSize" and whose message is
* "Negative size". If n is not a number, then carefulMakeArray throws an exception object, whose
* name is "BadSize" and whose message is "Size is not a number". If n is a non-negative number,
* you do not have to ensure that it is a non-negative integer, we will ensure that.
*/
function carefulMakeArray(n,v){
	if (typeof(n) === "number"){
		if (n >= 0) {
			return makeArray(n,v);
		}
		else{
			throw {name: "BadSize", message: "Negative size"};
		}
	}
	else{
		throw {name: "BadSize", message: "Size is not a number"};
	}
}

/**
* PROBLEM 8
* Write a function called incArray that takes a numeric argument n and returns an array of
* functions of length n. Each element of the array is a function like the ones produced by Inc,
* where the argument to Inc is its position in the array. Use the same checking and
* exception-throwing behavior as was specified above for carefulMakeArray.
*/
function incArray(n){
	if (typeof(n) == "number"){
		if (n >= 0){
			var myArray = [];
			for (var i = 0; i < n; i++){
				myArray[i] = Inc(i);
			}
			return myArray;
		}
		else{
			throw {name: "BadSize", message: "Negative size"};
		}
	}
	else{
		throw {name: "BadSize", message: "Size is not a number"};
	}
}

/**
* PROBLEM 9
* Write a function called counterFromArray that takes a numeric argument n and returns an array of
* functions of length n. Each element of the array is a function like the functions produced by
* CounterFrom. Each index i of the result array contains CounterFrom(i). Use the same checking and
* exception-throwing behavior as was specified above for carefulMakeArray.
*/
function counterFromArray(n){
	if (typeof(n) == "number"){
		if (n >= 0){
			var myArray = [];
			for (var i = 0; i < n; i++){
				myArray[i] = CounterFrom(i);
			}
			return myArray;
		}
		else{
			throw {name: "BadSize", message: "Negative size"};
		}
	}
	else{
		throw {name: "BadSize", message: "Size is not a number"};
	}
}
