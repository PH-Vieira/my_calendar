function loadContent() {
    window.calendarAPI.selectContentFromClass().then(res => {
        contentContainer.innerHTML = ''
        let data = res['data']

        const novaDiv = document.createElement('div')
        novaDiv.style.width = '90%'
        novaDiv.style.backgroundColor = 'white'
        novaDiv.style.border = '1px solid black'
        novaDiv.style.borderRadius = '.53em'
        novaDiv.style.margin = '.7em 0'
        novaDiv.style.overflow = 'auto'
        novaDiv.style.scrollbarWidth = 'none'
        novaDiv.style.msOverflowStyle = 'none'

        Object.entries(data).forEach(sala => {
            // console.log('sala: ', sala)

            const sala_div = document.createElement('div')
            sala_div.style.border = '1px solid black'
            sala_div.style.borderRadius = '7px'
            sala_div.style.margin = '.77em .34em'
            sala_div.innerText = sala[0]

            // console.log(Object.entries(sala[1]))
            Object.entries(sala[1]).forEach(_data => {
                console.log(_data)
                const data_div = document.createElement('div')
                data_div.style.border = '1px solid black'
                data_div.style.borderRadius = '7px'
                data_div.style.margin = '.77em .34em'
                data_div.innerText = _data[0]

                _data[1].forEach(aula => {
                    const aula_div = document.createElement('div')
                    aula_div.style.border = '1px solid black'
                    aula_div.style.borderRadius = '7px'
                    aula_div.style.margin = '.77em .34em'
                    const titulo = document.createElement('h5')
                    titulo.innerText = aula['titulo']
                    const conteudo = document.createElement('p')
                    conteudo.innerText = aula['conteudo']
                    aula_div.appendChild(titulo)
                    aula_div.appendChild(conteudo)
                    data_div.appendChild(aula_div)
                })

                sala_div.appendChild(data_div)
            })
            novaDiv.appendChild(sala_div)
        })
        contentContainer.appendChild(novaDiv)

        // if (Array.isArray(conteudos)) {
        //     conteudos.forEach(conteudo => {
        //         const novaDiv = document.createElement('div')
        //         novaDiv.style.width = '90%'
        //         novaDiv.style.backgroundColor = 'white'
        //         novaDiv.style.border = '1px solid black'
        //         novaDiv.style.borderRadius = '.53em'
        //         novaDiv.style.margin = '.7em 0'
        //         const titulo = document.createElement('h3')
        //         titulo.innerText = conteudo['titulo']
        //         const cont = document.createElement('p')
        //         cont.innerText = conteudo['conteudo']

        //         novaDiv.appendChild(titulo)
        //         novaDiv.appendChild(cont)

        //         contentContainer.appendChild(novaDiv)
        //     })
        // } else {
        //     const novaDiv = document.createElement('div')
        //     novaDiv.innerText = 'Sem conteúdo'
        //     contentContainer.appendChild(novaDiv)
        // }

        // console.log(JSON.stringify(contentRes))
    })
}

loadContent()