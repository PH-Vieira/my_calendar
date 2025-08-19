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

        const novaDiv = document.createElement('div')
        novaDiv.style.width = '90%'
        novaDiv.style.backgroundColor = 'white'
        novaDiv.style.border = '1px solid black'
        novaDiv.style.borderRadius = '.53em'
        novaDiv.style.margin = '.7em 0'
        novaDiv.style.overflow = 'auto'
        novaDiv.style.scrollbarWidth = 'none'
        novaDiv.style.msOverflowStyle = 'none'

        let existe_conteudo = false

        Object.entries(data).forEach(sala => {
            sala[1].length > 0 ? existe_conteudo = true : ''

            const sala_div = document.createElement('div')
            sala_div.style.border = '1px solid black'
            sala_div.style.borderRadius = '7px'
            sala_div.style.margin = '.77em .34em'
            sala_div.style.paddingTop = '1em'
            sala_div.innerText = sala[0]

            Object.entries(sala[1]).forEach(_data => {
                aux.push({
                    title: sala[0],
                    date: dia
                })
                const data_div = document.createElement('div')

                let aula_div
                _data[1].forEach(aula => {
                    if (sala[1].length > 0) {
                        aula_div = document.createElement('div')
                        // aula_div.style.border = '1px solid black'
                        // aula_div.style.borderRadius = '7px'
                        aula_div.style.margin = '.77em .34em'
                        const titulo = document.createElement('h5')
                        // titulo.innerText = `${dia.slice(5).replace('-', '/')} - ${aula['titulo']}`
                        titulo.innerText = `${aula['titulo']}`
                        titulo.style.fontSize = 'large'
                        const conteudo = document.createElement('p')
                        conteudo.textContent = aula['conteudo']
                        let tmp_id = sala[0] + titulo.textContent
                        conteudo.id = tmp_id

                        conteudo.addEventListener('dblclick', event => {
                            ativarEdicao(sala[0], dia, titulo.textContent, conteudo)
                        })

                        aula_div.appendChild(titulo)
                        aula_div.appendChild(conteudo)
                        data_div.appendChild(aula_div)
                    }
                })
                sala_div.appendChild(data_div)
            })
            sala[1].length > 0 ? novaDiv.appendChild(sala_div) : ''
        })
        existe_conteudo ? contentContainer.appendChild(novaDiv) : ''
        updateCalendarEvents()
    })
}

function ativarEdicao(sala, dia, titulo, p) {
    const textarea = document.createElement('textarea')
    textarea.value = p.textContent
    textarea.id = p.id

    p.replaceWith(textarea)
    textarea.focus()

    textarea.addEventListener('blur', event => {
        window.calendarAPI.setContent([sala, dia, titulo, textarea.value]).then(res => {
            // console.log(res)
        })
        const newP = document.createElement('p')
        newP.textContent = textarea.value
        newP.id = p.id

        newP.addEventListener('dblclick', event => { ativarEdicao(newP) })
        textarea.replaceWith(newP)
    })
}

async function updateActiveClassroom() {
    magoSelect.innerHTML = ''
    let salaChildren = Array.from(salaContainer.childNodes)
    console.log(salaChildren, magoSelect)
    salaChildren.forEach(el => {
        let aux = document.createElement('option')
        aux.value = el.innerText
        aux.innerText = el.innerText
        magoSelect.appendChild(aux)
    })
}

function gerarSequenciaBaseadaEm(str, tamanho = 6) {
    let resultado = ''
    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * str.length);
        resultado += str.charAt(indice)
    }
    return resultado
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
    updateCalendarEvents()

    updateActiveClassroom()
})

function updateCalendarEvents() {
    calendar.removeAllEvents()

    let alreadyAdded = []

    datas.forEach(el => {
        console.log(Object.values(el)[0])
        if (!alreadyAdded.includes(Object.values(el)[0])) {
            calendar.addEvent(
                {
                    title: Object.values(el)[0],
                    start: Object.keys(el)[0],
                    allDay: true
                }
            )
        } else {
            alreadyAdded.push(Object.values(el)[0])
        }
    })
    console.log(alreadyAdded)
}