'use strict';

angular.module('myApp');
	.factory('subscription', function subscription(Restangular,API_URL,API_VERSION){
		return {
			getSubscriptionAccount: function() {
                return Restangular.all('subscriptionaccounts').customGET();
            }

		};

	})