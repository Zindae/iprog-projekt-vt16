myApp.factory('albumGramService', ['$resource',  function ($resource) {
	// console.log('HEJ FRÅN SERVICE');
	// this.flickrImg = $resource('http://api.flickr.com/services/feeds/photos_public.gne', {id:'96272396@N05', size:'b', lang:'en-us', format:'jsonp', jsoncallback:'?'});
	// this.flickrImg = $resource('https://api.flickr.com/services/rest/', { method: 'flickr.photos.getRecent', api_key: 'd729a2ce77646a2582990f763ea8b7f0', format:'json', nojsoncallback:'1'});
	// this.flickrImg = $resource('https://www.googleapis.com/youtube/v3/videos',{id:'PWLv6UOr9TQ', part:'snippet', key: 'AIzaSyDskT9SnSCiKLDn4DgRIguNi27wVyn6xt0'});
	return this;
	// ?method=flickr.photos.getRecent&api_key=d729a2ce77646a2582990f763ea8b7f0&format=json&nojsoncallback=1'
	
}]);
  