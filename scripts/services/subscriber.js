'use strict';

angular.module('myApp')
    .factory('subscriptionFctry', function(Restangular, API_URL) {
        return {
            getSubscriptionAccount: function() {
                return Restangular.all('subscriptionaccounts' ).customGET();
            }

        };

    })
