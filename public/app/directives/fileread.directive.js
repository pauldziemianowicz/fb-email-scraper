app.directive('fileread', function() {
  return {
    restrict: 'A',
    scope: {
      fileread: "=",
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        var reader = new FileReader();
        // console.log(changeEvent.target.files[0]);
        reader.readAsDataURL(changeEvent.target.files[0]);
        reader.onload = function(loadEvent) {
          // console.log(loadEvent);
          var atobStartIndex = loadEvent.target.result.indexOf('base64') + 7;
          var csvFile = window.atob(loadEvent.target.result.substring(atobStartIndex));
          // console.log(csvFile);
          scope.$apply(function () {
            scope.fileread = csvFile;
          });
        }
      });
    },
  }
})
