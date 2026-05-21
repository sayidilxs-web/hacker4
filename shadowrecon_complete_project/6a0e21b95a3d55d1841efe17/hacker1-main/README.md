# ShadowRecon Ultimate (Electron)

This is an Electron desktop app that provides:
- A **live unified feed** of in-app browsing traffic (BrowserWindow + WebView partition)
- A **unified reconnaissance scan** pipeline (multiple modules) that streams results into the feed
- A **DeepSeek handoff export** file (`data/export_for_deepseek.txt`)

## Legal / Scope
Use only on systems you **own** or have **explicit written authorization** to test (e.g., in-scope assets on a bug bounty program). The app is built to help testers observe and analyze their own authorized traffic and scan outputs.

## Requirements (Windows 10)
- Node.js 18+ recommended
- npm 9+

## Install
```bash
npm install
```

## Run (dev)
```bash
npm start
```

## Build Windows installer (.exe)
```bash
npm run build
```
Output will be written to `dist/` (NSIS installer + unpacked app).

## Notes on traffic capture
Traffic capture hooks both:
- the main app window session
- the embedded browser partition: `persist:webview`

This ensures live browsing inside the app appears in the Master Unified Feed.
