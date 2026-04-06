// Type definitions for copy-to-clipboard 4.0
// Project: https://github.com/sudodoki/copy-to-clipboard
// Definitions by: Denis Carriere <https://github.com/DenisCarriere>, MartynasZilinskas <https://github.com/MartynasZilinskas>

interface Options {
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

declare function copy(text: string, options?: Options): Promise<boolean>;
declare namespace copy { }
export = copy;
export type { Options };
