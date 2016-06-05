const path = require('path');
const os = require('os');
const modificatorKey = (os.type().toLowerCase() === 'darwin')
 ? 'COMMAND'
 : 'CONTROL';

module.exports = function(browser) {
   return {
      resetBuffer: function (text) {
        return browser
          .url(`file:///${path.resolve(process.cwd(), browser.launchUrl)}`)
          .waitForElementVisible('[data-test="placeholder"]', 10)
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
