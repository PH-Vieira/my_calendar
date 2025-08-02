showEremita.addEventListener('click', event => {
    eremita.style.display = 'flex'
    eremita.style.zIndex = '10'
    eremitaBtnContainer.style.animation = '.3s cubic-bezier(0.42, 0, 0.58, 1) 0s entrance'
    eremitaBtnContainer.style.transform = 'translateY(0)'
    eremitaForm.style.animation = '.3s cubic-bezier(0.42, 0, 0.58, 1) 0s entrance'
    eremitaForm.style.transform = 'translateY(0)'

    morte.style.filter = 'blur(1px)'
})

eremitaCancelBtn.addEventListener('click', event => {
    eremitaBtnContainer.style.animation = '.3s cubic-bezier(0.42, 0, 0.58, 1) 0s entrance-out'
    eremitaBtnContainer.style.transform = 'translateY(100vh)'
    eremitaForm.style.animation = '.3s cubic-bezier(0.42, 0, 0.58, 1) 0s entrance-out'
    eremitaForm.style.transform = 'translateY(100vh)'

    setTimeout(() => {
        eremita.style.display = 'none'
        morte.style.filter = 'none'
    }, 200)

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
    eremitaFormInput.value = ''
})

eremitaConfirmBtn.addEventListener('click', event => {
    if (inputManContent != '') {
        if (Object.values(diasSelecionados).includes(true)) {
            window.calendarAPI.AdicionarSalaDeAula([inputManContent, diasSelecionados]).then(res => {
                if (selectedDate) {
                    salaContainer.innerHTML = ''
                    contentContainer.innerHTML = ''
                    window.calendarAPI.selectClassFromDateInCalendar(selectedDate).then(classRes => {
                        salas = classRes?.data || []
                        if (salas?.length >= 1) {
                            salas.forEach(sala => {
                                const btn = document.createElement('button')

                                btn.textContent = sala
                                btn.classList.add('sala-btn')

                                salaContainer.appendChild(btn)
                            })
                            let salaChildren = Array.from(salaContainer.childNodes)
                            if (salaChildren.length >= 1) {
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
                morte.style.filter = 'none'
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
                eremitaFormInput.value = ''
            })
        } else {
            console.log('faltou o dia')
        }
    } else { console.log('faltou o nome') }
})

eremitaForm.addEventListener('submit', event => {
    event.preventDefault()
})


eremitaFormInput.addEventListener('input', () => {
    inputManContent = eremitaFormInput.value
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

for (i = 0; i < checkBoxes.length; i++) {
    checkReference.push(checkBoxes[i])
    let reason = checkBoxes[i].getAttribute('reason')
    checkBoxes[i].addEventListener('click', event => {
        diasSelecionados[reason] = !diasSelecionados[reason]
    })
}