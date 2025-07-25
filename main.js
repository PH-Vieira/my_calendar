const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Db = require('./controller')

// keep main window variable from being garbaje collected
let mainWindow

// ipc methods
ipcMain.handle('getClass', (event, args = null) => {
    const response = Db.getClass(args)
    if (response?.message == 'Success') {
        return response?.data
    } else {
        return []
    }
})

ipcMain.handle('getConteudo', (event, args = null) => {
    // console.log(`Im main, receiving ${args[0]} e ${args[1]}`)
    const response = Db.getContent(args)
    // console.log(`Im main, received ${JSON.stringify(response['data'])} from controller`)
    if (response?.message == 'Success') {
        return response?.data
    } else {
        return []
    }
})

ipcMain.handle('addClassroom', (event, args = null) => {
    const response = Db.addClassroom(args)
    return response?.message
})

// create window function
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1500, height: 900,
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

    // Open DevTools - Remove for PRODUCTION!
    mainWindow.webContents.openDevTools({ mode: 'right' });

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}


app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
    if (mainWindow === null) createWindow()
})
