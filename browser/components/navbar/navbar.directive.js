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
    }
  }
});
