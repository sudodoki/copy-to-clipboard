'use strict';
module.exports = {
  'Copy inside modal dialog': function(browser) {
    browser
      .page.helper().resetBuffer()
      .url(browser.launchUrl)
      .waitForElementVisible('[data-test="open-modal-dialog"]', 1000)
      .click('[data-test="open-modal-dialog"]')
      .waitForElementVisible('[data-test="copy-inside-dialog"]', 1000)
      .click('[data-test="copy-inside-dialog"]')
      .click('[data-test="close-dialog"]')
      .assert.assertBuffer("Hello from dialog")
      .end();
  }
};
