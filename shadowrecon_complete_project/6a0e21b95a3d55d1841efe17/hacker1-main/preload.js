// preload.js - minimal, safer API surface for the renderer
const { contextBridge, ipcRenderer } = require('electron');

const api = {
    // Commands
    runUnifiedScan: (target) => ipcRenderer.invoke('run-unified-scan', target),
    getTrafficLog: () => ipcRenderer.invoke('get-traffic-log'),
    clearTraffic: () => ipcRenderer.invoke('clear-traffic'),
    filterNoise: () => ipcRenderer.invoke('filter-noise'),
    exportForAI: (target) => ipcRenderer.invoke('export-for-ai', target),

    // Events
    onFeedUpdate: (callback) => {
        ipcRenderer.removeAllListeners('feed-update');
        ipcRenderer.removeAllListeners('feed-update-batch');
        ipcRenderer.on('feed-update', (_event, data) => callback(data));
        ipcRenderer.on('feed-update-batch', (_event, batch) => {
            if (!Array.isArray(batch)) return;
            for (const item of batch) callback(item);
        });
    },
};

contextBridge.exposeInMainWorld('shadowrecon', api);
