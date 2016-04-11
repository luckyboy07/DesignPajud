'use strict';

angular.module('myApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('supplier', {
                url: '/supplier',
                templateUrl: 'app/view/supplier.html',

            })
            .state('analytic', {
                url: '/analytic',
                templateUrl: 'app/view/Analytic/analytics.html',
                controller: 'analyticCtrl'
            })
            .state('deploy', {
                url: '/deploy',
                templateUrl: 'app/view/Deploy/deploy.html',
            })
            .state('package', {
                url: '/package',
                templateUrl: 'app/view/Package/package.html',
            })
            .state ('user', {
                url: '/user',
                templateUrl: 'app/view/Users/user.html'
            })

        $urlRouterProvider.otherwise('/supplier');

    });
