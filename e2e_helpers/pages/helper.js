'use strict';
const os = require('os');
const modificatorKey = (os.type().toLowerCase() === 'darwin')
 ? 'COMMAND'
 : 'CONTROL';

module.exports = function(browser) {
   return {
      resetBuffer: function (text) {
        return browser
          .url(browser.launchUrl)
          .waitForElementVisible('[data-test="placeholder"]', 500)
          .click('[data-test="placeholder"]')
          .keys(text || "some text to reset the clipboard")
          .pause(10)
          .keys([browser.Keys[modificatorKey], 'a'])
          .keys(browser.Keys[modificatorKey])
          .pause(10)
          .keys([browser.Keys[modificatorKey], 'c'])
          .keys(browser.Keys[modificatorKey])
          .keys(browser.Keys.DELETE)
          .pause(10);
      }
   }
}
