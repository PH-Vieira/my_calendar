const { contextBridge, ipcRenderer } = require('electron')

let diasDaSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']

contextBridge.exposeInMainWorld('calendarAPI', {
    selectClassFromDateInCalendar: async (event) => {
        let diaDaSemana = diasDaSemana[new Date(event).getDay()]
        const res = await ipcRenderer.invoke('getClass', diaDaSemana)
        return res
    },
    selectContentFromClass: async (event, data) => {
        // console.log(`Im preload, receiving ${event} e ${data}`)
        const res = await ipcRenderer.invoke('getConteudo', [event, data])
        // console.log(`Im preload, received ${res}`)
        return res
    }
})