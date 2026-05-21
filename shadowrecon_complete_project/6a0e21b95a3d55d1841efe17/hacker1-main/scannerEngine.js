/**
 * scannerEngine.js
 *
 * The full "30 subsystem" orchestration currently lives in `main.js` so it can run in the
 * Electron main process without blocking the renderer. This module exists to prevent the
 * repo from containing empty/broken files and to provide a future refactor seam.
 *
 * IMPORTANT: Any scanners must only be used against systems you own or are explicitly
 * authorized to test (e.g., in-scope assets on a bug bounty program).
 */

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const idx = nextIndex++;
      if (idx >= items.length) break;
      try {
        results[idx] = await fn(items[idx], idx);
      } catch {
        results[idx] = null;
      }
    }
  });
  await Promise.all(workers);
  return results;
}

module.exports = { mapLimit };
