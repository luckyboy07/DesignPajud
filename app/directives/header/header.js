'use strict';

angular.module("myApp")
    .directive('navHeader', function() {
        return {
            restrict: "AE",
            templateUrl: "app/directives/header/header.html"
        };
    });
