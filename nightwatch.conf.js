'use strict';

// Builds a LambdaTest remote environment block.
// To target a different OS, browser version, or mobile device visit:
// https://www.lambdatest.com/capabilities-generator/
function ltEnv(browserName, browserVersion, platformName, testName) {
  return {
    selenium: {
      host: 'hub.lambdatest.com',
      port: 443,
      ssl: true,
      default_path_prefix: '/wd/hub'
    },
    webdriver: {
      start_process: false,
      timeout_options: { timeout: 60000, retry_attempts: 3 }
    },
    desiredCapabilities: {
      browserName,
      browserVersion,
      'LT:Options': {
        username: process.env.LT_USERNAME,
        accessKey: process.env.LT_ACCESS_KEY,
        platformName,
        project: 'copy-to-clipboard',
        build: process.env.NIGHTWATCH_BUILD || 'local',
        name: testName,
        tunnel: true,
        tunnelName: 'nightwatch-tunnel',
        w3c: true,
        plugin: 'node_js-nightwatch'
      }
    }
  };
}

module.exports = {
  src_folders: ['tests'],
  output_folder: 'reports',
  page_objects_path: ['e2e_helpers/pages'],
  custom_commands_path: ['e2e_helpers/commands'],
  custom_assertions_path: ['e2e_helpers/assertions'],
  globals_path: 'e2e_helpers/globals.js',

  test_settings: {
    default: {
      launch_url: 'http://localhost:8080',
      screenshots: {
        enabled: true,
        path: 'reports'
      }
    },

    // ── Local browsers ──────────────────────────────────────────────────────

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // Required for navigator.clipboard in automation (used by v4 async path)
          args: ['--allow-clipboard-read-write']
        }
      },
      webdriver: {
        start_process: true,
        server_path: require('chromedriver').path,
        port: 9515
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          // Run headless on CI (DISPLAY not available on Ubuntu runners)
          args: process.env.CI ? ['-headless'] : [],
          prefs: {
            // Enable ClipboardItem API (needed for v4 async path)
            'dom.events.asyncClipboard.clipboardItem': true
          }
        }
      },
      webdriver: {
        start_process: true,
        server_path: require('geckodriver').path,
        port: 4444
      }
    },

    safari: {
      // Requires "Allow Remote Automation" enabled in Safari → Develop menu.
      // See: https://developer.apple.com/documentation/webkit/testing-with-webdriver-in-safari
      desiredCapabilities: {
        browserName: 'safari'
      },
      webdriver: {
        start_process: true,
        server_path: '/usr/bin/safaridriver',
        port: 4445
      }
    },

    // ── LambdaTest cloud browsers ────────────────────────────────────────────
    // Credentials are read from LT_USERNAME / LT_ACCESS_KEY environment variables.
    // Tests reach localhost:8080 on the CI runner through the LambdaTest Tunnel.
    //
    // To test on a different OS, browser version, or mobile device:
    //   1. Open https://www.lambdatest.com/capabilities-generator/
    //   2. Pick OS + browser + version
    //   3. Copy the generated platformName / browserName / browserVersion values
    //   4. Add or replace an ltEnv() call below
    //
    // Mobile example (Appium):
    //   lambdatest_ios: {
    //     ...ltEnv(/* ignored – override desiredCapabilities below */),
    //     desiredCapabilities: {
    //       browserName: 'Safari',
    //       'LT:Options': {
    //         username: process.env.LT_USERNAME,
    //         accessKey: process.env.LT_ACCESS_KEY,
    //         deviceName: 'iPhone 15',
    //         platformName: 'iOS',
    //         platformVersion: '17',
    //         isRealMobile: false,
    //         tunnel: true,
    //         tunnelName: 'nightwatch-tunnel',
    //         w3c: true
    //       }
    //     }
    //   }

    lambdatest_firefox: ltEnv('Firefox', 'latest', 'Windows 11', 'Firefox Latest'),

    lambdatest_chrome: ltEnv('Chrome', 'latest', 'Windows 11', 'Chrome Latest'),

    // Safari runs on macOS only; LambdaTest hosts it on macOS Sequoia
    lambdatest_safari: ltEnv('Safari', 'latest', 'macOS Sequoia', 'Safari Latest'),

    // Edge (successor to Internet Explorer); for IE 11 use browserName: 'internet explorer'
    // and platformName: 'Windows 10' — note IE 11 receives no security updates since 2022
    lambdatest_edge: ltEnv('MicrosoftEdge', 'latest', 'Windows 11', 'Edge Latest')
  }
};
