'use strict';

var express = require('express');
var router = express.Router();

var Debit = require('../models/debit');

//get objects from model, pass to app.js and frontend
router.get('/', function(req, res) {

  Debit.get(function(err, debits) {
    if(err) {
      res.status(400).send(err);
      return;
    } else {
    console.log(debits);
    res.send(debits);
    }
  })
})

//pass new trancaction to model, then recieve update and pass along
router.post('/', function(req, res) {
  var newDebit = req.body;

  Debit.create(newDebit, function(err) {
    if(err) {
      return res.status(400).send(err);
    } else {
      res.send();
    }
  })
});

//pass id to model, confirm delete to frontend
router.delete('/:id', function(req, res) {
  var id = req.params.id;

  Debit.delete(id, function(err) {
    if(err) {
      return res.status(400).send(err);
    } else{
      res.send();
    }
  });
});

module.exports = router;
