'use strict'
// var foo;
// function Posts($scope, $http) {
//     $http.get('http://api.tumblr.com/v2/blog/allanimemangaquotes.tumblr.com/posts?api_key=pjKvJTdwNgCVEB0zX1q0ilC0x2PiFGSd7koSVoUFMbCwetlUPf').
//         success(function(data) {
//             $scope.posts = data;
//             foo = data;
//         });
// }
var tumblr_blogs = [
	'http://api.tumblr.com/v2/blog/allanimemangaquotes.tumblr.com/posts', //allanimemangaquotes.tumblr.com
	'http://api.tumblr.com/v2/blog/manga-anime-quotes.tumblr.com/posts', //manga-anime-quotes.tumblr.com
	'http://api.tumblr.com/v2/blog/anime-quotes-to-live-by.tumblr.com/posts',//http://anime-quotes-to-live-by.tumblr.com
	'http://api.tumblr.com/v2/blog/animequote.tumblr.com/posts',//http://animequote.tumblr.com
	'http://api.tumblr.com/v2/blog/quotesfromanime.tumblr.com/posts',//http://quotesfromanime.tumblr.com
	'http://api.tumblr.com/v2/blog/animesayings-quotes.tumblr.com/posts',//http://animesayings-quotes.tumblr.com
]
var instaAppServices = angular.module('instaAppServices', ['ngResource']);

instaAppServices.factory('Posts', ['$resource', '$http',
	function($resource, $http){
		// delete $http.defaults.headers.common['X-Requested-With'];

		var blog_url = tumblr_blogs[5];
		return $http.jsonp(blog_url ,
			{
				params: {
			        callback: 'JSON_CALLBACK',
			        format:'json',			        
			        api_key: 'pjKvJTdwNgCVEB0zX1q0ilC0x2PiFGSd7koSVoUFMbCwetlUPf'
			    }
			}).
		        success(function(data) {
		        	console.log(data);
		            console.log('Succesfully fetched the Posts');
		        });

	}
]);

