let datas = []
async function loadContent() {
    window.calendarAPI.selectContentFromClass().then(res => {
        let aux = []
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
            sala_div.style.paddingTop = '1em'
            sala_div.innerText = sala[0]

            // console.log(Object.entries(sala[1]))
            Object.entries(sala[1]).forEach(_data => {
                aux.push({
                    title: sala[0],
                    date: _data[0]
                })
                // console.log(_data)
                const data_div = document.createElement('div')
                data_div.style.border = '1px solid black'
                data_div.style.borderRadius = '7px'
                data_div.style.margin = '.77em .34em'
                data_div.innerText = _data[0]

                let aula_div
                _data[1].forEach(aula => {
                    aula_div = document.createElement('div')
                    // aula_div.style.border = '1px solid black'
                    // aula_div.style.borderRadius = '7px'
                    aula_div.style.margin = '.77em .34em'
                    const titulo = document.createElement('h5')
                    titulo.innerText = `${_data[0].slice(5).replace('-', '/')} - ${aula['titulo']}`
                    titulo.style.fontSize = 'large'
                    const conteudo = document.createElement('p')
                    conteudo.innerText = aula['conteudo']
                    aula_div.appendChild(titulo)
                    aula_div.appendChild(conteudo)
                    data_div.appendChild(aula_div)
                })

                sala_div.appendChild(aula_div)
            })
            novaDiv.appendChild(sala_div)
        })
        contentContainer.appendChild(novaDiv)
        datas = [...new Set(aux)]
        document.dispatchEvent(new Event('contentReady'))
    })
}

document.addEventListener('calendarReady', () => {
    loadContent()
})

document.addEventListener('contentReady', () => {
    calendar.removeAllEvents()

    datas.forEach(el => {
        calendar.addEvent(
            {
                title: el.title,
                start: el.date,
                allDay: true
            }
        )
    })
})