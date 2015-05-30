var app = angular.module('socialNetworkApp', ['ngResource', 'ngRoute', 'ui.bootstrap']);

//app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home-screen.html',
			controller: 'userController'
		})
		.when('/profile', {
			templateUrl: 'partials/user/user-edit-screen.html',
			controller: 'userController'
		})
		.when('/users/:username', {
			templateUrl: 'partials/friends/friend-page.html',
			controller: 'userController'
		})
		.otherwise({
			redirectTo: '/'
		})
}).run(function($http){
	$http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage['sessionToken'];
});