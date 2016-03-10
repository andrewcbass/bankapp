'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var debitsFile = path.join(__dirname, '../data/debits.json');

var Debit = {};

Debit.get = function(cb) {
  fs.readFile(debitsFile, function(err, data) {
    if(err) {
      cb(err);
      return;
    }

    var debits = JSON.parse(data);
    console.log(debits);
    cb(null, debits);
  });
};

Debit.write = function(debits, cb) {
  fs.writeFile(debitsFile, JSON.stringify(debits), cb);
};

Debit.create = function(newDebit, cb) {
  this.get((err, debits) => { //read and parse
    if(err) return cb(err);

    newDebit.id = uuid();  //unique tracking id
    debits.push(newDebit); //modify data

    this.write(debits, cb);  //stringify and write
  });
};

Debit.delete = function(id, cb) {
  this.get((err, debits) => {
    if(err) return cb(err);

    var debit = debits.find(function(obj) {
      return obj.id === id;
    });

  if(debit) {
    var index = debits.indexOf(debit);
    debits.splice(index, 1);
    this.write(debits, cb);
  } else {
    cb( {err:  "Charge not found."});
    return;
  }
  })
}

module.exports = Debit;
