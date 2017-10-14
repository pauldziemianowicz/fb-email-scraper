app.factory('FB_API_Service', ['$rootScope', '$http', function($rootScope, $http) {

  return {

    runEmailScraper: function(accessToken, inputFile){
      return new Promise(function(resolve, reject) {
        $http({
          method: 'POST',
          url: '/FB-API/run-email-scraper',
          data: {accessToken: accessToken, inputFile: inputFile}
        }).then(function(data) {
          console.log(data);
          // var outputFile = data.data;
        }).catch(function(err) {
          console.log(err);
        })
      });
    }

  };

}])
