'use strict';

angular.module('myApp', [])
  .controller('mainCtrl', function($scope, $http) {

    //get stored credits and debits
    $http.get('/debits').then(function(res) {
      $scope.debitList = res.data;
    }, function(err) {
      console.log('ERR', err);
    })

    //find available balance to display at top of page
    $scope.total = function() {
      var sum = 0;

      $scope.debitList.forEach(function(obj) {
        sum += obj.credit || -obj.debit;
       })
      return sum;
    }

    //find sum of deposits, display at bottom of table
    $scope.creditTotal = function() {
      var sum = 0;
      $scope.debitList.forEach(function(obj) {
        sum += obj.credit || 0;
      })
      return sum;
    }

    //find sum of withdrawals, display at bottom of table
    $scope.debitTotal = function() {
      var sum = 0;
      $scope.debitList.forEach(function(obj) {
        sum += obj.debit || 0;
      })
      return sum;
    }

    //add new deposit, first add new credit key and remove amount key
    $scope.deposit = function() {
      $scope.newDebit.credit = $scope.newDebit.amount;
      delete $scope.newDebit.amount;
      var debit = angular.copy($scope.newDebit);

      $http.post('/debits', $scope.newDebit)
      .then(function(res){
        //if success, load to dom
        $scope.debitList.push(debit);
        $scope.newDebit = {};
      },
      function(err) {
        console.log('ERR', err);
      })


    }

    //add new withdrawal, first add new debit key and remove amount key
    $scope.withdrawal = function() {
      $scope.newDebit.debit = ($scope.newDebit.amount);
      delete $scope.newDebit.amount;
      var debit = angular.copy($scope.newDebit);

      $http.post('/debits', $scope.newDebit)
      .then(function(res){
        //if success, load to dom
        $scope.debitList.push(debit);
        $scope.newDebit = {};
      },
      function(err) {
        console.log('ERR', err);
      })

    }

    //delete item after adding
    $scope.deleteDebit = function (debit) {
      var id = debit.id;
      var index = this.$index;

      $http.delete(`/debits/${id}`)
      .then(function(res) {
        $scope.debitList = $scope.debitList.filter(function(obj){
          return obj.id !== id;
        })
      },
      function(err) {
        console.log('ERR', err);
      })

    }

  })
