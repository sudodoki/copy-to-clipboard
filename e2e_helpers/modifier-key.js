'use strict';
const os = require('os');

// Returns 'COMMAND' or 'CONTROL' for use with this.Keys[getModifierKey()].
// Set MODIFIER_KEY=COMMAND in CI when the runner OS differs from the remote browser OS
// (e.g. Linux runner targeting LambdaTest Safari on macOS).
function getModifierKey() {
  return process.env.MODIFIER_KEY ||
    (os.type().toLowerCase() === 'darwin' ? 'COMMAND' : 'CONTROL');
}

module.exports = getModifierKey;
