'use strict';
const http = require('http');
const nodeStatic = require('@brettz9/node-static');
const fileServer = new nodeStatic.Server('./example');
const PORT = 8080;
const HOST = process.env.SERVE_HOST || 'localhost';
let server;

module.exports = {
  before: function (next) {
    server = http.createServer(function (request, response) {
        request.addListener('end', function () {
            fileServer.serve(request, response);
        }).resume();
    // Bind on 0.0.0.0 so the page is reachable on any interface (including LAN IP).
    // Set SERVE_HOST=<your-ip> to point Nightwatch at the LAN address instead of localhost.
    }).listen(PORT, '0.0.0.0', function() {
      console.log(`Server started at http://${HOST}:${PORT}`);
      next();
    });
  },

  after: function (next) {
    server.close();
    next();
  }
}
