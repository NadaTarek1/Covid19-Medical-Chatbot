var express = require('express');
var app = express();
var path = require('path');
// var io = require('socket.io').listen(server);
// io.set("origins", "*:*");

function noCache (req, res, next) {
  res.set({ 'Cache-Control': 'no-cache' });
  next();
}

app.use('/',noCache ,express.static(__dirname + '/dist'));

app.get('/*',noCache , function (req, res) {
	res.sendFile(path.join(__dirname + '/dist', 'index.html'))
});

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.listen(process.env.PORT || 3000, function () {
	console.log('Example listening on port 3000!');
});



const forceSSL = function () {
	return function (req, res, next) {
		if (req.headers['x-forwarded-proto'] !== 'https') {
			return res.redirect(
				['https://', req.get('Host'), req.url].join('')
			);
		}
		next();
	}
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());
module.exports = app;
