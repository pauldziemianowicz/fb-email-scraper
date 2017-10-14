app.directive('mainPage', ['$rootScope', function($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/partials/main.html',
    controller: 'MainController',
  }
}]);
