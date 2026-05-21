/**
 * exporter.js
 *
 * Small utility module for generating a compact "AI handoff" report file.
 * The live app currently calls an equivalent implementation in `main.js`.
 */

const fs = require("fs");

function compileForAI(target, logs, scan) {
  let output =
    `=== SHADOWRECON REPORT ===\n` +
    `Target: ${target}\n` +
    `Timestamp: ${new Date().toISOString()}\n\n` +
    `[SCAN RESULTS]\n${JSON.stringify(scan, null, 2)}\n\n` +
    `[TRAFFIC LOG]\n`;
  (logs || []).slice(-100).forEach((l) => {
    output += `${l.timestamp || ""} ${l.method || l.type || ""} ${l.url || ""}\n`;
  });
  return output;
}

function writeExport(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  return filePath;
}

module.exports = { compileForAI, writeExport };
