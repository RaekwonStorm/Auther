app.factory('Login', function($http){

	return {
		LoginFunc: function(userData){
			return $http.post('/api/users/login', {username: userData.username, password: userData.password})
			}
	}
});