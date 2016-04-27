myApp.controller('imageCtrl', function($scope, $http, $q) {
	
	var vm = this;
	$scope.card = {};
	$scope.card.title = 'test';
	vm.page = 0;
	vm.shots = [];
	vm.loadingMore = false;
	vm.loadMoreShots = function() {
		if(vm.loadingMore) return;
		vm.page++;
		// var deferred = $q.defer();
		// 'https://api.flickr.com/services/rest/', { method: 'flickr.photos.getRecent', api_key: 'd729a2ce77646a2582990f763ea8b7f0', format:'json', nojsoncallback:'1'}
		// https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=38c248a92d1a579098352a361c8871e2&page=1&format=json&nojsoncallback=1&api_sig=adc90df373dc1db30e8ffcea9fd8ae52
		vm.loadingMore = true;
		// var promise = $http.get('https://api.dribbble.com/v1/shots/?per_page=24&page='+vm.page+'&access_token=3df6bcfc60b54b131ac04f132af615e60b0bd0b1cadca89a4761cd5d125d608f');
		var promise = $http.get('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=9983c31b37bc28c9bbcb0599b955d326&per_page=24&page='+vm.page+'&format=json&nojsoncallback=1');
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

	// $scope.pop = function(x) {
		// console.log('Klickat på bild!', x);
		// // ::shot.images.normal, finns en "hd" version, popup med bilden & knappar
	// };
  

});
myApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });