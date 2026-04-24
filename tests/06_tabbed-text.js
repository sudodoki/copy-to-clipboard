'use strict';
// Regression: tab-separated values with CRLF line endings (issues #26, #31)
// Browsers normalize \r\n → \n when reading from textarea.value
module.exports = {
  'Tab+CRLF Text Copy' : function (browser) {
    browser
      .page.helper().resetBuffer()
      .url(browser.launchUrl)
      .waitForElementVisible('[data-test="init-tabbed-text"]', 1000)
      .click('[data-test="init-tabbed-text"]')
      .assert.assertBuffer("Dapibus\t1\nUltricies\t20\nInceptos\t444\n")
      .end();
  }
};
