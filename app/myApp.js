'use strict';

angular.module('myApp', ['ui.router', 'angular.morris-chart', 'restangular'])
    .constant('API_URL', 'http://192.168.2.243:3000')
    .constant('API_VERSION', '/analytics/1.0')
    .config(function($provide, $stateProvider, $urlRouterProvider, API_URL, API_VERSION, RestangularProvider) {
        $provide.value('baseURL', API_URL);
        RestangularProvider.setBaseUrl(API_URL + '/1.0/');

        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'app/view/main.html',
                controller: 'subscriptionCtrl'  
            })
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/view/app.html',
                controller: 'analyticsCtrl'
            })
            .state('app.analytic', {
                url: '/analytic/:sr_id',
                views: {
                    'appView': {
                        templateUrl: 'app/view/analytic/analytic.html'
                    }
                },
                controller: 'subscriptionDetailCtrl'
                
            })
            .state('app.deploy', {
                url: '/deploy',
                templateUrl: 'app/view/Deploy/deploy.html',
            })
            .state('app.package', {
                url: '/package',
                templateUrl: 'app/view/Package/package.html',
            })
            .state('app.user', {
                url: '/user',
                templateUrl: 'app/view/Users/user.html'
            })
            .state('app.setting', {
                url: '/setting',
                templateUrl: 'app/view/settings/setting.html'
            })
            .state('app.setting.blank', {
                url: '/blank',
                templateUrl: 'app/view/settings/view/blank.html',
            })
            .state('app.setting.sample', {
                url: '/sample',
                templateUrl: 'app/view/settings/view/sample.html',

            })
            .state('app.setting.collaborators', {
                url: '/collaborators',
                templateUrl: 'app/view/settings/view/collaborators.html',
            })


        $urlRouterProvider.otherwise('/main');
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
