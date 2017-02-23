var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/react-dist'));

app.get('/*', function(req,res){
res.sendFile(path.join(__dirname,'react-dist/index.html'));

});

var server = app.listen(process.env.port || 3000, function(){
  var port = server.address().port;
  console.log("listening on port 3000");

});

// npm start
