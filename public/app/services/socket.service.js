app.factory('socket', ['$rootScope', '$state', 'localStorageService', function($rootScope, $state, localStorageService) {

  var url = $state.href('default', {}, {absolute: true});
  var socket = io.connect(url, { 'reconnection' : false });

  console.log(url, socket);
  socket.on('connect', function(data) {
    console.log('socket connect data:', data);
  })

  return {

    on: function (eventName, callback) {

      function wrapper() {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      }

      socket.on(eventName, wrapper);

      return function () {
        socket.removeListener(eventName, wrapper);
      };
    },

    emit: function (eventName, data, callback) {

      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if(callback) {
            callback.apply(socket, args);
          }
        });
      });

    }

  };

}])
