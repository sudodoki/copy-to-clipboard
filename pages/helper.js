const path = require('path');
const os = require('os');
const modificatorKey = (os.type().toLowerCase() === 'darwin')
  ? 'COMMAND'
  : 'CONTROL';
module.exports = function(browser) {
    function dumpBuffer() {
      return browser
        .url(`file:///${path.resolve(process.cwd(), browser.launchUrl)}`)
        .waitForElementVisible('[data-test="placeholder"]', 10)
        .click('[data-test="placeholder"]')
        .keys(browser.Keys[modificatorKey])
        .keys('v')
        .keys(browser.Keys[modificatorKey]);
    }
    return {
       resetBuffer: function (text) {
          return browser
            .url(`file:///${path.resolve(process.cwd(), browser.launchUrl)}`)
            .waitForElementVisible('[data-test="placeholder"]', 10)
            .click('[data-test="placeholder"]')
            .keys(text || "some text to reset the clipboard")
            .pause(10)
            .keys(browser.Keys[modificatorKey])
            .keys('a')
            .keys(browser.Keys[modificatorKey])
            .keys(null)
            .pause(10)
            .keys(browser.Keys[modificatorKey])
            .keys('c')
            .keys(browser.Keys[modificatorKey])
            .keys(browser.Keys.DELETE)
            .pause(10);
        },
        dumpBuffer: dumpBuffer,
        assertBuffer: function(text) {
          dumpBuffer();
          browser.getValue('[data-test="placeholder"]', function(result) {
            this.assert.equal(typeof result, "object");
            this.assert.equal(result.status, 0);
            this.assert.equal(result.value, text);
          });
        }
    }
}
