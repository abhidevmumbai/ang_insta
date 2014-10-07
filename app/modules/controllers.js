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

instaAppControllers.controller('AccountsCtrl', ['$scope', 'Auth',
	function($scope, Auth) {
		$scope.user = Auth.user;
		console.log('**************Account');
		console.log($scope.user);
	}
]);

instaAppControllers.controller('LoginCtrl', ['$scope', '$location', '$window','Auth',
	function($scope, $location, $window, Auth) {
		$scope.user = Auth.user;
		console.log('**************Login');
		$scope.loginOauth = function(provider) {
	        $window.location.href = '/auth/' + provider;
	    };
	}
]);

instaAppControllers.controller('FeedsCtrl', ['$scope', 'Posts',
	function($scope, Feed) {
	$scope.feed = null;
	Feed.then(function (response) {
		$scope.feed = response.data.response.feed;
	});
}]);