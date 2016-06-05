const path = require('path');
const util = require('util');
const os = require('os');
const modificatorKey = (os.type().toLowerCase() === 'darwin')
  ? 'COMMAND'
  : 'CONTROL';

exports.assertion = function(expected, browser) {
  this.message = "Checking buffer contents";
  this.expected = expected;

  this.pass = function(value) {
    return value === expected
  };

  this.value = function(value) {
    return value;
  };
  // TODO: generate element instead of using eisting one?
  this.command = function(callback) {
    return this.api
      .url(`file:///${path.resolve(process.cwd(), this.api.launchUrl)}`)
      .waitForElementVisible('[data-test="placeholder"]', 10)
      .click('[data-test="placeholder"]')
      // This is not going to work in Chromedriver on Mac — https://bugs.chromium.org/p/chromedriver/issues/detail?id=30
      .keys([this.api.Keys[modificatorKey], 'v'])
      .pause(10)
      .keys(this.api.Keys[modificatorKey])
      .pause(10)
      .getValue('[data-test="placeholder"]', function(result) {
         callback(result.value)
      });
  };

};
