'use strict';
module.exports = {
  'Copy inside fullscreen element': function (browser) {
    browser
      .page.helper().resetBuffer()
      .url(browser.launchUrl)
      .waitForElementVisible('[data-test="open-fullscreen"]', 1000)
      .click('[data-test="open-fullscreen"]')
      .waitForElementVisible('[data-test="copy-inside-fullscreen"]', 2000)
      .click('[data-test="copy-inside-fullscreen"]')
      .click('[data-test="exit-fullscreen"]')
      .assert.assertBuffer("Hello from fullscreen")
      .end();
  }
};
