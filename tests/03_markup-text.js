const path = require('path');

module.exports = {
  'Text w/ Markup Copy' : function (browser) {
    browser.page.helper().resetBuffer();
    browser.url(`file:///${path.resolve(process.cwd(), browser.launchUrl)}`)
      .waitForElementVisible('[data-test="init-markup-text"]', 1000)
      .click('[data-test="init-markup-text"]');
    browser.page.helper().assertBuffer("<script>\n  alert('this is some script')\n</script>\n");
    browser.end();
  }
};
