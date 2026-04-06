'use strict';
const getModifierKey = require('../modifier-key');

exports.assertion = function(expected) {
  this.message = "Checking rich buffer contents (innerHTML)";
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
      .waitForElementVisible('[data-test="rich-placeholder"]', 500)
      // Clear existing content first
      .execute(function() {
        document.querySelector('[data-test="rich-placeholder"]').innerHTML = '';
      })
      .click('[data-test="rich-placeholder"]')
      .perform(function() {
        const key = this.Keys[getModifierKey()];
        return this.actions()
          .keyDown(key).sendKeys('v').keyUp(key)
          .perform();
      })
      .waitUntil(async function() {
        const result = await this.execute(function() {
          return document.querySelector('[data-test="rich-placeholder"]').innerHTML;
        });
        return result !== '';
      }, parseInt(process.env.ASSERT_BUFFER_TIMEOUT, 10) || 500)
      .execute(function() {
        return document.querySelector('[data-test="rich-placeholder"]').innerHTML;
      }, [], function(result) {
        callback(result.value);
      });
  };
};
