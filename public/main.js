'use strict';

angular.module('myApp', [])
  .controller('mainCtrl', function($scope, $http) {

    //get stored credits and debits
    $http.get('/debits').then(function(res) {
      $scope.debitList = res.data;
    }, function(err) {
      console.log('ERR', err);
    })

    $scope.total = function() {
      var sum = 0;

      $scope.debitList.forEach(function(obj) {
        sum += obj.credit || -obj.debit;
       })
      return sum;
    }

    $scope.creditTotal = function() {
      var sum = 0;
      $scope.debitList.forEach(function(obj) {
        sum += obj.credit || 0;
      })
      return sum;
    }

    $scope.debitTotal = function() {
      var sum = 0;
      $scope.debitList.forEach(function(obj) {
        sum += obj.debit || 0;
      })
      return sum;
    }

    //add new debit
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
