'use strict'

var instaAppControllers = angular.module('instaAppControllers', []);
var foo = '';

instaAppControllers.controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;

    $scope.logout = function() {
        Auth.logout(function() {
            $location.path('/login');
        }, function() {
            $rootScope.error = "Failed to logout";
        });
    };
}]);

instaAppControllers.controller('AccountsCtrl', ['$rootScope', '$scope', 'Auth',
	function($rootScope, $scope, Auth) {
		$rootScope.user = Auth.user;
		console.log('**************Account');
		// console.log($rootScope.user);
	}
]);

instaAppControllers.controller('LoginCtrl', ['$scope', '$location', '$window','Auth',
	function($scope, $location, $window, Auth) {
		console.log('**************Login');
		$scope.loginOauth = function(provider) {
			$window.location.href = '/auth/' + provider;
		};
	}
]);

instaAppControllers.controller('FeedsCtrl', ['$scope', '$http', 'Feeds',
	function($scope, $http, Feeds) {
	console.log('**************Feeds');
	$scope.feeds = null;
	$http.get('/getFeeds')
	.then(function(result) {
		$scope.feed = result.data;
		// console.log(result.data);
	});
	// Feeds.then(function (response) {
	// 	$scope.feeds = response.data.response.feed;
	// 	console.log($scope.feeds);
	// });
}]);