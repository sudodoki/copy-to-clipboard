// Type definitions for copy-to-clipboard 3.0
// Project: https://github.com/sudodoki/copy-to-clipboard
// Definitions by: Denis Carriere <https://github.com/DenisCarriere>, MartynasZilinskas <https://github.com/MartynasZilinskas>

interface Options {
  /**
   * Enable output to console.
   * 
   * @default false
   */
  debug?: boolean;
  /**
   * Enable prompt fallback.
   * 
   * @default true
   */
  prompt?: boolean;
  /**
   * Prompt message.
   * 
   * @default 'Copy to clipboard: `#{key}`, Enter'
   */
  message?: string;
  /**
   * Set the MIME type of what you want to copy as. 
   * 
   * Use `text/html` to copy as HTML, `text/plain` to avoid inherited styles showing when pasted into rich text editor. 
   * 
   * @default 'text/plain'
   */
  format?: string; // MIME type
  /**
   * 
   * Receives the clipboardData element for adding custom behavior such as additional formats.
   */
  onCopy?: (clipboardData: DataTransfer | null) => void;
}

/**
 * 
 * @example
 * ```
 * import copy from 'copy-to-clipboard';
 * 
 * copy('Text');
 * 
 * // Copy with options
 * copy('Text', {
 *   debug: true,
 *   message: 'Press #{key} to copy',
 * });
 * ```
 */
declare function copy(text: string, options?: Options): boolean;
declare namespace copy { }
export = copy;
