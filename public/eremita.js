const eremita = document.getElementById('eremita')
const showEremita = document.getElementById('show-eremita')
showEremita.addEventListener('click', event => {
    eremita.style.display = 'flex'
})

const cancelBtn = document.getElementById('eremita-cancel-btn')
cancelBtn.addEventListener('click', event => {
    console.log('Bye bye')
    eremita.style.display = 'none'
})

const confirmBtn = document.getElementById('eremita-confirm-btn')
confirmBtn.addEventListener('click', event => {
    console.log(`I'll send ${inputManContent} to the main process`)
    window.calendarAPI.AdicionarSalaDeAula(inputManContent).then( res => {
        console.log(res)
    })
})

const eremitaForm = document.getElementById('eremita-form')
eremitaForm.addEventListener('submit', event => {
    event.preventDefault()
})

let inputManContent = ''

const inputMan = document.getElementById('eremita-form-input-class-name')
inputMan.addEventListener('input', () => {
    inputManContent = inputMan.value
})
