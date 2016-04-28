myApp.factory('albumGramService', ['$resource', '$http', '$q', function ($resource, $http, $q) {
	// console.log('HEJ FRÅN SERVICE');
	// this.flickrImg = $resource('http://api.flickr.com/services/feeds/photos_public.gne', {id:'96272396@N05', size:'b', lang:'en-us', format:'jsonp', jsoncallback:'?'});
	// this.flickrImg = $resource('https://api.flickr.com/services/rest/', { method: 'flickr.photos.getRecent', api_key: 'd729a2ce77646a2582990f763ea8b7f0', format:'json', nojsoncallback:'1'});
	// this.flickrImg = $resource('https://www.googleapis.com/youtube/v3/videos',{id:'PWLv6UOr9TQ', part:'snippet', key: 'AIzaSyDskT9SnSCiKLDn4DgRIguNi27wVyn6xt0'});
	
	this.favoriteList = [];
	
	this.addFavorites = function (id) {
		this.favoriteList.push(id);
	}
	
	this.getFavorites = function () {
		return this.favoriteList;
	}
	
	this.getRecentPhotos = function (vmpage) {
		var promise = $http.get('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=af6c775090088e5ee1c09ddaab1dc076&per_page=24&page='+vmpage+'&format=json&nojsoncallback=1');
		return promise;
	}
	
	this.search = function (text, vnpage) {
		var promise = $http.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c2858b7582b1f6f270c3f69b46cf8148&text='+text+'&per_page=24&page='+vnpage+'&format=json&nojsoncallback=1');
		return promise;
	}
	
	return this;
	// ?method=flickr.photos.getRecent&api_key=d729a2ce77646a2582990f763ea8b7f0&format=json&nojsoncallback=1'
	
}]);
  