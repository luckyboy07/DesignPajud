'use strict';

angular.module('myApp')
    .controller('subscriptionCtrl', function($scope, $rootScope, $state, subscriptionFctry) {
        $scope.accounts = [];
        subscriptionFctry.getSubscriptionAccount().then(function(data) {
            if (data.response.success) {
                $scope.accounts = data.response.result;
                console.log('data:', $scope.accounts);
            }

        });

        $scope.getAccountDetail = function(sr_id) {
            subscriptionFctry.getAccountDetails(sr_id).then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    $rootScope.company = data.response.result;
                    subscriptionFctry.setCurrentCompany(data.response.result);
                    $state.go('app.dashboard');
                }
            });
        };

    })
    .controller('subscriptionDetailCtrl', function($timeout, $scope, $rootScope, $state, $stateParams, $uibModal, localStorageService, subscriptionFctry, analyticFctry) {
        $scope.totals = {};
        $scope.events = {};
        $scope.linedata = {};

        $scope.dtFrom = new Date();
        var dateTo = new Date();
        $scope.dtTo = dateTo.setDate(dateTo.getDate() + 5);

        $scope.openDate = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/view/Behavior/Overview/Overview.modal.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm',
                resolve: {
                    analyticsDate: function() {
                        return {
                            dateFrom: $scope.dtFrom,
                            dateTo: $scope.dtTo
                        };
                    }
                }
            });

            modalInstance.result.then(function(result) {
                $scope.dtFrom = result.dateFrom;
                $scope.dtTo = result.dateTo;
                console.log('date:', $scope.dtFrom);
                var fromDate = $scope.dtFrom;
                _.sortBy(fromDate, function(value) {
                    return new Date(value);


                })
                $scope.startdate = moment($scope.dtFrom).format('YYYY-MM-DD');
                $scope.enddate = moment($scope.dtTo).format('YYYY-MM-DD');
                console.log('startdate:', $scope.startdate);
                console.log('enddate:', $scope.enddate);

                $scope.populateGraph($scope.startdate,$scope.enddate);
            });
        };

        $scope.populateGraph = function(startdate, enddate) {
            var currentCompany = localStorageService.get('currentCompany');
            currentCompany = JSON.parse(currentCompany);
            if (currentCompany) {
                analyticFctry.getAnalyticDetails(currentCompany.gk_code, startdate, enddate).then(function(data) {
                    if (data.statusCode == 200 && data.response) {
                        $scope.totals = data.response.totalsForAllResults;
                        $scope.totals.eventsPerSession = _.floor($scope.totals.eventsPerSession, 2);
                        console.log('$scope.totals:', $scope.totals);
                        var chartData = data.response.rows;

                        _.each(chartData, function(row) {
                            row.DayIndex = moment(row.DayIndex).format('YYYY-MM-DD');
                        });

                        $timeout(function() {
                            $scope.$apply(function() {
                                $scope.linedata = {
                                    xkey: 'DayIndex',
                                    ykeys: ['TotalEvents'],
                                    labels: ['Total Events'],
                                    lineColors: ['#3c8dbc'],
                                    data: chartData
                                };

                                console.log('data', $scope.linedata);
                            });
                        }, 100);

                    }
                });
                analyticFctry.getAnalyticEvents(currentCompany.gk_code, startdate, enddate).then(function(data) {
                    if (data.statusCode == 200 && data.response) {
                        $scope.events = data.response.rowData.eventsCategory;
                        // console.log('events', $scope.events);
                    }
                });
            }
        }

        // $scope.populateGraph($scope.dtFrom,$scope.enddate);
    })
    .controller('ModalInstanceCtrl', function($scope, $uibModalInstance, analyticsDate) {

        $scope.dtFrom = new Date(analyticsDate.dateFrom);
        $scope.dtTo = new Date(analyticsDate.dateTo);

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(3000, 12, 31),
            minDate: new Date(1800, 1, 1),
            startingDay: 1
        };

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        $scope.openFrom = function() {
            $scope.popup1.opened = true;
        };

        $scope.openTo = function() {
            $scope.popup2.opened = true;
        };

        $scope.save = function() {
            $uibModalInstance.close({
                dateFrom: $scope.dtFrom,
                dateTo: $scope.dtTo
            });
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });
