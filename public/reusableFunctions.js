let datas = []
/**
 * @returns A funcao em si nao retorna nada, mas cria os elementos com as aulas e conteudos do dia selecionado
 * 
 * @param {string} dia Dia a ser buscado
 */
async function loadContent(dia) {
    window.calendarAPI.getContentFromClass(dia).then(res => {
        let aux = []
        contentContainer.innerHTML = ''
        let data = res['data']
        // console.log(data)

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
            // console.log(sala[1].length)
            Object.entries(sala[1]).forEach(_data => {
                // console.log(_data)
                aux.push({
                    title: sala[0],
                    date: dia
                })
                // console.log(_data)
                const data_div = document.createElement('div')
                data_div.style.border = '1px solid black'
                data_div.style.borderRadius = '7px'
                data_div.style.margin = '.77em .34em'
                data_div.innerText = dia

                // console.log(`\nAux: ${JSON.stringify(aux)}\n`)

                let aula_div
                _data[1].forEach(aula => {
                    aula_div = document.createElement('div')
                    // aula_div.style.border = '1px solid black'
                    // aula_div.style.borderRadius = '7px'
                    aula_div.style.margin = '.77em .34em'
                    const titulo = document.createElement('h5')
                    // titulo.innerText = `${dia.slice(5).replace('-', '/')} - ${aula['titulo']}`
                    titulo.innerText = `${aula['titulo']}`
                    titulo.style.fontSize = 'large'
                    const conteudo = document.createElement('p')
                    conteudo.innerText = aula['conteudo']
                    aula_div.appendChild(titulo)
                    aula_div.appendChild(conteudo)
                    data_div.appendChild(aula_div)
                })

                sala_div.appendChild(aula_div)
            })
            sala[1].length == 0 ? '' : novaDiv.appendChild(sala_div)
        })
        data.length == 0 ? '' : contentContainer.appendChild(novaDiv)
    })
}

function invertMonthDay(data) {
    console.log(data.length)
}

document.addEventListener('calendarReady', () => {
    /**
     * new Date() cria um objeto Date da data atual
     * toISOString() converte o objeto Date para string no formato ISO
     * substring(0, 10) extrai os primeiros 10 caracteres (YYYY-mm-dd)
     */
    // loadContent((new Date()).toISOString().substring(0, 10))

    window.calendarAPI.getAllContent().then(res => {
        datas = res?.data
        document.dispatchEvent(new Event('contentReady'))
    })
})

document.addEventListener('contentReady', () => {
    calendar.removeAllEvents()

    datas.forEach(el => {
        calendar.addEvent(
            {
                title: Object.values(el)[0],
                start: Object.keys(el)[0],
                allDay: true
            }
        )
    })
})