var fs = require('fs');
var async = require('async');

// Load the native controller to manipule pumps
var bar = require('./pump-controller');

var port = 4242;
var express = require('express');
var app = express();
var server = require('http').createServer(app, { log: false })
app.use(express.json());
app.use(express.urlencoded());
app.use(express.compress());
app.use(express.static(__dirname + '/public'));

// in-memory "database"
var recipes = [];

// just a little helper with string manipulation
String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};

// we execute in serie all parts of the recipe
// we only need to ask to the pump to drain some liquids
var prepareDrink = function(ingredients, cb) {
    async.eachSeries(ingredients, function (i, cb) {
	    bar.drainIndex(i.index, i.time, function () {
		    cb(null);
		});
	}, function (err, res) {
	    cb(err);
	});
};

// we read all recipes inside the ./recipes directory to load them
// in the in-memory "database" and prepare a POST query to be able to
// create cocktail "on demand"
fs.readdir('./recipes/', function (err, files) {
	files.forEach(function (f) {
		if (f.endsWith('.json')) {
		    fs.readFile('./recipes/' + f,  function (err, data) {
			    if (err) {
				console.log('Error: ' + err);
				process.exit();
			    } else {
				var r = JSON.parse(data);
				recipes.push(r);
				console.log('cocktail ' + r.name + ' added');
				// here we create a post query for each recipes
				app.post('/api/' + r.api, function (req, res) {
					prepareDrink(r.ingredients, function (err) {
						res.send('ok');
					    });
				    });
			    }
			});
		};
	    });
    });

// when users call the GET /api/recipes url, we return the list of all recipes
app.get('/api/recipes', function (req,res) {
	var re = [];
	
	recipes.forEach(function (r) {
		re.push({name: r.name, endpoint: '/api/' + r.api});
	    });
	res.send(re);
    });

server.listen(process.env.PORT || port);
console.log('server started on port ' + (process.env.PORT || port));
