var express = require('express');
var path = require('path');
var app = express();  // Module to control application life.
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use("/css", express.static(path.join(__dirname, '/css')));
app.use("/lib", express.static(path.join(__dirname, '/lib')));
app.use("/js", express.static(path.join(__dirname, '/js')));
app.use("/data", express.static(path.join(__dirname, '/data')));

/*
//var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
//require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;


// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 960, height: 660});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/indexs.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});*/

app.get('/', function(request, response) {
  response.sendfile('index.html', {root: __dirname});
});

app.get('/red', function(request, response) {
  response.send('<h1>red sent to game</h1>');
  io.emit('red');
});

app.get('/blue', function(request, response) {
  response.send('<h1>blue sent to game</h1>');
  io.emit('blue');
});

app.get('/yellow', function(request, response) {
  response.send('<h1>yellow sent to game</h1>');
  io.emit('yellow');
});

io.on('connection', function(socket) {
  console.log('new user connected');
})

http.listen(3000, function() {
  console.log('app running on port ' + 3000);
})

