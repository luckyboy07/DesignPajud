'use strict';

angular.module("myApp")
    .directive('sideBar', function() {
        return {
            restrict: "AE",
            templateUrl: "app/directives/sidebar/sidebar.html"
        };
    });
