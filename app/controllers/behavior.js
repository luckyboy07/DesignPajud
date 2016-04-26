'user strict';

angular.module('myApp')
    .controller('behaviorCtrl', function($scope, localStorageService, $timeout, analyticBehaviorCtrl) {
       $scope.pages = {};

        var currentCompany = localStorageService.get('currentCompany');
        currentCompany = JSON.parse(currentCompany);
        $scope.gk_code = currentCompany.gk_code;
        console.log('currentCompany: ', $scope.gk_code);
        analyticBehaviorCtrl.getBehaviorDetails($scope.gk_code, '2016-04-11', '2016-04-30').then(function(data) {
            if (data.statusCode == 200 && data.response) {
            	console.log('events:', data.response.rowData.pagesData);
            	$scope.pages =  data.response.rowData.pagesData;
                var chartData = data.response.rowData.pagesOverviewData.rows;
                 console.log('chartData:',chartData);
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


        })
    });
