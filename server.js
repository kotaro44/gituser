'use strict';

// Require express and create an instance of it
var express = require('express');
var app = express();
var path = require('path');
var isMin = false;
var port = 80;

process.argv.forEach(function forEachArg(val) {
  if (val === '--min') {
    console.log('Started in Min Mode');
  	isMin = true;
  }
});

app.get('/', function mainPage(req, res) {
  res.sendFile(path.join(__dirname + (isMin ? '/dist/index.html' : '/index.html')));
});

if (isMin) {
  app.use('/public', express.static(path.join(__dirname, 'dist/public')));
}
else {
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
}

app.get('/user/:userName', function notfound(req, res) {
  res.redirect('/#!/user/' + req.params.userName);
});

app.get('/user/:userName/:projectName', function notfound(req, res) {
  res.redirect('/#!/user/' + req.params.userName + '/' + req.params.projectName);
});

// Change the 404 message modifing the middleware
app.use(function notfound(req, res) {
  res.status(404).send('Sorry, that route doesn\'t exist. =\'(');
});

// start the server in the corresponding port!
app.listen(port, function listen() {
  console.log('App is Running in port ' + port);
});
