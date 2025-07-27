function loadContent(sala) {
    window.calendarAPI.selectContentFromClass(sala, selectedDate).then(contentRes => {
        contentContainer.innerHTML = ''
        let conteudos = contentRes['data']

        if (Array.isArray(conteudos)) {
            conteudos.forEach(conteudo => {
                const novaDiv = document.createElement('div')
                const titulo = document.createElement('h3')
                titulo.innerText = conteudo['titulo']
                const cont = document.createElement('p')
                cont.innerText = conteudo['conteudo']

                novaDiv.appendChild(titulo)
                novaDiv.appendChild(cont)

                contentContainer.appendChild(novaDiv)
            })
        } else {
            const novaDiv = document.createElement('div')
            novaDiv.innerText = 'Sem conteúdo'
            contentContainer.appendChild(novaDiv)
        }
    })
}