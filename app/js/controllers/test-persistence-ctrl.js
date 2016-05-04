myApp.controller('persistenceCtrl', ['$scope','$rootScope', 'Authentication', function($scope, $rootScope, Authentication) {
	
	$scope.logRoot = function () {
		console.log('logRoot: ', Authentication.RSCU);
		console.log('logRoot w/$value: ', Authentication.RSCU.$value);
		return null;
	};

	$scope.ud = function () {
		// console.log(Authentication.getUserData());
		return Authentication.getUserData();
	};

	$scope.addCommentToUser = function (test) {
		// console.log(test.header, test.comment);
		// console.log('roscp.currUsr in func: '.$rootScope.currentUser);
		// console.log($rootScope.currentUser.$value);
		$rootScope.currentUser.$value[test.header] = test.comment;
		$rootScope.currentUser.$save();
		// console.log($rootScope.currentUser);
		return;
	};

}]);