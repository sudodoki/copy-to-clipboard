'use strict';
const http = require('http')
const nodeStatic = require('@brettz9/node-static');
const fileServer = new nodeStatic.Server('./example');
let server;
module.exports = {
  before: function (next) {
    console.log('Server started');
      server = http.createServer(function (request, response) {
          request.addListener('end', function () {
              fileServer.serve(request, response);
          }).resume();
      }).listen(8080);

      next()
  },
  after: function (next) {
    server.close();
    next()
  }
}
