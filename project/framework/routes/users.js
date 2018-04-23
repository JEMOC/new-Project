var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost/';



router.post('/login',function (req,res) {
  console.log(req.body);
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
            if(result.length == 1){
              console.log('login success');
            }else{
              console.log('login failed');
            }
          }s
        });
      }
    });
    mon
})

router.post('/register',function () {

})

module.exports= router;
