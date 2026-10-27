const http = require('http');
const fs = require('fs');
const path = require('path');
const files = {'/': ['index.html','text/html; charset=utf-8'], '/style.css':['style.css','text/css; charset=utf-8'], '/app.js':['app.js','application/javascript; charset=utf-8']};
http.createServer((req,res)=>{let route;try{route=new URL(req.url,'http://localhost').pathname}catch{res.writeHead(400);return res.end('Bad request')}const item=files[route];if(!item){res.writeHead(404);return res.end('Not found')}fs.readFile(path.join(__dirname,item[0]),(err,data)=>{if(err){res.writeHead(500);return res.end('Error reading file')}res.writeHead(200,{'Content-Type':item[1],'Cache-Control':'no-store'});res.end(data)})}).listen(3000,'127.0.0.1',()=>console.log('MyStudio is running: http://localhost:3000\nKeep this window open. Press Ctrl+C to stop.'));
