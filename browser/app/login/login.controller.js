app.controller('loginController', function($scope, Login){


var userDataObj = {username: $scope.username, 
			   password: $scope.password}


$scope.loginFunc = Login.LoginFunc(userDataObj);			   

})