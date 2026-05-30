import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (defaultName: string) => ipcRenderer.invoke('dialog:saveFile', defaultName),
  readFileAsDataUrl: (filePath: string) => ipcRenderer.invoke('fs:readFileAsDataUrl', filePath),
})
