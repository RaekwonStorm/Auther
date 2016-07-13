'use strict';

app.directive('navbar', function ($state, $location, LoginFactory) {
  return {
    restrict: 'E',
    templateUrl: '/browser/components/navbar/navbar.html',
    link: function (scope) {
      scope.logoutFunc = LoginFactory.logoutFunc
      scope.pathStartsWithStatePath = function (state) {
        var partial = $state.href(state);
        var path = $location.path();
        return path.startsWith(partial);
      };
      scope.isUserFunc = LoginFactory.isUserFunc;

      scope.redirectFunc = function (param){
        if (!scope.isUserFunc()){
            $state.go('signup');
            console.log("No user, let's redirect to signup");
           }   
        else{
          $state.go(param);
        }
        }
      }
    }
  });
