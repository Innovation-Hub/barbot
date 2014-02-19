var fs = require('fs');
var async = require('async');

var bar = require('./pump-controller');

var port = 4242;
var express = require('express');
var app = express();
var server = require('http').createServer(app, { log: false })
app.use(express.json());
app.use(express.urlencoded());
app.use(express.compress());

var recipes = [];

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};

var prepareDrink = function(ingredients, cb) {
    async.eachSeries(ingredients, function (i, cb) {
	    bar.drainIndex(i.index, i.time, function () {
		    cb(null);
		});
	}, function (err, res) {
	    cb(err);
	});
};

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

app.get('/api/recipes', function (req,res) {
	var re = [];
	
	recipes.forEach(function (r) {
		console.log(r);
		re.push({name: r.name, endpoint: '/api/' + r.api});
	    });
	res.send(re);
    });

server.listen(process.env.PORT || port);
console.log('server started on port ' + (process.env.PORT || port));