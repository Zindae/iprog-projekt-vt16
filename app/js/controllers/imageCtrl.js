myApp.controller('imageCtrl', function($scope, $http, $q, albumGramService) {
	
	var vm = this;
	$scope.card = {};
	$scope.card.title = 'test';
	vm.page = 0;
	vm.shots = [];
	vm.loadingMore = false;
	vm.loadMoreShots = function() {
		if(vm.loadingMore) return;
		vm.page++;
		vm.loadingMore = true;
		var promise = albumGramService.getRecentPhotos(vm.page);
		promise.then(function(data) {
			console.log(promise);
			var shotsTmp = angular.copy(vm.shots);		
			var dataTmp = data.data.photos.photo;
			shotsTmp = shotsTmp.concat(dataTmp);
			vm.shots = shotsTmp;
			vm.loadingMore = false;
			
		}, function(){
			vm.loadingMore = false;
		});
		return promise;
		
	};

	vm.loadMoreShots();

	$scope.addToFavorite = function (id) {
		console.log(id);
		albumGramService.addFavorites(id);
	}
	
	$scope.favorites = albumGramService.getFavorites();
	
	// $scope.pop = function(x) {
		// console.log('Klickat på bild!', x);
		// // ::shot.images.normal, finns en "hd" version, popup med bilden & knappar
	// };

});
myApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });