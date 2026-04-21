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
      function formatPromptMessage(message) {
        var isMac = navigator.userAgentData ? /mac/i.test(navigator.userAgentData.platform) : /mac os x/i.test(navigator.userAgent);
        var copyKey = (isMac ? "\u2318" : "Ctrl") + "+C";
        return message.replace(/#{\s*key\s*}/g, copyKey);
      }
      function buildClipboardItem(text, format) {
        var items = {};
        items["text/plain"] = new Blob([text], { type: "text/plain" });
        if (format && format !== "text/plain") {
          items[format] = new Blob([text], { type: format });
        }
        return new ClipboardItem(items);
      }
      async function copyViaClipboardAPI(text, options) {
        if (!options.format && !options.onCopy) {
          await navigator.clipboard.writeText(text);
          return true;
        }
        var item = buildClipboardItem(text, options.format);
        if (options.onCopy) {
          item = options.onCopy(item) || item;
        }
        await navigator.clipboard.write([item]);
        return true;
      }
      function createHiddenSpan(text, options) {
        var mark = document.createElement("span");
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
            e.clipboardData.setData(options.format, text);
          }
          if (options.onCopy) {
            options.onCopy(e.clipboardData);
          }
        });
        return mark;
      }
      function copyViaExecCommand(text, options) {
        var reselectPrevious = deselectCurrent();
        var range = document.createRange();
        var selection = document.getSelection();
        var mark = createHiddenSpan(text, options);
        var success = false;
        try {
          document.body.appendChild(mark);
          range.selectNodeContents(mark);
          selection.addRange(range);
          var successful = document.execCommand("copy");
          if (!successful) {
            throw new Error("copy command was unsuccessful");
          }
          success = true;
        } finally {
          if (typeof selection.removeRange == "function") {
            selection.removeRange(range);
          } else {
            selection.removeAllRanges();
          }
          document.body.removeChild(mark);
          reselectPrevious();
        }
        return success;
      }
      async function copy(text, options) {
        if (!options) {
          options = {};
        }
        var debug = options.debug || false;
        if (window.isSecureContext && navigator.clipboard) {
          try {
            return await copyViaClipboardAPI(text, options);
          } catch (err) {
            debug && console.error("unable to copy using navigator.clipboard: ", err);
            debug && console.warn("falling back to execCommand");
          }
        } else {
          debug && !window.isSecureContext && console.warn("copy-to-clipboard: navigator.clipboard requires a secure context (HTTPS/localhost). Falling back to execCommand.");
        }
        try {
          return copyViaExecCommand(text, options);
        } catch (err) {
          debug && console.error("unable to copy using execCommand: ", err);
          debug && console.error("falling back to prompt");
          if (options.fallbackToPrompt) {
            var message = formatPromptMessage("message" in options ? options.message : defaultMessage);
            window.prompt(message, text);
          }
        }
        return false;
      }
      module.exports = copy;
    }
  });
  return require_index();
})();
