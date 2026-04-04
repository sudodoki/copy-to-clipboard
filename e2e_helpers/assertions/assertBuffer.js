'use strict';
const os = require('os');

const modificatorKey = (() => {
  const usesCommandKey = () =>
    (process.env.REMOTE_SELENIUM
      ? (process.env.E2E_PLATFORM || '').match(/os\sx/i)
      : os.type().toLowerCase() === 'darwin')

  return usesCommandKey() ? 'COMMAND' : 'CONTROL';
})();

exports.assertion = function(expected) {
  this.message = "Checking buffer contents";
  this.expected = (expected instanceof RegExp) ? "to match " + expected : expected;

  this.pass = function(value) {
    return (expected instanceof RegExp)
      ? expected.test(value)
      : value === expected;
  };

  this.value = function(value) {
    return value;
  };

  this.command = function(callback) {
    return this.api
      .url(this.api.launchUrl)
      .waitForElementVisible('[data-test="placeholder"]', 500)
      .click('[data-test="placeholder"]')
      .perform(function() {
        const key = modificatorKey === 'COMMAND' ? this.Keys.COMMAND : this.Keys.CONTROL;
        return this.actions()
          .keyDown(key).sendKeys('v').keyUp(key)
          .perform();
      })
      .pause(100)
      .getValue('[data-test="placeholder"]', function(result) {
        callback(result.value);
      });
  };
};
