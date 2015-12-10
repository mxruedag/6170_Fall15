var express = require('express');
var router = express.Router();

// Gets a string containing the current date
var getDateStr = function () {
  var date = new Date();
  var dateStr = date.toLocaleString("en-us", 
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return dateStr;
}

/* GET home page. */
router.get('/', function(req, res) {
  var dateStr = getDateStr();
  res.render('index', { date : dateStr });
});

module.exports = router;