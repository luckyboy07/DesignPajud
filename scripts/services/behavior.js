'use strict';

angular.module('myApp')
    .factory('analyticBehaviorCtrl', function(Restangular, API_URL, API_VERSION) {
        return {
            getBehaviorDetails: function(code,firstdate,enddate) {
                return Restangular.all(API_VERSION + '/behavior/pages?ids=' + code + '&start-date='+firstdate +'&end-date='+ enddate) .customGET();

            }
            // getAnalyticEvents: function(code,firstdate,enddate){
            // 	return Restangular.all(API_VERSION + '/behavior/pages?ids=' + code + '&start-date='+firstdate +'&end-date='+ enddate) .customGET();
            // }

        };

    })
