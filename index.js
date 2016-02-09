var deselectCurrent = require('toggle-selection');

function copy(text, options) {
  var reselectPrevious, selection, range, mark, debug, message;
  debug = options.debug || false;
  message = options.message || 'Copy to clipboard: Ctrl+C, Enter';

  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement('mark');
    mark.innerText = text;
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
