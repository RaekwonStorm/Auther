app.factory('LoginFactory', function($http, $state){

	return {
		LoginFunc: function(userData){
      console.log(userData);
			return $http.post('/api/users/login', {email: userData.username, password: userData.password})
        .then(function () {
          $state.go('stories');
        })
        .catch(function (err) {
          alert("User does not exist!");
        })
			},

      logoutFunc: function () {
        console.log("you are dumn")
        return $http.post('/api/users/logout')
      }
	}
});
