const path = require('path');

module.exports = {
  'Basic Text Copy' : function (browser) {
    browser.page.helper().resetBuffer();
    browser.url(`file:///${path.resolve(process.cwd(), browser.launchUrl)}`)
      .waitForElementVisible('[data-test="init-basic-text"]', 1000)
      .click('[data-test="init-basic-text"]');
    browser.page.helper().assertBuffer("Hello, I'm new content from your clipboard");
    browser.end();
  }
};
