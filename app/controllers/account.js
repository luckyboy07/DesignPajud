'use strict';

angular.module('myApp')
    .controller('subscriptionCtrl', function($scope, $state, subscriptionFctry) {
        $scope.accounts = [];
        subscriptionFctry.getSubscriptionAccount().then(function(data) {
            if (data.response.success) {
                $scope.accounts = data.response.result;
                console.log('data:',$scope.accounts);
            }

        });
         $scope.getAccountDetail = function(sr_id) {
            $state.go('app.analytic', { sr_id: sr_id });
        };
    });
