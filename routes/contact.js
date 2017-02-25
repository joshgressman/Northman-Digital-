var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/northman';

router.get('/', function(req, res) {
  // Retrieve task from database
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM contact_form', function (err, result) {
      done(); // we are done with our connection, let's close the connetion, I only have 10!
      // if we don't do done, nothing happens and it doesn't close the connection.

      if (err) {
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  });
});

router.post('/', function(req, res){
  //task objecct
  var contact = req.body;
  console.log('req', req.body);
  pg.connect(connectionString, function (err,client,done){
    if(err){
      res.sendStatus(500);
    }
    client.query('INSERT INTO contact_form (name, email, phone, message)'
    + 'VALUES($1, $2, $3, $4)',
     [contact.name, contact.email, contact.phone, contact.message],
      function(err, result){
        done();
        if(err){
          res.sendStatus(500);
        }
          res.sendStatus(201);
      });
  });
});

module.exports=router;
