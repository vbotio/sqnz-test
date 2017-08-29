var app = angular.module("app", ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $httpProvider){
	$routeProvider.when('/', {
		templateUrl: 'templates/list.html',
		controller: 'mainController'
	})
	$httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
})