const path = require('path');

module.exports = {
  'Multiline Text Copy' : function (browser) {
    browser.page.helper().resetBuffer();
    browser.url(`file:///${path.resolve(process.cwd(), browser.launchUrl)}`)
      .waitForElementVisible('[data-test="init-multiline-text"]', 1000)
      .click('[data-test="init-multiline-text"]');
    browser.page.helper().assertBuffer("This would be\nsome multiline text\nfor us to copy");
    browser.end();
  }
};
