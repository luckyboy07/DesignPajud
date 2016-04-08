var app = angular.module('Market', ['ui.bootstrap']);
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);
app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
app.controller('SearchCtrl', ['$scope', '$http', '$filter', '$location',
                function($scope, $http, $filter, $location) {
  var results = [];
  $scope.query = $location.search().q;
  $http.get('/ajax/search?q=' + $scope.query).then(function(response) {
    results = response.data;
    $scope.filteredResults = chunk(filterEnabled(results), 4);
  });
}]);
app.controller('UserCtrl', ['$scope', '$http', '$filter', '$location',
                function($scope, $http, $filter, $location) {
  var results = [];
  $scope.query = window.id;
  $http.get('/ajax/user?u=' + $scope.query).then(function(response) {
    results = response.data;
    $scope.filteredResults = chunk(filterEnabled(results), 4);
  });
}]);
app.controller('PurchasedCtrl', ['$scope', '$http', '$filter', '$location',
                function($scope, $http, $filter, $location) {
  var results = [];
  $http.get('/ajax/purchased').then(function(response) {
    results = response.data;
    $scope.filteredResults = chunk(filterEnabled(results), 4);
  });
}]);
app.controller('RatingsCtrl', ['$scope', '$http', '$filter',
                function($scope, $http, $filter) {
  $scope.newRatings = [];
  $scope.stars = 0;
  $scope.enabled = true;
  $scope.postRating = function() {
    if (!$scope.newRating || $scope.newRating == '') {
      return;
    }
    var postData = {
      comment: $scope.newRating,
      category: category,
      ion: page,
      stars: $scope.stars
    };
    $http.post('/ajax/rating', postData).success(function(response) {
      //console.log(postData, response);
      if (response === true) {
        $scope.newRating = '';
        $scope.newRatings.push(postData);
        $scope.enabled = false;
      }
    });
  };
}]);
app.controller('CommentsCtrl', ['$scope', '$http', '$filter',
                function($scope, $http, $filter) {
  $scope.newComments = [];
  $scope.postComment = function() {
    if (!$scope.newComment || $scope.newComment == '') {
      return;
    }
    var postData = {
      comment: $scope.newComment,
      category: category,
      ion: page,
    };
    $http.post('/ajax/comment', postData).success(function(response) {
      if (response === true) {
        $scope.newComment = '';
        $scope.newComments.push(postData);
      }
    });
  };
}]);
app.controller('ListCtrl', ['$scope', '$http', '$filter',
                function($scope, $http, $filter) {
  $scope.ions = [];
  // note this assumes page var is set on window
  if (!page) {
    console.error('Required window.page var not set');
    return;
  }
  $http.get('/ajax/' + page).then(function(response) {
    if (response.data instanceof Array === false) {
      alert('Unable to retrieve ' + page);
      return;
    }
    //console.log(response)
    $scope.ions = response.data;
    $scope.popular = chunk($filter('orderBy')(response.data, 'views',
                                                             'reverse'), 4);
    $scope.newest = chunk($filter('orderBy')(response.data, 'released',
                                                            'reverse'), 4);
    $scope.priceLow = chunk($filter('orderBy')(response.data, 'price'), 4);
    $scope.priceHigh = chunk($filter('orderBy')(response.data, 'price',
                                                               'reverse'), 4);
  });
}]);

app.directive('ionListing', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      category: '@',
      ion: '='
    },
    controller: function($scope) {
      //console.log($scope.ion);
    },
    template: [
      '<a ng-href="/{{category}}/{{ion.slug}}" target="_self">',
        '<div class="clip-group">',
          '<img src="{{ ion.icon }}" alt="{{ ion.name }}">',
          '<div class="clipping-mask"></div>',
        '</div>',
        '<h4>{{ ion.name }}</h4>',
        '<p>{{ ion.tagline }}</p>',
        '<div class="stars" ng-if="ion.ratings.length > 0">',
          '<rating val="{{ ion.ratingAverage }}" max="5" readonly="true">',
          '</rating>({{ ion.ratings.length }})',
        '</div>',
        '<div ng-transclude></div>',
      '</a>'
    ].join('')
  };
});

// ### Utils ###
function filterEnabled(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i ++) {
    if (arr[i].enabled) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
function chunk(arr, size) {
  var newArr = [];
  for (var i = 0; i < arr.length; i += size) {
    newArr.push(arr.slice(i, i + size));
  }
  return newArr;
}
function searchActivate(el) {
  el.parentElement.classList.add('active');
}
function searchDeactivate(el) {
  el.parentElement.classList.remove('active');
}
var trackDemo = function(url, category, slug) {
  $.get('/ajax/analytics',{c: category, i: slug, t: 'demo'});
  ga('send', 'event', 'outbound', 'click', url, {});
};
var trackDownload = function(url, category, slug) {
  $.get('/ajax/analytics',{c: category, i: slug, t: 'download'});
  ga('send', 'event', 'outbound', 'click', url, {});
};
var trackOut = function(url, category, slug) {
  $.get('/ajax/analytics',{c: category, i: slug, t: 'external'});
  ga('send', 'event', 'outbound', 'click', url, {'hitCallback':
    function() {
      //window.open(url);
    }
  });
};
$('body').on('click', function(e) {
  //only buttons
  if ($(e.target).data('toggle') !== 'popover' &&
      $(e.target).is(':not(.clip-circle)') &&
      $(e.target).parents('.popover.in').length === 0) {
    $('[data-toggle="popover"]').popover('hide');
  }
});
//jscs:disable
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-44023830-17', 'auto');
  ga('send', 'pageview');
//jscs:enable
