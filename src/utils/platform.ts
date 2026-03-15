const safePlatform = window.navigator?.platform ?? "";
export const isWindows = ["Win32", "Win64", "Windows", "WinCE"].indexOf(safePlatform) > -1;
export const isMac = ["Mac68K", "MacPPC", "Macintosh", "MacIntel"].indexOf(safePlatform) > -1;
export const isLinux = ["Linux", "X11"].indexOf(safePlatform) > -1;
export const isChrome = navigator.userAgent.includes("Chrome");
// Safari on macOS, iOS, and visionOS all include "Safari" but not "Chrome"
export const isSafari = !navigator.userAgent.includes("Chrome") && navigator.userAgent.includes("Safari");
// WebSpatial App Shell (e.g. visionOS) uses UA "WebSpatial/..." and html.is-spatial when XR_ENV=avp
export const isSpatialContext =
  typeof document !== "undefined" &&
  (document.documentElement?.classList?.contains("is-spatial") || navigator.userAgent.includes("WebSpatial"));

export const isSupportedBrowser = isChrome || isSafari || isSpatialContext;
