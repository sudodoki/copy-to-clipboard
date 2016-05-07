var deselectCurrent = require('toggle-selection');

function copy(text, options) {
  var debug, copyKey, message, cb, reselectPrevious, range, selection, mark;
  if (!options) { options = {}; }
  debug = options.debug || false;
  copyKey = /mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl';
  message = options.message || 'Copy to clipboard: ' + copyKey + '+C, Enter';
  cb = options.cb || Function.prototype;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement('mark');
    mark.textContent = text;
    // used to conserve newline, etc
    mark.style.whiteSpace = 'pre';
    document.body.appendChild(mark);

    range.selectNode(mark);
    selection.addRange(range);

    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
  } catch (err) {
    debug && console.error('unable to copy, trying IE specific stuff');
    try {
      window.clipboardData.setData('text', text);
    } catch (err) {
      debug && console.error('unable to copy, falling back to prompt');
      window.prompt(message, text);

    }
  } finally {
    cb(null);
    if (selection) {
      if (typeof selection.removeRange == 'function') {
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
}

module.exports = copy;
