function copy(text) {
  var range = document.createRange();
  var newDiv = document.createElement("div");
  var newContent = document.createTextNode(text);
  var selection = window.getSelection();
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv);
  range.selectNode(newDiv);
  selection.addRange(range);
  try {
    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
  } catch(err) {
    console.error('unable to copy, trying IE specific stuff');
    try {
      window.clipboardData.setData("Text", text);
    } catch(err) {
      console.error('unable to copy, fallback to prompt');
      window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }
  } finally {
    if (typeof selection.removeRange == 'function') {
      selection.removeRange(range);
    } else {
      selection.removeAllRanges();
    }
    document.body.removeChild(newDiv);
  }
}
module.exports = copy;