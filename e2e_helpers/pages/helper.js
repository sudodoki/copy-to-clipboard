'use strict';
const getModifierKey = require('../modifier-key');

module.exports = {
  commands: [{
    resetBuffer(text) {

      return this.api
        .url(this.api.launchUrl)
        .waitForElementVisible('[data-test="placeholder"]', 500)
        .click('[data-test="placeholder"]')
        .sendKeys('[data-test="placeholder"]', text || 'some text to reset the clipboard')
        .pause(50)
        .perform(function() {
          const key = this.Keys[getModifierKey()];
          return this.actions()
            .keyDown(key).sendKeys('a').keyUp(key)
            .perform();
        })
        .pause(50)
        .perform(function() {
          const key = this.Keys[getModifierKey()];
          return this.actions()
            .keyDown(key).sendKeys('c').keyUp(key)
            .perform();
        })
        .pause(50)
        .clearValue('[data-test="placeholder"]')
        .pause(50);
    }
  }]
};
