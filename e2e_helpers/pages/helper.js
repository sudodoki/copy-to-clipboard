'use strict';
const os = require('os');

module.exports = {
  commands: [{
    resetBuffer(text) {
      const isMac = os.type().toLowerCase() === 'darwin';

      return this.api
        .url(this.api.launchUrl)
        .waitForElementVisible('[data-test="placeholder"]', 500)
        .click('[data-test="placeholder"]')
        .sendKeys('[data-test="placeholder"]', text || 'some text to reset the clipboard')
        .pause(50)
        .perform(function() {
          const key = isMac ? this.Keys.COMMAND : this.Keys.CONTROL;
          return this.actions()
            .keyDown(key).sendKeys('a').keyUp(key)
            .perform();
        })
        .pause(50)
        .perform(function() {
          const key = isMac ? this.Keys.COMMAND : this.Keys.CONTROL;
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
