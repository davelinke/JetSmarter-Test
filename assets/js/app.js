(function(){
	'use strict';
	angular.module('gui', [
		'gui.services',
		'gui.fn',
		'gui.controllers',
		'gui.directives',
		'gui.filters',
		'ngRoute'
	]).
	config(['$routeProvider', function ($routeProvider) {
		$routeProvider.
			when("/operator-portal", {
				templateUrl : "partials/operator-portal.html",
				controller : "operator-portal"
			}).
			when("/operator-portal/:flightId", {
				templateUrl : "partials/operator-portal.html",
				controller : "operator-portal"
			}).
			otherwise({
				redirectTo : '/operator-portal'
			});
	}]);
})();
