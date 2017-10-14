app.controller('MainController', ['$scope', '$rootScope','FileSaver', 'Blob', 'localStorageService', 'FB_API_Service', 'socket', function($scope, $rootScope, Filesaver, Blob, localStorageService, FB_API_Service, socket) {

  $scope.view = {};
  $scope.data = {};
  $scope.uploader = {};

  function getAccessToken() {
    return new Promise(function(resolve, reject) {
      FB.getLoginStatus(function(response) {
        console.log(response);
        var accessToken;
        if (response.status === 'not_authorized') {
          FB.login(function(response) {
            console.log(response);
            accessToken = response.authResponse.accessToken;
            console.log(accessToken);
            resolve(accessToken);
          });
        } else {
          accessToken = response.authResponse.accessToken;
          console.log(accessToken);
          resolve(accessToken);
        }
      });
    })
  }


  $scope.data.scrapeEmails = function() {
    console.log($scope.uploader);
    if($scope.uploader.file === undefined)  {
      alert("NO FILE HAS BEEN UPLOADED");
    } else {
      getAccessToken()
      .then(function(accessToken) {
        FB_API_Service.runEmailScraper(accessToken, $scope.uploader.file)
        .then(function(data) {
          var blob = new Blob([data.data], {type: 'text/csv' });
          var fileName = data.headers('content-disposition');
          FileSaver.saveAs(blob, fileName);
          $('input[type=file]').val(null)
        }).catch(function(error) {
          console.log(error);
        })
      }).catch(function(err) {
        console.log(err);
      })
    }

  };

}])
