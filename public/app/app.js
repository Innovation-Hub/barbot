var app = angular.module('barBotApp', ["ngRoute"]);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
	$routeProvider.
		when('/',
			{templateUrl: 'partials/home.html',   controller: HomeCtrl}).
		when('/About',
			{templateUrl: 'partials/about.html',   controller: AboutCtrl}).
		otherwise({redirectTo: '/'});
	}]);