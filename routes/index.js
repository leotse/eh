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
	var query = req.query;
	var domain = query.domain;
	var source = query.source;
	var limit = query.limit;

	// query validation
	if(!domain || !source || !limit) { return res.render('error', { message: 'domain, source and limit are required' }); }

	// harvest emails
	var stream = harvest(domain, source, limit);

	// return results
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	stream.pipe(res);
}

// helper - execute py script
function harvest(domain, source, limit) {

	var script = path.join(__dirname, '../lib/theharvester/theHarvester.py');
	var process = spawn('python', [ '-u', script, '-d', domain, '-b', source, '-l', limit ]);

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