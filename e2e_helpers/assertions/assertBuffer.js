'use strict';
const getModifierKey = require('../modifier-key');

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
        const key = this.Keys[getModifierKey()];
        return this.actions()
          .keyDown(key).sendKeys('v').keyUp(key)
          .perform();
      })
      .waitUntil(async function() {
        const value = await this.getValue('[data-test="placeholder"]');
        return value !== '';
      }, parseInt(process.env.ASSERT_BUFFER_TIMEOUT, 10) || 500)
      .getValue('[data-test="placeholder"]', function(result) {
        callback(result.value);
      });
  };
};
