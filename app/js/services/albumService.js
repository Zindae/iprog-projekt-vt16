myApp.factory('albumGramService', ['$resource', '$http', '$q', '$cookies', function ($resource, $http, $q, $cookies) {
	// console.log('HEJ FRÅN SERVICE');
	// this.flickrImg = $resource('http://api.flickr.com/services/feeds/photos_public.gne', {id:'96272396@N05', size:'b', lang:'en-us', format:'jsonp', jsoncallback:'?'});
	// this.flickrImg = $resource('https://api.flickr.com/services/rest/', { method: 'flickr.photos.getRecent', api_key: 'd729a2ce77646a2582990f763ea8b7f0', format:'json', nojsoncallback:'1'});
	// this.flickrImg = $resource('https://www.googleapis.com/youtube/v3/videos',{id:'PWLv6UOr9TQ', part:'snippet', key: 'AIzaSyDskT9SnSCiKLDn4DgRIguNi27wVyn6xt0'});
	
	this.favoriteList =
	{
		26206374974:{farm:8, id: "26206374974", secret: "39082387da", server: "7442"}
		// 26206560814:{farm:8, id: "26206560814", secret: "56d824f2e5", server: "7557"}
	};
	
	this.cookiePut = function () {
		$cookies.putObject('favoriteList', this.favoriteList);
	}

	this.cookieGet = function () {
		return $cookies.getObject('favoriteList');
	}	
	
	this.getRecentPhotos = function (vmpage) {
		var promise = $http.get('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=a974aef8f8ca855263a7d547e5530c5c&per_page=24&page='+vmpage+'&format=json&nojsoncallback=1');
		return promise;
	}
	
	this.search = function (text, vnpage) {
		var promise = $http.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a974aef8f8ca855263a7d547e5530c5c&text='+text+'&per_page=24&page='+vnpage+'&format=json&nojsoncallback=1');
		return promise;
	}
	
	return this;
	
}]);
  