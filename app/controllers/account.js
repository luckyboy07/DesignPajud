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
    .controller('subscriptionDetailCtrl', function($scope, $rootScope, $state, $stateParams, subscriptionFctry, analyticFctry) {
        $scope.totals = {};
        $scope.events = {};
        if ($stateParams.sr_id) {
            subscriptionFctry.getAccountDetails($stateParams.sr_id).then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    $rootScope.company = data.response.result;
                    console.log('asdasd', data.response);
                }

                analyticFctry.getAnalyticDetails($rootScope.company.gk_code, '2016-04-11', '2016-04-30').then(function(data) {
                    if (data.statusCode == 200 && data.response) {
                        $scope.totals = data.response.totalsForAllResults;
                        console.log('data', $scope.totals);

                        $scope.linedata = {
                            xkey: 'DayIndex',
                            ykeys: ['TotalEvents'],
                            labels: ['Total Events'],
                            lineColors: ['#3c8dbc'],
                            data: data.response.rows
                        };

                        console.log('analytics', $scope.linedata);

                    }
                });
                analyticFctry.getAnalyticEvents($rootScope.company.gk_code, '2016-04-11', '2016-04-30').then(function(data) {
                    if (data.statusCode == 200 && data.response) {
                        $scope.events = data.response.rowData.eventsCategory;
                        console.log('events', $scope.events);
                    }
                })
            });
        }
    });
