'use strict';
module.exports = {
  'Copy With Callback' : function (browser) {
    browser
      .page.helper().resetBuffer()
      .url(browser.launchUrl)
      .waitForElementVisible('[data-test="init-copy-with-callback"]', 1000)
      .click('[data-test="init-copy-with-callback"]')
      .assert.assertBuffer("copyToClipboard(\"Copy with callback\", { onCopy: noop })")
      .end();
  }
};
