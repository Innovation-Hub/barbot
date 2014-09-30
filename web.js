var fs = require('fs');
var async = require('async');

var bar = require('./pump-controller');
var mq3 = require('./mq3-controller');
var rgb = require('./rgbled-controller');

var port = 4242;
var express = require('express');
var app = express();
var server = require('http').createServer(app, { log: false });
app.use(express.json());
app.use(express.urlencoded());
app.use(express.compress());
app.use(express.static(__dirname + '/public'));

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
		}
	    });
    });

app.get('/api/recipes', function (req,res) {
	var re = [];
	
	recipes.forEach(function (r) {
		re.push({name: r.name, endpoint: '/api/' + r.api});
	    });
	res.send(re);
    });

server.listen(process.env.PORT || port);
console.log('server started on port ' + (process.env.PORT || port));

app.post('/api/purge', function()
{
	console.log('Entering purge');
	bar.purgeAll();
});

app.post('/api/emergency', function()
	{
		console.log('Entering Emergency Stop');
		bar.stopAll();
	});

app.get('/api/drunk', function(req,res)
{
    rgb.blinkColor({'r' : 1, 'g' : 0, 'b' : 0}, 500);
	mq3.getLowerValue(500, 4, function(avg_value)
    {
        console.log('[MQ3] Average: ' + avg_value);
        console.log(mq3.getValue());
        if (avg_value < 800)
        {
            // Green
            rgb.setRgbValueTimer({'r' : 0, 'g' : 1, 'b' : 0}, 3000, true);
        }
        else if(avg_value >= 800 && avg_value <= 1500)
        {
            // Green + Blue
            rgb.setRgbValueTimer({'r' : 0, 'g' : 0, 'b' : 1}, 3000, true);
        }
        else if (avg_value > 1500 && avg_value <= 2500)
        {
            // Green + Red
            rgb.setRgbValueTimer({'r' : 1, 'g' : 0, 'b' : 1}, 3000, true);
        }
        else if (avg_value > 2500)
        {
            // Red
            rgb.setRgbValueTimer({'r' : 1, 'g' : 0, 'b' : 0}, 3000, true);
        }
        res.send({'drunk' : avg_value});
    });
});
