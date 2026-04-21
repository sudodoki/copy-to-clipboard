'use strict';

/** @type {import('tsup').Options} */
module.exports = {
  entry: ['index.ts'],
  format: ['cjs', 'esm', 'iife'],
  outDir: 'dist',
  dts: true,
  outExtension({ format }) {
    if (format === 'cjs') return { js: '.cjs' };
    if (format === 'esm') return { js: '.mjs' };
    return { js: '.global.js' }; // dist/index.global.js for <script> use
  },
  platform: 'browser',
  globalName: 'copyToClipboard',
  footer({ format }) {
    if (format === 'iife') return { js: 'copyToClipboard = copyToClipboard.default;' };
  },
  clean: true,
  minify: false,
  noExternal: ['toggle-selection'],
};
