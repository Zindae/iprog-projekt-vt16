myApp.controller('RegistrationController',
	['$scope', 'Authentication',
	function($scope, Authentication) {
  
	$scope.login = function() {
		Authentication.login($scope.user); // pass submited user into function
	}; //login

	$scope.logout = function() {
    	Authentication.logout(); // pass submited user into function
  	}; //login  

	$scope.register = function() {
		Authentication.register($scope.user);
	}; // register

}]); // Controller