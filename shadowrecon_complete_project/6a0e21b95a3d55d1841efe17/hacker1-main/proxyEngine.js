/**
 * proxyEngine.js
 *
 * This project originally shipped with empty placeholder module files which caused confusion
 * and made maintenance harder. The production traffic-capture implementation currently lives
 * in `main.js` (Electron main process) because it must hook Electron Sessions.
 *
 * This file provides shared helpers so the proxy engine can be cleanly refactored out of
 * `main.js` without changing behavior.
 *
 * NOTE: This is a PASSIVE traffic capture layer for the app's own embedded browsing context
 * (the BrowserWindow + <webview> partition). It is NOT a MITM proxy and does not modify traffic.
 */

function safeBytesToString(bytes, maxLen = 2048) {
  try {
    if (!bytes) return null;
    const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
    const s = buf.toString("utf8");
    return s.length > maxLen ? s.slice(0, maxLen) + "…(truncated)" : s;
  } catch {
    return null;
  }
}

module.exports = {
  safeBytesToString,
};
