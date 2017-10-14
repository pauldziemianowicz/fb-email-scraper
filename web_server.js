require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket_io = require('socket.io');
var bearerToken = require('express-bearer-token');

var app = express();

var io = socket_io();
app.io = io;

io.on('connection', function(socket) {
  console.log('web_server socket connection', socket.id);
})

var FB_API = require('./routes/FB_API')(io);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('case sensitive routing', true);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bearerToken());
app.use(express.static(path.join(__dirname, 'public')));

// Client UI Routing
app.use("/", express.static(__dirname + "/public/index.html"));

// Server Routing
app.use('/FB-API', FB_API);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
