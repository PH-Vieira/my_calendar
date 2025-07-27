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