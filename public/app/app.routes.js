app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/main.html',
    })

})
