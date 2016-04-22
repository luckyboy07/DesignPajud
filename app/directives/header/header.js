'use strict';

angular.module("myApp")
    .directive('navHeader', function() {
        return {
            restrict: "AE",
            templateUrl: "app/directives/header/header.html"
        };
    })
    .directive('navHead', function() {
        return {
            restrict: "AE",
            templateUrl: "app/directives/header/header-2.html"
        };
    });
