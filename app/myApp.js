'use strict';

angular.module('myApp', ['ui.router', 'angular.morris-chart', 'restangular', 'angularMoment', 'ui.bootstrap', 'LocalStorageModule'])
    .constant('API_URL', 'http://192.168.2.243:3000')
    .constant('API_VERSION', '/analytics/1.0')
    .config(function($provide, $stateProvider, $urlRouterProvider, API_URL, API_VERSION, RestangularProvider) {
        $provide.value('baseURL', API_URL);
        RestangularProvider.setBaseUrl(API_URL);

        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'app/view/main.html'

            })
            .state('main.accountlist', {
                url: '/accountlist',
                views: {
                    'appView': {
                        templateUrl: 'app/view/accountlist.html',
                        controller: 'subscriptionCtrl'
                    }
                }
            })
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/view/app.html',
                controller: 'analyticsCtrl'

            })
            .state('app.analytic', {
                url: '/analytic',
                views: {
                    'appView': {
                        templateUrl: 'app/view/analytic/analytic.html',
                        controller: 'subscriptionDetailCtrl'
                    }
                }


            })
            .state('app.overview', {
                url: '/overview',
                views: {
                    'appView': {
                        templateUrl: 'app/view/AppOverview/appoverview.html',
                        controller: 'subscriptionDetailCtrl'
                    }
                },
                parent: 'app'

            })
            .state('app.behavior', {
                url: '/behavior',
                views: {
                    'appView': {
                        templateUrl: 'app/view/Behavior/behavior.html',
                        controller: 'behaviorCtrl'
                    }
                },
                parent: 'app'
            })
            .state('app.setting', {
                url: '/setting/:gk_code',
                views: {
                    'appView': {
                        templateUrl: 'app/view/settings/setting.html',
                    }
                },
                parent: 'app'
            })


        $urlRouterProvider.otherwise('/main/accountlist');
    })
    .run(function($rootScope, subscriptionFctry) {
        $rootScope.company = {};
        $rootScope.total = {};
        $rootScope.linedata = {};

        $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
            $rootScope.company = subscriptionFctry.getCurrentCompany();
        });
    })
    .directive('myContainer', function() {

        return {
            restrict: 'AE',
            replace: true,
            templateUrl: "app/view/settings/directive/sidebar.html"
        }
    })
    .factory('_', ['$window', function($window) {
        return $window._;
    }]);
