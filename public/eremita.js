let inputManContent = ''

const eremita = document.getElementById('eremita')
const showEremita = document.getElementById('show-eremita')
showEremita.addEventListener('click', event => {
    eremita.style.display = 'flex'
})

const eremitaCancelBtn = document.getElementById('eremita-cancel-btn')
eremitaCancelBtn.addEventListener('click', event => {
    eremita.style.display = 'none'
    diasSelecionados = {
        "domingo": false,
        "segunda": false,
        "terca": false,
        "quarta": false,
        "quinta": false,
        "sexta": false,
        "sabado": false
    }
    checkReference.forEach(item => { item.checked = false })
    inputManContent ? inputManContent = '' : ''
    inputMan.value = ''
})

const eremitaConfirmBtn = document.getElementById('eremita-confirm-btn')
eremitaConfirmBtn.addEventListener('click', event => {
    if (inputManContent != '') {
        if (Object.values(diasSelecionados).includes(true)) {
            window.calendarAPI.AdicionarSalaDeAula([inputManContent, diasSelecionados]).then(res => {
                if (selectedDate) {
                    const salaContainer = document.getElementById('sala-container')
                    salaContainer.innerHTML = ''
                    const contentContainer = document.getElementById('conteudo-container')
                    contentContainer.innerHTML = ''
                    let salas
                    window.calendarAPI.selectClassFromDateInCalendar(selectedDate).then(classRes => {
                        salas = classRes?.data || []
                        if (salas?.length >= 1) {
                            salas.forEach(sala => {
                                const btn = document.createElement('button')

                                btn.textContent = sala
                                btn.classList.add('sala-btn')

                                btn.addEventListener('click', (event) => {
                                    document.getElementById('show-mago').style.display = 'inline-block'

                                    contentContainer.innerHTML = ''

                                    window.calendarAPI.selectContentFromClass(event.target.innerText, selectedDate).then(contentRes => {
                                        let conteudos = contentRes

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
                                })
                                salaContainer.appendChild(btn)
                            })
                            let salaChildren = Array.from(salaContainer.childNodes)
                            if (salaChildren.length > 1) {
                                salaChildren.forEach(el => {
                                    el.addEventListener('click', event => {
                                        salaChildren.forEach(_el => {
                                            _el.classList.remove('btn-ativo')
                                        })
                                        el.classList.add('btn-ativo')
                                        salaAtiva = el.innerText
                                    })
                                })
                            }
                        }
                    })
                }
                eremita.style.display = 'none'
                diasSelecionados = {
                    "domingo": false,
                    "segunda": false,
                    "terca": false,
                    "quarta": false,
                    "quinta": false,
                    "sexta": false,
                    "sabado": false
                }
                checkReference.forEach(item => { item.checked = false })
                inputManContent ? inputManContent = '' : ''
                inputMan.value = ''
            })
        } else {
            console.log('faltou o dia')
        }
    } else { console.log('faltou o nome') }
})

const eremitaForm = document.getElementById('eremita-form')
eremitaForm.addEventListener('submit', event => {
    event.preventDefault()
})


const inputMan = document.getElementById('eremita-form-input-class-name')
inputMan.addEventListener('input', () => {
    inputManContent = inputMan.value
})

let diasSelecionados = {
    "domingo": false,
    "segunda": false,
    "terca": false,
    "quarta": false,
    "quinta": false,
    "sexta": false,
    "sabado": false
}

let checkReference = []

const checkBoxes = document.getElementsByClassName('eremita-checkbox')
for (i = 0; i < checkBoxes.length; i++) {
    checkReference.push(checkBoxes[i])
    let reason = checkBoxes[i].getAttribute('reason')
    checkBoxes[i].addEventListener('click', event => {
        diasSelecionados[reason] = !diasSelecionados[reason]
    })
}