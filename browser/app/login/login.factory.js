app.factory('LoginFactory', function($http, $state){

var currentUser = null; 

	return {
		LoginFunc: function(userData){
      console.log(userData);
			return $http.post('/api/users/login', {email: userData.username, password: userData.password})
        .then(function (user) {
          currentUser = user;
          $state.go('stories');
        })
        .catch(function (err) {
          alert("User does not exist!");
        }) 
			},

    isUserFunc: function(){
        if (currentUser) return true;
        else return false;
    },

    logoutFunc: function () {
        console.log("you are dumn")
        currentUser = null;
        return $http.post('/api/users/logout')
      },

    isAdminFunc: function (){
      //right a get request for the user
      if(!currentUser)return false; 
      else if (!currentUser.isAdmin){
        return false;
      }
      else return true;
    }
	}
});
