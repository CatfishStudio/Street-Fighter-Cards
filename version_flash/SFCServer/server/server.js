const hostname = 'localhost';
const port = 8080;

var http = require('http');
var nodeStatic = require('node-static');
var url = require('url'); 
var file = new nodeStatic.Server('.');

function onRequest(request, response)       // Получаем запрос
{
    file.serve(request, response);
}

function start(){
    http.createServer(onRequest).listen(port, hostname);
    //console.log('[SERVER]:', 'Server running on http://127.0.0.1:8080');
	console.log('[SERVER]:', 'Server running on http://localhost:8080');
}

exports.start = start;