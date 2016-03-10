'use strict';

var express = require('express');
var router = express.Router();

var Debit = require('../models/debit');

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
