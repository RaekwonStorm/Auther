app.factory('LoginFactory', function($http){

	return {
		LoginFunc: function(username, password){
      console.log(username, password);
			return $http.post('/api/users/login', {email: username, password: password})
			}
	}
});
