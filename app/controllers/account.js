'use strict';

angular.module('myApp')
    .controller('subscriptionCtrl', function($scope, $state, subscriptionFctry) {
        $scope.accounts = [];
        subscriptionFctry.getSubscriptionAccount().then(function(data) {
            if (data.response.success) {
                $scope.accounts = data.response.result;
                console.log('data:', $scope.accounts);
            }

        });
        $scope.getAccountDetail = function(sr_id) {
            $state.go('app.analytic', { sr_id: sr_id });
        };
    })
    .controller('subscriptionDetailCtrl', function($scope, $state, $stateParams, subscriptionFctry) {
        $scope.company = {};

         if ($stateParams.sr_id) {
            subscriptionFctry.getAccountDetails($stateParams.sr_id).then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.company = data.response.result;
                    console.log('asdasd', data.response);
                }
            });
        }
    });
