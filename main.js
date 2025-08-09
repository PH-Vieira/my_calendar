const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const controller = require('./controller.js');

function ensureDbExists(devMode = false) {
    const userDataPath = app.getPath('userData')
    const userDbPath = devMode ? './db.json' : path.join(userDataPath, 'db.json')
    console.log(userDbPath)
    const bundledDbPath = path.join(__dirname, 'db.json')

    if (!devMode && !fs.existsSync(userDbPath)) {
        try {
            fs.copyFileSync(bundledDbPath, userDbPath)
            console.log('✅ db.json copiado para:', userDbPath)
        } catch (err) {
            console.error('❌ Falha ao copiar db.json:', err)
        }
    } else {
        console.log('ℹ️ db.json já existe em:', userDbPath)
    }

    controller.setDbPath(userDbPath) // configura o caminho para o controller usar
}

// keep main window variable from being garbaje collected
let mainWindow

// ipc methods
ipcMain.handle('getClass', (event, args = null) => {
    return controller.getClass(args)
})

ipcMain.handle('getConteudo', (event, args = null) => {
    return controller.getContent(args)
})

ipcMain.handle('addClassroom', (event, args = null) => {
    return controller.addClassroom(args)
})

ipcMain.handle('addContent', (event, args = null) => {
    return controller.addContent(args)
})

ipcMain.handle('getAllContent', (event, args = null) => {
    return controller.getAllContent(args)
})

// create window function
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1500, height: 900,
        minWidth: 950, minHeight: 500,
        backgroundColor: '#fff',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // --- !! IMPORTANT !! ---
            // Disable 'contextIsolation' to allow 'nodeIntegration'
            // 'contextIsolation' defaults to "true" as from Electron v12
            // contextIsolation: false,
            nodeIntegration: false,
            enableRemoteModule: false,
        }
    })

    // Load index.html into the new BrowserWindow
    mainWindow.loadFile('public/index.html')

    mainWindow.webContents.openDevTools()

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}


app.on('ready', () => {
    ensureDbExists(true)
    createWindow()
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
    if (mainWindow === null) createWindow()
})
