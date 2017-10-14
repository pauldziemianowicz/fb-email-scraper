app.config(['$locationProvider', '$httpProvider', 'localStorageServiceProvider', function($locationProvider, $httpProvider, localStorageServiceProvider) {

  localStorageServiceProvider
  .setPrefix('fb-email-scraper');

  $locationProvider.html5Mode(true);

}])
