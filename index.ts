"use strict";

import deselectCurrent from 'toggle-selection';

var defaultMessage = "Copy to clipboard: #{key}, Enter";

export interface Options {
  debug?: boolean;
  message?: string;
  format?: string; // MIME type
  /**
   * Intercept and optionally replace the clipboard item before writing.
   *
   * - On the async path (`navigator.clipboard`): receives a `ClipboardItem` and
   *   may return a new `ClipboardItem` to replace it.
   * - On the execCommand fallback path: receives the `DataTransfer` object from
   *   the copy event. Return value is ignored; use `clipboardData.setData()` to
   *   override content (requires `options.format` to be set so `preventDefault`
   *   is called).
   */
  onCopy?: (clipboardData: ClipboardItem | DataTransfer) => ClipboardItem | void;
  /**
   * Enable the `window.prompt()` fallback when both `navigator.clipboard` and
   * `execCommand` fail. Off by default in v4.
   */
  fallbackToPrompt?: boolean;
}

function formatPromptMessage(message: string): string {
  var isMac = navigator.userAgentData
    ? /mac/i.test(navigator.userAgentData.platform)
    : /mac os x/i.test(navigator.userAgent);
  var copyKey = (isMac ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function buildClipboardItem(text: string, format?: string): ClipboardItem {
  var items: Record<string, Blob> = {};
  items['text/plain'] = new Blob([text], { type: 'text/plain' });
  if (format && format !== 'text/plain') {
    items[format] = new Blob([text], { type: format });
  }
  return new ClipboardItem(items);
}

async function copyViaClipboardAPI(text: string, options: Options): Promise<boolean> {
  if (!options.format && !options.onCopy) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  var item = buildClipboardItem(text, options.format);
  if (options.onCopy) {
    item = (options.onCopy(item) as ClipboardItem) || item;
  }
  await navigator.clipboard.write([item]);
  return true;
}

function createHiddenSpan(text: string, options: Options): HTMLSpanElement {
  var mark = document.createElement("span");
  mark.textContent = text;
  // avoid screen readers from reading out loud the text
  mark.ariaHidden = "true";
  // reset user styles for span element
  mark.style.all = "unset";
  // prevents scrolling to the end of the page
  mark.style.position = "fixed";
  mark.style.top = "0";
  mark.style.clip = "rect(0, 0, 0, 0)";
  // used to preserve spaces and line breaks
  mark.style.whiteSpace = "pre";
  // do not inherit user-select (it may be `none`)
  mark.style.webkitUserSelect = "text";
  (mark.style as CSSStyleDeclaration & { MozUserSelect: string }).MozUserSelect = "text";
  (mark.style as CSSStyleDeclaration & { msUserSelect: string }).msUserSelect = "text";
  mark.style.userSelect = "text";
  mark.addEventListener("copy", function(e: ClipboardEvent) {
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

function findOpenedModalDialog(): Element | null {
  let element = document.activeElement as Element | null;
  while (element) {
    if (element.tagName === 'DIALOG' && (element as HTMLDialogElement).open) {
      return element;
    }
    element = element.parentElement;
  }
  return null;
}

function copyViaExecCommand(text: string, options: Options): boolean {
  var reselectPrevious = deselectCurrent();
  var range = document.createRange();
  var selection = document.getSelection();
  var mark = createHiddenSpan(text, options);
  var root = findOpenedModalDialog() || document.body;
  var success = false;

  try {
    root.appendChild(mark);
    range.selectNodeContents(mark);
    selection!.removeAllRanges();
    selection!.addRange(range);

    var successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } finally {
    if (typeof selection!.removeRange == "function") {
      selection!.removeRange(range);
    } else {
      selection!.removeAllRanges();
    }
    root.removeChild(mark);
    reselectPrevious();
  }

  return success;
}

async function copy(text: string, options: Options = {}): Promise<boolean> {
  var debug = options.debug || false;

  // --- Async Clipboard API path (secure context only) ---
  if (window.isSecureContext && navigator.clipboard) {
    try {
      return await copyViaClipboardAPI(text, options);
    } catch (err) {
      debug && console.error("unable to copy using navigator.clipboard: ", err);
      debug && console.warn("falling back to execCommand");
    }
  } else {
    debug && !window.isSecureContext &&
      console.warn("copy-to-clipboard: navigator.clipboard requires a secure context (HTTPS/localhost). Falling back to execCommand.");
  }

  // --- execCommand fallback ---
  try {
    return copyViaExecCommand(text, options);
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.error("falling back to prompt");
    if (options.fallbackToPrompt) {
      var message = formatPromptMessage("message" in options ? options.message! : defaultMessage);
      window.prompt(message, text);
    }
  }

  return false;
}

export default copy;
