'use strict';

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

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // allow-clipboard-read-write is needed for navigator.clipboard in automation
          // (execCommand path works without it, but the v4 async path requires it)
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
          prefs: {
            // grant clipboard-write permission without a prompt in automation
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
      // safaridriver ships with macOS; enable it once with: sudo safaridriver --enable
      desiredCapabilities: {
        browserName: 'safari'
      },
      webdriver: {
        start_process: true,
        server_path: '/usr/bin/safaridriver',
        port: 4445
      }
    }
  }
};
