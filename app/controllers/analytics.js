'use strict';

angular.module('myApp')
    .controller('analyticsCtrl', function($scope, $state, analyticFctry) {
        $scope.datas = [];

        analyticFctry.getAnalyticDatas().then(function(resp){

            if(resp.statusCode == 200 && resp.response.success){
                $scope.datas = resp.response.success;
                console.log('data',$scope.datas);
            }
        })
    });
    