const path = require('path');
module.exports = {
  'Sanity check' : function (browser) {
    browser
      .url(`file:///${path.resolve(process.cwd(), browser.launchUrl)}`)
      // uncomment for debug purposes
      // .getLogTypes(function(result) {
      //   console.log(result);
      // })
      // .getLog('browser', function(result) {
      //   console.log(result);
      // })
      .waitForElementVisible('body', 1000)
      .assert.containsText('[data-test="heading"]', 'copy-to-clipboard Repo')
      .end();
  }
};
