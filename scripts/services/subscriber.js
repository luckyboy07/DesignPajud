'use strict';

angular.module('myApp')
    .factory('subscriptionFctry', function(Restangular, API_URL) {
        return {
            getSubscriptionAccount: function() {
                return Restangular.all('/1.0/subscriptionaccounts' ).customGET();
            },
            getAccountDetails : function(sub_id){
            	return Restangular.all('/1.0/subscriptionaccounts/'+sub_id).customGET();

            }

        };

    })
