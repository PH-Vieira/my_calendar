const { contextBridge, ipcRenderer } = require('electron')

let diasDaSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']

contextBridge.exposeInMainWorld('calendarAPI', {
    selectClassFromDateInCalendar: async (event) => {
        let diaDaSemana = diasDaSemana[new Date(event).getDay()]
        return await ipcRenderer.invoke('getClass', diaDaSemana)
    },
    selectContentFromClass: async (event, data) => {
        // console.log(`Im preload, receiving ${event} e ${data}`)
        // console.log(`Im preload, received ${res}`)
        return await ipcRenderer.invoke('getConteudo', [event, data])
    },

    AdicionarSalaDeAula: async (event) => {
        return await ipcRenderer.invoke('addClassroom', event)
    },
})