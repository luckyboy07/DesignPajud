'use strict';

angular.module('myApp')
    .factory('subscriptionFctry', function(Restangular, API_URL) {
        return {
            getSubscriptionAccount: function() {
                return Restangular.all('subscriptionaccounts' ).customGET();
            },
            getAccountDetails : function(sr_id){
            	return Restangular.all('subscriptionaccounts').customGET(sr_id);

            }

        };

    })
