'use strict';
module.exports = {
  'Multiline Text Copy' : function (browser) {
    browser
      .page.helper().resetBuffer()
      .url(browser.launchUrl)
      .waitForElementVisible('[data-test="init-multiline-text"]', 1000)
      .click('[data-test="init-multiline-text"]')
      .assert.assertBuffer("This would be\nsome multiline text\nfor us to copy")
      .end();
  }
};
