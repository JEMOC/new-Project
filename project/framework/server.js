var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyparser = require('body-parser');

var users = require('./routes/users');

server.listen(80);

app.use(express.static('www'));
app.use(bodyparser.urlencoded({extended:false}));
app.use('/users',users);

app.get('/users',function(req,res){
  console.log('get');
  res.send({hello:'world'});
});

app.post('/users',function(req,res){
  console.log('post');
  res.send('post ok');
});
