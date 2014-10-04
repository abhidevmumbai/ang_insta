'use strict';


var instaApp = angular.module('instaApp', [
	'ngRoute',
	'ngResource',
	'instaAppControllers',
	'instaAppServices'
	]
);

instaApp.config(function($routeProvider, $httpProvider) {
	
	$routeProvider.
		when('/account', {
			controller: 'AccountsCtrl',
			templateUrl: 'views/partials/account.html'
		}).
		when('/login', {
			controller: 'LoginCtrl',
			templateUrl: 'views/partials/login.html'
		}).
		when('/feeds', {
			controller: 'FeedsCtrl',
			templateUrl: 'views/partials/feed.html'
		}).
		otherwise({
			redirectTo: '/'
		});
});