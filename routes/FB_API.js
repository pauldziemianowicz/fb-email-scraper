module.exports = function(io) {

  var express = require('express');
  var router = express.Router();
  var path = require('path');
  var csv = require('csv');
  var bPromise = require('bluebird');
  var request = require('request');
  // var tilde = require('tilde-expansion');
  // var archiver = require('archiver');
  // var mkdirp = require('mkdirp');
  // var fs = require('fs');
  // var fsE = require('fs-extra');

  io.on('connection', function(socket) {
    console.log('Client Connected to Socket in /FB-API Route', socket.id);


    router.post('/run-email-scraper', function(req, res, next) {
      console.log('inside email scraper');
      console.log(req.body.accessToken);

      csv.parse(req.body.inputFile, function(err, output) {
        var CHs = output[0]
        var dataRows = output.slice(1);
        var URLsIndex = CHs.indexOf('URLs');

        bPromise.each(dataRows, function(e, i, l) {
          var splitURL = e[URLsIndex].split('/');
          var pageCodeName = splitURL[splitURL.length-2];

          // formulate request
          var options = {method: 'GET', url: 'https://graph.facebook.com/' + pageCodeName + '?fields=emails', headers: {'Authorization': 'OAuth ' + req.body.accessToken}}
          request(options, function(err, httpResponse, body) {
            if (err) {
              console.log('request err:', err);
            } else {
              console.log('body:', body);
            }
          })

        })
      })

    });

  })


  return router;
}
