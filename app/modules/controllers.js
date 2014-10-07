'use strict'

var instaAppControllers = angular.module('instaAppControllers', []);
var foo = '';



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
		
	}
]);

instaAppControllers.controller('FeedsCtrl', ['$scope', 'Posts',
	function($scope, Feed) {
	$scope.feed = null;
	Feed.then(function (response) {
		$scope.feed = response.data.response.feed;
	});
}]);