'use strict';
module.exports = {
  'Rich Text (HTML) Copy' : function (browser) {
    browser
      .page.helper().resetBuffer()
      .url(browser.launchUrl)
      .waitForElementVisible('[data-test="init-rich-text"]', 1000)
      .click('[data-test="init-rich-text"]')
      // HTML paste target is a contenteditable div, not a textarea
      .assert.assertRichBuffer(/<b>|<i>|<strong>|<em>/i)
      .end();
  }
};
