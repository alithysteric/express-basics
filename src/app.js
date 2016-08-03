'use strict';

var express = require('express'),
	posts   = require('./mock/posts.json');

var postLists = Object.keys(posts).map(function(value) {
	return posts[value];
});

var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res) {
	var path = req.path;
	res.locals.path = path
	res.render('index');
});

app.get('/blog/:title?', function(req, res) {
	var title = req.params.title;
	res.status(503);
	if(title === undefined){
		res.render('blog', { posts: postLists })
	}else{
		var post = posts[title] || {};
		res.render('post', { post: post});	
	}
	
});

app.listen(3000, function(){
	console.log("The frontend server is running on  port 3000");
}); 