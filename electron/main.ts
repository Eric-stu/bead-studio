import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    title: 'Bead Studio',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#f8f9fa',
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('dialog:openFile', async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openFile'],
    filters: [
      { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp'] },
    ],
  })
  return result.canceled ? null : result.filePaths[0]
})

ipcMain.handle('fs:readFileAsDataUrl', async (_event, filePath: string) => {
  try {
    const buffer = await readFile(filePath)
    const ext = extname(filePath).toLowerCase().replace('.', '')
    const mimeMap: Record<string, string> = {
      png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
      bmp: 'image/bmp', gif: 'image/gif', webp: 'image/webp',
    }
    const mime = mimeMap[ext] || 'application/octet-stream'
    return `data:${mime};base64,${buffer.toString('base64')}`
  } catch {
    return null
  }
})

ipcMain.handle('dialog:saveFile', async (_event, defaultName: string) => {
  const result = await dialog.showSaveDialog(mainWindow!, {
    defaultPath: defaultName,
    filters: [
      { name: 'PNG Image', extensions: ['png'] },
    ],
  })
  return result.canceled ? null : result.filePath
})
