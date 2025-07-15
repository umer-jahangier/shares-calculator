const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version')
});

window.addEventListener('DOMContentLoaded', async () => {
  if (window.electronAPI && window.electronAPI.getAppVersion) {
    const versionElement = document.getElementById('app-version');
    if (versionElement) {
      const version = await window.electronAPI.getAppVersion();
      versionElement.textContent = `Version ${version}`;
    }
  }
});