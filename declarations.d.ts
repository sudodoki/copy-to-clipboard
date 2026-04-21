declare module 'toggle-selection' {
  function deselectCurrent(): () => void;
  export default deselectCurrent;
}

// navigator.userAgentData is a User-Agent Client Hints API not yet in TypeScript's DOM lib
interface NavigatorUAData {
  readonly platform: string;
}

interface Navigator {
  readonly userAgentData?: NavigatorUAData;
}
