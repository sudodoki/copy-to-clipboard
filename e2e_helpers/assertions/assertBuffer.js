'use strict';
const util = require('util');
const os = require('os');

const modificatorKey = (() => {
  const usesCommandKey = () =>
    (process.env.REMOTE_SELENIUM
      ? (process.env.E2E_PLATFORM || '').match(/os\sx/i)
      : os.type().toLowerCase() === 'darwin')

  return usesCommandKey()
    ? 'COMMAND'
    : 'CONTROL';
})()

exports.assertion = function(expected) {
  this.message = "Checking buffer contents";
  this.expected = (expected instanceof RegExp) ? "to match " + expected : expected;

  this.pass = function(value) {
    return (expected instanceof RegExp)
      ? expected.test(value)
      : value === expected
  };

  this.value = function(value) {
    return value;
  };
  // TODO: generate element instead of using eisting one?
  this.command = function(callback) {
    return this.api
      .url(this.api.launchUrl)
      .waitForElementVisible('[data-test="placeholder"]', 500)
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
