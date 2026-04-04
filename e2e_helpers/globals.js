'use strict';
const fs = require('fs');
const http = require('http');
const path = require('path');
const nodeStatic = require('@brettz9/node-static');
const fileServer = new nodeStatic.Server('./example');
const PORT = 8080;
const HOST = process.env.SERVE_HOST || 'localhost';
const SELENIUM_LOG = path.join('reports', 'lambda-logs-selenium.log');
let server;

module.exports = {
  before: function (next) {
    fs.mkdirSync('reports', { recursive: true });
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

  afterEach: function (browser, done) {
    browser.getLog('driver', function (entries) {
      if (!entries || entries.length === 0) return done();
      const header = `\n=== ${browser.currentTest.module} / ${browser.currentTest.name} ===\n`;
      const body = entries.map(e =>
        `[${new Date(e.timestamp).toISOString()}] ${e.level.padEnd(7)} ${e.message}`
      ).join('\n') + '\n';
      fs.appendFileSync(SELENIUM_LOG, header + body);
      done();
    });
  },

  after: function (next) {
    server.close();
    next();
  }
}
