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
             });

        $urlRouterProvider.otherwise('/supplier');

    });
