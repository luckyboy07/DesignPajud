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
            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    'appView': {
                        templateUrl: 'app/view/Dashboard/dashboard.html'
                    }
                }
            })
            .state('app.appoverview', {
                url: '/appoverview',
                views: {
                    'appView': {
                        templateUrl: 'app/view/AppOverview/Overview/overview.html',
                        controller: 'appoverviewCtrl'
                    }
                },
                parent: 'app'

            })

        .state('app.appevents', {
                url: '/events',
                views: {
                    'appView': {
                        templateUrl: 'app/view/AppOverview/Events/events.html',

                    }
                },
                parent: 'app'

            })
            .state('app.appscreens', {
                url: '/screens',
                views: {
                    'appView': {
                        templateUrl: 'app/view/AppOverview/Screens/screens.html',
                        
                    }
                },
                parent: 'app'

            })
            .state('app.audienceoverview', {
                url: '/audienceoverview',
                views: {
                    'appView': {
                        templateUrl: 'app/view/Audience/Overview/overview.html',

                    }
                },
                parent: 'app'

            })
            .state('app.audienceusers', {
                url: '/users',
                views: {
                    'appView': {
                        templateUrl: 'app/view/Audience/Users/users.html',

                    }
                },
                parent: 'app'

            })
            .state('app.audiencegeolanguage', {
                url: '/geolanguage',
                views: {
                    'appView': {
                        templateUrl: 'app/view/Audience/Geo-language/Geo-language.html',

                    }
                },
                parent: 'app'

            })
            .state('app.audiencegeolocation', {
                url: '/geolocation',
                views: {
                    'appView': {
                        templateUrl: 'app/view/Audience/Geo-location/Geo-location.html',

                    }
                },
                parent: 'app'

            })
             .state('app.audiencenetwork', {
                url: '/network',
                views: {
                    'appView': {
                        templateUrl: 'app/view/Audience/Network/network.html',

                    }
                },
                parent: 'app'

            })
             .state('app.audiencedevices', {
                url: '/devices',
                views: {
                    'appView': {
                        templateUrl: 'app/view/Audience/Devices/devices.html',

                    }
                },
                parent: 'app'

            })
             .state('app.behavioroverview', {
                url: '/behavioroverview',
                views: {
                    'appView': {
                        templateUrl: 'app/view/Behavior/Overview/overview.html',
                        controller: 'subscriptionDetailCtrl'
                    }
                },
                parent: 'app'
            })
            .state('app.behaviorpages', {
                url: '/behaviorpage',
                views: {
                    'appView': {
                        templateUrl: 'app/view/Behavior/Page/page.html',
                        controller: 'behaviorCtrl'
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
