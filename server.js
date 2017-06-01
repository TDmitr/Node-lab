'use strict';

global.api = {};
api.fs = require('fs');
api.http = require('http');
api.websocket = require('websocket');

const index = api.fs.readFileSync('./index.html');

// const server = api.http.createServer((req, res) => {
//   	res.writeHead(200);
//   	res.end(index);
// });
function css(request,response){
	if(request.url === '/style.css'){
		response.writeHead(200, {'Content-Type' : 'text/css'});
		var fileContents = fs.readFileSync('./style.css', {encoding: 'utf8'});
		response.write(fileContents);
	}
}

function html(request,response){
	if(request.url === '/index.html'){
		response.writeHead(200, {'Content-Type' : 'text/html'});
		var fileContents = fs.readFileSync('./index.html', {encoding: 'utf8'});
		response.write(fileContents);
	}
}

function bootstrap(request,response){
	if(request.url === '/bootstrap.js'){
		response.writeHead(200, {'Content-Type' : 'text/javascript'});
		var fileContents = fs.readFileSync('./bootstrap.js', {encoding: 'utf8'});
		response.write(fileContents);
	}
}


// var http = require('http');
// var url = require('url');
// var fs = require('fs');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

var server = http.createServer(function (req, res) {
	// css(req,res);
	// html(req,res);
	// bootstrap(req,res);
	// return res.end();

  // var q = url.parse(req.url, true);
  // var filename = "." + q.pathname;
  // fs.readFile(filename, function(err, data) {
  //   if (err) {
  //     res.writeHead(404, {'Content-Type': 'text/html'});
  //     return res.end("404 Not Found");
  //   }  
  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(data);
  //   return res.end();
  // });


  const parsedUrl = url.parse(req.url);
  let pathname = `.${parsedUrl.pathname}`;
  const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };
  fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }
    // if is a directory, then look for index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
    }
    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = path.parse(pathname).ext;
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });
}).listen(80);

server.listen(80, () => {
  console.log('Listen port 80');
});

const ws = new api.websocket.server({
  httpServer: server,
  autoAcceptConnections: false
});

const clients = [];

ws.on('request', (req) => {
  const connection = req.accept('', req.origin);
  clients.push(connection);
  console.log('Connected ' + connection.remoteAddress);
  connection.on('message', (message) => {
    const dataName = message.type + 'Data';
    const data = message[dataName];
    console.log('Received: ' + data);
    clients.forEach((client) => {
      if (connection !== client) {
        client.send(data);
      }
    });
  });
  connection.on('close', (reasonCode, description) => {
    console.log('Disconnected ' + connection.remoteAddress);
  });
});
