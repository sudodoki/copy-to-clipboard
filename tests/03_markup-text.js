'use strict';
module.exports = {
  'Text w/ Markup Copy' : function (browser) {
    browser
      .page.helper().resetBuffer()
      .url(browser.launchUrl)
      .waitForElementVisible('[data-test="init-markup-text"]', 1000)
      .click('[data-test="init-markup-text"]')
      // using regexp instead of actual match because of chrome issue
      .assert.assertBuffer(/<script>\n\s+alert\('this is some script'\)\n<\/script>\n*/m)
      .end();
  }
};
