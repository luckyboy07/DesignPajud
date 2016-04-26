'use strict';

angular.module('myApp')
    .factory('subscriptionFctry', function(Restangular, API_URL,localStorageService) {
        return {
            getSubscriptionAccount: function() {
                return Restangular.all('/1.0/subscriptionaccounts' ).customGET();
            },
            getAccountDetails : function(sub_id){
            	return Restangular.all('/1.0/subscriptionaccounts/'+sub_id).customGET();
            },
            getCurrentCompany : function(){
              var currentCompany = localStorageService.get('currentCompany');
              if(currentCompany){
                currentCompany = JSON.parse(currentCompany);
              }
              return currentCompany;
            },
            setCurrentCompany: function(company){
              localStorageService.set('currentCompany',JSON.stringify(company));
            }
        };

    })
