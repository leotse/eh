/////////////////////
// routes/index.js //
/////////////////////

// main server routes

// libs
var path = require('path');
var util = require('util');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

// route - home page
exports.index = function(req, res){
	res.render('index', { title: 'EH :: Home' });
};

// route - start search
exports.search = function(req, res) {
	var query = req.query.query;

	// query validation
	if(!query) { return res.render('error', { message: 'query is required' }); }

	// harvest emails
	var stream = harvest(query);

	// return results
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	stream.pipe(res);
}

// helper - execute py script
function harvest(domain) {

	var script = path.join(__dirname, '../lib/theharvester/theHarvester.py');
	var process = spawn('python', [ '-u', script, '-d', domain, '-l', '500', '-b', 'bing' ]);

	// // debug messages
	// process.stdout.on('data', function(d) {
	// 	console.log('dat: %s', d);
	// });

	// process.stderr.on('data', function(d) {
	// 	console.log('err: %s', d);
	// });

	// process.on('close', function(code) {
	// 	console.log('closed');
	// 	console.log(arguments);
	// });

	return process.stdout;
}