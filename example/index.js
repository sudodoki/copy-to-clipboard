"use strict";
var copyToClipboard = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/toggle-selection/index.js
  var require_toggle_selection = __commonJS({
    "node_modules/toggle-selection/index.js"(exports, module) {
      module.exports = function() {
        var selection = document.getSelection();
        if (!selection.rangeCount) {
          return function() {
          };
        }
        var active = document.activeElement;
        var ranges = [];
        for (var i = 0; i < selection.rangeCount; i++) {
          ranges.push(selection.getRangeAt(i));
        }
        switch (active.tagName.toUpperCase()) {
          // .toUpperCase handles XHTML
          case "INPUT":
          case "TEXTAREA":
            active.blur();
            break;
          default:
            active = null;
            break;
        }
        selection.removeAllRanges();
        return function() {
          selection.type === "Caret" && selection.removeAllRanges();
          if (!selection.rangeCount) {
            ranges.forEach(function(range) {
              selection.addRange(range);
            });
          }
          active && active.focus();
        };
      };
    }
  });

  // index.js
  var require_index = __commonJS({
    "index.js"(exports, module) {
      var deselectCurrent = require_toggle_selection();
      var defaultMessage = "Copy to clipboard: #{key}, Enter";
      function format(message) {
        var copyKey = (/mac os x/i.test(navigator.userAgent) ? "\u2318" : "Ctrl") + "+C";
        return message.replace(/#{\s*key\s*}/g, copyKey);
      }
      function copy(text, options) {
        var debug, message, reselectPrevious, range, selection, mark, success = false;
        if (!options) {
          options = {};
        }
        debug = options.debug || false;
        try {
          reselectPrevious = deselectCurrent();
          range = document.createRange();
          selection = document.getSelection();
          mark = document.createElement("span");
          mark.textContent = text;
          mark.ariaHidden = "true";
          mark.style.all = "unset";
          mark.style.position = "fixed";
          mark.style.top = 0;
          mark.style.clip = "rect(0, 0, 0, 0)";
          mark.style.whiteSpace = "pre";
          mark.style.webkitUserSelect = "text";
          mark.style.MozUserSelect = "text";
          mark.style.msUserSelect = "text";
          mark.style.userSelect = "text";
          mark.addEventListener("copy", function(e) {
            e.stopPropagation();
            if (options.format) {
              e.preventDefault();
              e.clipboardData.clearData();
              e.clipboardData.setData(options.format, text);
            }
            if (options.onCopy) {
              e.preventDefault();
              options.onCopy(e.clipboardData);
            }
          });
          document.body.appendChild(mark);
          range.selectNodeContents(mark);
          selection.addRange(range);
          var successful = document.execCommand("copy");
          if (!successful) {
            throw new Error("copy command was unsuccessful");
          }
          success = true;
        } catch (err) {
          debug && console.error("unable to copy using execCommand: ", err);
          debug && console.error("falling back to prompt");
          message = format("message" in options ? options.message : defaultMessage);
          window.prompt(message, text);
        } finally {
          if (selection) {
            if (typeof selection.removeRange == "function") {
              selection.removeRange(range);
            } else {
              selection.removeAllRanges();
            }
          }
          if (mark) {
            document.body.removeChild(mark);
          }
          reselectPrevious();
        }
        return success;
      }
      module.exports = copy;
    }
  });
  return require_index();
})();
