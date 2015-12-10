// Packaged helper methods.

var helpers = (function() {

	var _helpers = {};

	/**
	* Convert an HTML form into a set of key-value pairs
	* @param form the HTML form
	*/
	_helpers.getFormData = function(form) {
		var inputs = {};
		$(form).serializeArray().forEach(function(item) {
			inputs[item.name] = item.value;
		});
		return inputs;
	};

	/*
    Apply a function to each key of the object
  */
  _helpers.forEachKey = function(obj, fn) {
    Object.keys(obj).forEach(function(key) {
      if (obj.hasOwnProperty(key)) {
        fn(key);
      }
    });
  };

	Object.freeze(_helpers);
	return _helpers;

})();
