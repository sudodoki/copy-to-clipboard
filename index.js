var deselectCurrent = require('toggle-selection');

function copy(text) {
  var reselectPrevious, selection, range, mark;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement('mark');
    mark.innerHTML = text;
    document.body.appendChild(mark);

    range.selectNode(mark);
    selection.addRange(range);

    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
  } catch (err) {
    console.error('unable to copy, trying IE specific stuff');
    try {
      window.clipboardData.setData('text', text);
    } catch (err) {
      console.error('unable to copy, falling back to prompt');
      window.prompt('Copy to clipboard: Ctrl+C, Enter', text);
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