app.factory('SignupFactory', function ($http, $state) {

  return {

    signupFunc: function (userData) {

      return $http.post('/api/users/signup', {email: userData.username, password: userData.password})
        .then(function () {
          $state.go('stories');
        })
        .catch(function (err) {
          alert("User already exists!");
        })
    }



  }

})
