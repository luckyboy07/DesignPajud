'use strict';

angular.module('myApp')
    .controller('appoverviewCtrl', function($scope, $rootScope, localStorageService, $uibModal, $timeout, appoverview) {
        $scope.overviews = {};
        $scope.infos = {};
        $scope.gk_code = $rootScope.company.gk_code;

        $scope.dtFrom = new Date();
        var dateTo = new Date();
        $scope.dtTo = dateTo.setDate(dateTo.getDate() + 5);

        $scope.openDate = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/view/AppOverview/Overview/overview.modal.html',
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

                $scope.populateGraph($scope.startdate, $scope.enddate);
            });
        }
        $scope.populateGraph = function(startdate, enddate) {
            appoverview.getAppoverviewDetail($scope.gk_code, startdate, enddate).then(function(data) {
                if (data.statusCode == 200 && data.response) {
                    $scope.overviews = data.response.devicesOverviewData.rows;
                    $scope.infos = data.response.devicesInfoData;
                    console.log(' $scope.infos', $scope.infos);
                }

                var chartData = data.response.devicesOverviewData.rows;
                _.each(chartData, function(row) {
                    row.DayIndex = moment(row.DayIndex).format('YYYY-MM-DD');
                });

                $timeout(function() {
                    $scope.$apply(function() {
                        $scope.linedata = {
                            xkey: 'DayIndex',
                            ykeys: ['Sessions'],
                            labels: ['Sessions'],
                            lineColors: ['#3c8dbc'],
                            data: chartData
                        };
                    });
                    console.log('$scope.linedata:', $scope.linedata);
                }, 100);
            });
        }

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
