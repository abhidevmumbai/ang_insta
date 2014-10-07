'use strict'

var instaAppServices = angular.module('instaAppServices', ['ngResource', 'ngCookies']);

instaAppServices.factory('Auth', function($http, $cookieStore){

    var currentUser = $cookieStore.get('user') || { user: ''};
    console.log('currentUser: '+ currentUser);
    $cookieStore.remove('user');

    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    return {
        isLoggedIn: function(user) {
            if(user === undefined) {
                user = currentUser;
            }
            return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
        },
        login: function(user, success, error) {
            $http.post('/login', user).success(function(user){
                changeUser(user);
                success(user);
            }).error(error);
        },
        logout: function(success, error) {
            $http.post('/logout').success(function(){
            	changeUser({
                    username: ''
                });
                success();
            }).error(error);
        },
        user: currentUser
    };
});


instaAppServices.factory('Feed', function($http){

});
