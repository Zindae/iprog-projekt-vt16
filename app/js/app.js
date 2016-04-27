var myApp = angular.module('myApp',
 ['ngRoute', 'firebase', 'ngResource', 'angularGrid'])
 
 // 'ngMaterial' - förstör GRIDfältet, används av md-forms

  .constant('FIREBASE_URL', 'https://angreg1234.firebaseIO.com/'); // 2 constats that we use through out the app


myApp.run(['$rootScope', '$location',
  function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
      function(event, next, previous, error) {
        if (error=='AUTH_REQUIRED') {
          $rootScope.message = 'Sorry, you must log in to access that page';
          $location.path('/login');
        } // AUTH REQUIRED
      }); //event info
  }]); //run


  myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html', // use this view
      controller: 'RegistrationController'// use this ctrl
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/success', {
      templateUrl: 'views/success.html',
      controller: 'imageCtrl',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } // current Auth
      } // resolve
    }).
	when('/home', {
      templateUrl: 'views/home.html',
      controller: 'imageCtrl'
    }).
	when('/settings', {
      templateUrl: 'views/settings.html',
      controller: 'settingsCtrl'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);



