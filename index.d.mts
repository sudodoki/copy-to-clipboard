// Type definitions for copy-to-clipboard 4.0
// Project: https://github.com/sudodoki/copy-to-clipboard

interface Options {
  debug?: boolean;
  message?: string;
  format?: string; // MIME type
  onCopy?: (clipboardData: object) => void;
}

declare function copy(text: string, options?: Options): boolean;

export default copy;
export type { Options };
