"use strict";
var copyToClipboard = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/toggle-selection/index.js
  var require_toggle_selection = __commonJS({
    "node_modules/toggle-selection/index.js"(exports, module) {
      "use strict";
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

  // index.ts
  var index_exports = {};
  __export(index_exports, {
    default: () => index_default
  });

  // node_modules/toggle-selection/index.mjs
  var import_index = __toESM(require_toggle_selection(), 1);
  var toggle_selection_default = import_index.default;

  // index.ts
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
    mark.style.top = "0";
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
        if (e.clipboardData) {
          e.clipboardData.setData(options.format, text);
        }
      }
      if (options.onCopy && e.clipboardData) {
        options.onCopy(e.clipboardData);
      }
    });
    return mark;
  }
  function findOpenedModalDialog() {
    let element = document.activeElement;
    while (element) {
      if (element.tagName === "DIALOG" && element.open) {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  }
  function copyViaExecCommand(text, options) {
    var reselectPrevious = toggle_selection_default();
    var range = document.createRange();
    var selection = document.getSelection();
    var mark = createHiddenSpan(text, options);
    var root = findOpenedModalDialog() || document.body;
    var success = false;
    try {
      root.appendChild(mark);
      range.selectNodeContents(mark);
      selection.removeAllRanges();
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
      root.removeChild(mark);
      reselectPrevious();
    }
    return success;
  }
  async function copy(text, options = {}) {
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
  var index_default = copy;
  return __toCommonJS(index_exports);
})();
copyToClipboard = copyToClipboard.default;
