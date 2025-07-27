const { contextBridge, ipcRenderer } = require('electron')

let diasDaSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']

contextBridge.exposeInMainWorld('calendarAPI', {
    selectClassFromDateInCalendar: async (event) => {
        let diaDaSemana = diasDaSemana[new Date(event).getDay()]
        return await ipcRenderer.invoke('getClass', diaDaSemana)
    },
    selectContentFromClass: async (event, data) => {
        return await ipcRenderer.invoke('getConteudo', [event, data])
    },

    AdicionarSalaDeAula: async (event) => {
        return await ipcRenderer.invoke('addClassroom', event)
    },
    AdicionarConteudo: async (event) => { return await ipcRenderer.invoke('addContent', event) }
})