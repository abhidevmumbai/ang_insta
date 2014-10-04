'use strict'

var instaAppControllers = angular.module('instaAppControllers', []);
var foo = '';
instaAppControllers.controller('AccountsCtrl', ['$scope', 'Posts',
	function($scope, Posts) {
	$scope.posts = null;
	Posts.then(function (response) {
		$scope.posts = response.data.response.posts;
	});
}]);

instaAppControllers.controller('LoginCtrl', ['$scope', 'Posts',
	function($scope, Posts) {
	$scope.posts = null;
	Posts.then(function (response) {
		$scope.posts = response.data.response.posts;
	});
}]);

instaAppControllers.controller('FeedsCtrl', ['$scope', 'Posts',
	function($scope, Posts) {
	$scope.posts = null;
	Posts.then(function (response) {
		$scope.posts = response.data.response.posts;
	});
}]);