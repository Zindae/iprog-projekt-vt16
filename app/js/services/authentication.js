myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'FIREBASE_URL',
  function($rootScope, $firebaseAuth, $firebaseObject,
    $location, FIREBASE_URL) {

    // $rootScope.currentUser = undefined;
    var RSCU = $rootScope.currentUser;

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
	// console.log(ref);
    auth.$onAuth(function(authUser) {
      if (authUser) {
        var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid ); // reference to user
        var userObj = $firebaseObject(userRef); // create obj based on reference 
		console.log($rootScope.currentUser);
		console.log(authUser);
        // userObj.$loaded().then(function() {
        //   // console.log('asdfasdf: ',userObj.$value); // "bar"
        //   console.log('inside: ',$rootScope.currentUser.$value);
        // });
        $rootScope.currentUser = userObj; // connect reference to 'current user'
        RSCU = userObj;
		// console.log(RSCU);

        /* my testing access to the $value attribute of currentUser */
		// console.log($rootScope.currentUser.$value);
        // console.log($rootScope.currentUser);
        // console.log($rootScope.currentUser.$value['a']);
        // userObj.$loaded().then(function() {
        //   // console.log('asdfasdf: ',userObj.$value); // "bar"
        //   console.log('inside: ', $rootScope.currentUser.$value);
        // });
       
        // console.log('CURRENT USER', $rootScope.currentUser.$value);
        // console.log('rootScope.$value inside service: ',$rootScope.currentUser.$value)
        // console.log('rootScope.$value[\'a\'] inside service: ',$rootScope.currentUser.$value['a']);

        /* end of testing */

      } else  {
        $rootScope.currentUser = ''; // connect reference to 
      }

	
    });
	

  // calling $save() on the synchronized object syncs all data back to our database
  this.saveUser = function() {
      $rootScope.currentUser.$save().then(function() {
        alert('data saved!');
      }).catch(function(error) {
        alert('Error!');
      });
    };
	
	this.getCurr = function() {
		$rootScope.currentUser.$value = { 'a': 1, 'b': 2, 'c': 3 }; 
		return $rootScope.currentUser.$value;
	};
	
	this.updateCurr = function(test) {
		$rootScope.currentUser.$value[test.header] = test.comment;
    $rootScope.currentUser[test.header] = test.comment;
		// console.log($rootScope.currentUser.$value);
		// $rootScope.currentUser.$save();
    this.saveUser();
		// console.log($rootScope.currentUser.$save());
		return $rootScope.currentUser.$value;
	};
	
     // created when Authentication is called in the Controllers
      this.login = function(user) {
        auth.$authWithPassword({
          email: user.email,
          password: user.password
        }).then(function(regUser) {
          $location.path('/success');
        }).catch(function(error) {
         $rootScope.message = error.message;
        });
      }; //login

      this.logout = function() {
        return auth.$unauth();
      }; // logout

      this.requireAuth = function() {
        return auth.$requireAuth();
      }; // require Authentication

      this.register = function(user) {
        auth.$createUser({
          email: user.email,
          password: user.password
        }).then(function(regUser) {

          var regRef = new Firebase(FIREBASE_URL + 'users')
          .child(regUser.uid).set({
            date: Firebase.ServerValue.TIMESTAMP,
            regUser: regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            email:  user.email
          }); //user info

          myAuthObject.login(user);

        }).catch(function(error) {
          $rootScope.message = error.message;
        }); // //createUser
      }; // register
    
    this.getUserData = function () {
      if ($rootScope.currentUser!==undefined && $rootScope.currentUser!=='') {
		    

        // return 'yupp';

        // setTimeout(function() {
          // console.log($rootScope.currentUser.$value);
        // }, 3000);

        // console.log($rootScope.currentUser.$value);
        return $rootScope.currentUser.$value;
      } else {
        return 'nope';
      }
    };

    return this;

}]); //factory

























// myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'FIREBASE_URL',
//   function($rootScope, $firebaseAuth, $firebaseObject,
//     $location, FIREBASE_URL) {

//   var ref = new Firebase(FIREBASE_URL);
//   var auth = $firebaseAuth(ref);

//   auth.$onAuth(function(authUser) {
//     if (authUser) {
//       var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid ); // reference to user
//       var userObj = $firebaseObject(userRef); // create obj based on reference
//       // userObj.$loaded().then(function() {
//       //   console.log(obj.$value); // "bar"
//       // });
//       console.log('authUser :', authUser);
//       $rootScope.currentUser = userObj; // connect reference to 'current user'
      

//       /* my testing access to the $value attribute of currentUser */

//       // $rootScope.currentUser.symbol = 'alpha';
//       // console.log('rootScope.$id inside service: ', $rootScope.currentUser.$id);
//       // console.log('rootScope inside service: ', $rootScope.currentUser);
//       // console.log('rootScope.alpha inside service: ',$rootScope.currentUser.symbol);
//       $rootScope.currentUser.$value = { 'a': 1, 'b': 2, 'c': 3 };
//       // console.log('rootScope.$value inside service: ',$rootScope.currentUser.$value)
//       // console.log('rootScope.$value[\'a\'] inside service: ',$rootScope.currentUser.$value['a']);

//       /* end of testing */

//     } else  {
//       $rootScope.currentUser = ''; // connect reference to 
//     }
//   });


//   var myAuthObject = { // created when Authentication is called in the Controllers
//     login: function(user) {
//       auth.$authWithPassword({
//         email: user.email,
//         password: user.password
//       }).then(function(regUser) {
//         $location.path('/success');
//       }).catch(function(error) {
//        $rootScope.message = error.message;
//       });
//     }, //login

//     logout: function() {
//       return auth.$unauth();
//     }, // logout

//     requireAuth: function() {
//       return auth.$requireAuth();
//     }, // require Authentication

//     register: function(user) {
//       auth.$createUser({
//         email: user.email,
//         password: user.password
//       }).then(function(regUser) {

//         var regRef = new Firebase(FIREBASE_URL + 'users')
//         .child(regUser.uid).set({
//           date: Firebase.ServerValue.TIMESTAMP,
//           regUser: regUser.uid,
//           firstname: user.firstname,
//           lastname: user.lastname,
//           email:  user.email
//         }); //user info

//         myAuthObject.login(user);

//       }).catch(function(error) {
//         $rootScope.message = error.message;
//       }); // //createUser
//     }, // register
  
//     getUserData: function () {
//       var uObj = userObj !== undefined ? userObj : '';
//       return  uObj;
//     }

//   };

//   return myAuthObject;

// }]); //factory
