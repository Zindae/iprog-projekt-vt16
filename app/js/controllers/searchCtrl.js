myApp.controller('searchCtrl', function($scope, $http, $q, albumGramService) {
	
	var vn = this;
	
	$scope.search = function (text) {
		vn.page = 1;
		var promise = albumGramService.search(text, vn.page);
		promise.then(function(data) {	
			var dataTmp = data.data.photos.photo;
			vn.shots = dataTmp;		
		});
		return promise;
	};	
});