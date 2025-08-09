const { contextBridge, ipcRenderer } = require('electron')

let diasDaSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo']

contextBridge.exposeInMainWorld('calendarAPI', {
    getClassFromDateInCalendar: async (event) => {
        let diaDaSemana = diasDaSemana[new Date(event).getDay()]
        return await ipcRenderer.invoke('getClass', diaDaSemana)
    },
    /**
     * 
     * @param {string} event Dia selecionado para buscar os conteudos lessionados
     * @param {null} data normalmente nao tem nada aqui 
     * @returns retorna uma response com os dados no db, se houver conteudo naquele dia, se nao retorna []
     */
    getContentFromClass: async (event, data) => {
        return await ipcRenderer.invoke('getConteudo', [event, data])
    },
    getAllContent: async (event, data) => {
        return await ipcRenderer.invoke('getAllContent', [event, data])
    },
    getAllClassrooms: async (event, data) => {
        return await ipcRenderer.invoke('getAllClassrooms', [event, data])
    },

    addSalaDeAula: async (event) => {
        return await ipcRenderer.invoke('addClassroom', event)
    },
    addConteudo: async (event) => { return await ipcRenderer.invoke('addContent', event) },

    setContent: async (event) => { return await ipcRenderer.invoke('setContent', event) }
})