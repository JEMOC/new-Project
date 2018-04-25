var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost/';


router.get('/isexist',function(req,res){
  MongoClient.connect(url,function(err,client){
    if(err){
      throw err;
    }else{
      const db = client.db('CC');
      const users = db.collection('users');
      users.find({user:req.query.user}).toArray(function(err,result){
        console.log(result);
        console.log(result.length);
        if(err){
          throw err;
        }else{
          if(result.length == 1){
            res.send({result:'exist'});
          }else{
            res.send({result:'no'});
          }
        }
      });
    }
    client.close();
  });
})


router.post('/login',function (req,res) {
    var query = {
      user:req.body.user,
      password:req.body.password
    };
    MongoClient.connect(url,function (err,client) {
      if(err){
          throw err;
      }else{
        const db = client.db('CC');
        const users = db.collection('users');
        users.find(query).toArray(function(err,result){
          if(err){
            throw err;
          }else{
            if(result.length){
              console.log('login success');
              res.cookie('user',req.body.user);
              res.redirect('http://localhost');
            }else{
              console.log('login failed');
            }
          }
        });
      }
      client.close();
    });
})

router.post('/register',function (req,res) {
  var query = {
    user:req.body.user,
    password:req.body.password
  };
  MongoClient.connect(url,function(err,client){
    console.log('mongo connect success');
    if(err){
      throw err;
    }else{
      const db = client.db('CC');
      const users = db.collection('users');
      users.find(query).toArray(function(err,result){
        if(err){
          throw err;
        }else{
          if(result.length !== 0){
            console.log('This user already exists!');
          }else{
            users.insert(query);
            console.log('register success');
          }
        }
        client.close();
      });
    }

  });
})

module.exports= router;
