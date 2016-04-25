'use strict';

angular.module('myApp')
    .controller('analyticsCtrl', function($scope) {
         $scope.linedata = {
            xkey: 'date',
            ykeys: ['session'],
            labels: ['Session'],
            lineColors: ['#3c8dbc'],
            data: [
                { date: '2014-10-20', session: 2 },
                { date: '2011 Q2', session: 45 },
                { date: '2011 Q3', session: 1 },
                { date: '2011 Q4', session: 7 },
                { date: '2012 Q1', session: 10 },
                { date: '2012 Q2', session: 6 },
                { date: '2012 Q3', session: 5 },
                { date: '2012 Q4', session: 8 },
                { date: '2013 Q1', session: 9 },
                { date: '2013 Q2', session: 4 }
            ]
        };

        $scope.areadata = {
            data: [
                { y: '2011 Q1', item1: 2666, item2: 2666 },
                { y: '2011 Q2', item1: 2778, item2: 2294 },
                { y: '2011 Q3', item1: 4912, item2: 1969 },
                { y: '2011 Q4', item1: 3767, item2: 3597 },
                { y: '2012 Q1', item1: 6810, item2: 1914 },
                { y: '2012 Q2', item1: 5670, item2: 4293 },
                { y: '2012 Q3', item1: 4820, item2: 3795 },
                { y: '2012 Q4', item1: 15073, item2: 5967 },
                { y: '2013 Q1', item1: 10687, item2: 4460 },
                { y: '2013 Q2', item1: 8432, item2: 5713 }
            ],
            xkey: 'y',
            ykeys: ['item1', 'item2'],
            labels: ['Item 1', 'Item 2'],
            lineColors: ['#a0d0e0', '#3c8dbc'],
        };

        $scope.donutdata = {
            colors: ["#3c8dbc", "#f56954", "#00a65a"],
            data: [
                { label: "Download Sales", value: 12 },
                { label: "In-Store Sales", value: 30 },
                { label: "Mail-Order Sales", value: 20 }
            ],
        };

        $scope.bardata = {
            data: [
                { y: '2006', a: 100, b: 90 },
                { y: '2007', a: 75, b: 65 },
                { y: '2008', a: 50, b: 40 },
                { y: '2009', a: 75, b: 65 },
                { y: '2010', a: 50, b: 40 },
                { y: '2011', a: 75, b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            barColors: ['#00a65a', '#f56954'],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['CPU', 'DISK'],
        }
    })
.controller('accountCtrl', function($scope){

})
