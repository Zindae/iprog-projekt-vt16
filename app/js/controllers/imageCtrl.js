myApp.controller('imageCtrl', function($scope, $http, $q, $cookies, albumGramService) {
	
	var vm = this;
	$scope.card = {};
	$scope.card.title = 'test';
	vm.page = 0;
	vm.shots = [];
	vm.loadingMore = false;
	console.log(vm.loadingMore);
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
	
	if ($cookies.getObject('favoriteList') === undefined) {
		albumGramService.favoriteList =	{}
	} 
	else {
		albumGramService.favoriteList = albumGramService.cookieGet();
		};
		
	$scope.favorites = albumGramService.favoriteList;
	
	$scope.addToFavorite = function (id) {
		albumGramService.favoriteList[id.id] = {farm:id.farm, id: id.id, secret: id.secret, server: id.server};
		albumGramService.cookiePut();
	}
	
	$scope.removeFavorite = function (id) {
		delete albumGramService.favoriteList[id.id];
		albumGramService.cookiePut();
	}


});
myApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });