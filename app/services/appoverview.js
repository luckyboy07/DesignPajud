'use strict';

angular.module('myApp')
    .factory('appoverview', function(Restangular, API_URL, API_VERSION) {
        return {
            getAppoverviewDetail: function(code,startdate,enddate) {
             	return Restangular.all(API_VERSION + '/app/overview?ids=' + code + '&start-date=' + startdate + '&end-date=' + enddate).customGET();
            }
        }



    })
