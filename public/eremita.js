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
        "sexta": false
    }
    checkReference.forEach(item => { item.checked = false })
    inputManContent ? inputManContent = '' : ''
    inputMan.value = ''
})

const eremitaConfirmBtn = document.getElementById('eremita-confirm-btn')
eremitaConfirmBtn.addEventListener('click', event => {
    if (inputManContent != '') {
        window.calendarAPI.AdicionarSalaDeAula(inputManContent).then(res => {
            eremita.style.display = 'none'
            diasSelecionados = {
                "domingo": false,
                "segunda": false,
                "terca": false,
                "quarta": false,
                "quinta": false,
                "sexta": false
            }
            checkReference.forEach(item => { item.checked = false })
            inputManContent ? inputManContent = '' : ''
            inputMan.value = ''
        })
    } else {
        alert('Para adicionar uma sala, adicione um nome')
    }
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
    "sexta": false
}

let checkReference = []

const checkBoxes = document.getElementsByClassName('eremita-checkbox')
for (i = 0; i < checkBoxes.length; i++) {
    checkReference.push(checkBoxes[i])
    let reason = checkBoxes[i].getAttribute('reason')
    checkBoxes[i].addEventListener('click', event => {
        diasSelecionados[reason] = !diasSelecionados[reason]
        console.log(diasSelecionados)
    })
}