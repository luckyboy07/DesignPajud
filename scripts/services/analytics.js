'use strict';

angular.module('myApp')
    .factory('analyticFctry', function(Restangular, API_URL, API_VERSION) {
        return {
            getAnalyticDetails: function(code,firstdate,enddate) {
                return Restangular.all(API_VERSION + '/behavior/overview?ids=' + code + '&start-date='+firstdate +'&end-date='+ enddate) .customGET();

            },
            getAnalyticEvents: function(code,firstdate,enddate){
            	return Restangular.all(API_VERSION + '/behavior/events?ids=' + code + '&start-date='+firstdate +'&end-date='+ enddate) .customGET();
            }

        };

    })
