'use strict';
angular.module("myApp")
    .controller('analyticCtrl', function($scope) {
        // function analyticCtrl($scope) {
        $scope.exampleData = [{
            "key": "Response time",
            "values": [
                [52.0, 40],
                [50.0, 60],
                [170.0, 51],
                [141.0, 80],
                [80.0, 55],
                [90.0, 40],
                [101.0, 65],
                [85.0, 35],
                [111.0, 46],
                [71.0, 56],
                [60.0, 77],
                [44.0, 42]
            ]
        }];

        $scope.xAxisTickValuesFunction = function() {
            return function(d) {
                var tickVals = [];
                var values = d[0].values;
                var interestedTimeValuesArray = [0, 10, 15, 30, 45];
                for (var i in values) {
                    if (interestedTimeValuesArray.indexOf(moment.unix(values[i][0]).minute()) >= 0) {
                        tickVals.push(values[i][0]);
                    }
                }
                console.log('xAxisTickValuesFunction', d);
                return tickVals;
            };
        };

        $scope.xAxisTickFormatFunction = function() {
            return function(d) {
                return d3.time.format('%H:%M')(moment.unix(d).toDate());
            }
        };

    });

// function PieCtrl($scope) {
//     $scope.exampleData = [{
//         key: "One",
//         y: 5
//     }, {
//         key: "Two",
//         y: 2
//     }, {
//         key: "Three",
//         y: 9
//     }, {
//         key: "Four",
//         y: 7
//     }, {
//         key: "Five",
//         y: 4
//     }, {
//         key: "Six",
//         y: 3
//     }, {
//         key: "Seven",
//         y: 9
//     }];

//     $scope.xFunction = function() {
//         return function(d) {
//             return d.key;
//         };
//     }
//     $scope.yFunction = function() {
//         return function(d) {
//             return d.y;
//         };
//     }

// }
