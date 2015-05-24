function copy(text) {
  var range = document.createRange();
  var newDiv = document.createElement("div");
  var newContent = document.createTextNode(text);
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv);
  range.selectNode(newDiv);
  window.getSelection().addRange(range);
  try {
    var successful = document.execCommand('copy');
    if (!successful) {
      console.error('copy command was unsuccessful');
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
    // Remove the selections - NOTE: Should use
    // removeRange(range) when it is supported
    document.body.removeChild(newDiv);
    window.getSelection().removeAllRanges();
  }
}
module.exports = copy;