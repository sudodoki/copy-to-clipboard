'use strict';

/** @type {import('tsup').Options} */
module.exports = {
  entry: ['index.js'],
  format: ['cjs', 'esm', 'iife'],
  outDir: 'dist',
  outExtension({ format }) {
    if (format === 'cjs') return { js: '.cjs' };
    if (format === 'esm') return { js: '.mjs' };
    return { js: '.global.js' }; // dist/index.global.js for <script> use
  },
  platform: 'browser',
  globalName: 'copyToClipboard',
  clean: true,
  minify: false,
  noExternal: ['toggle-selection'],
};
