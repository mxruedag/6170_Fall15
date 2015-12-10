// Register a re-usable fragment of HTML called a "partial" which
// may be inserted somewhere in the DOM using a function
// call instead of manual insertion of an HTML String.
Handlebars.registerPartial('tweet', Handlebars.templates['tweet']);
// Handlebars.registerPartial('feed', Handlebars.templates['feed']);

// Global variable set when a user is logged in.
currentUser = undefined;

/**
* Load a page
* @template the template for the page
* @data the data to fill in the template with
*/
var loadPage = function(template, data) {
	data = data || {};
	$('#main-container').html(Handlebars.templates[template](data));
};

/**
* Load the home page of the Fritter application
*/
var loadHomePage = function() {
	if (currentUser) {
		loadTweetsPage();
	} else {
		loadPage('index');
	}
};

/**
* Load the tweets page of the Fritter application
*/
var loadTweetsPage = function() {
	$.get('/tweets', function(response) {
		loadPage('tweets', { tweets: response.content.tweets, currentUser: currentUser });
	});
};

var loadFeedPage = function() {
	console.log("Load feed page");
	$.get('/tweets/feed', function(response) {
		loadPage('feed', { tweets: response.content.tweets, currentUser: currentUser });
	});
}

$(document).ready(function() {
	$.get('/users/current', function(response) {
		if (response.content.loggedIn) {
			currentUser = response.content.user;
		}
		loadHomePage();
	});
});

$(document).on('click', '#home-link', function(evt) {
	evt.preventDefault();
	loadHomePage();
});

$(document).on('click', '#signin-btn', function(evt) {
	loadPage('signin');
});

$(document).on('click', '#register-btn', function(evt) {
	loadPage('register');
});

