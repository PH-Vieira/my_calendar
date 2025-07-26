const mago = document.getElementById('mago')
const showMago = document.getElementById('show-mago')
showMago.addEventListener('click', event => {
    mago.style.display = 'flex'
})

const magoForm = document.getElementById('mago-form')
magoForm.addEventListener('submit', event => { event.preventDefault() })

const MagoCancelBtn = document.getElementById('mago-container-btns-cancel')
MagoCancelBtn.addEventListener('click', event => {
    mago.style.display = 'none'
    magoTitulo.value = ''
    magoConteudo.value = ''
})

const MagoConfirmBtn = document.getElementById('mago-container-btns-confirm')
MagoConfirmBtn.addEventListener('click', event => {
    event.preventDefault()
    // console.log(selectedDate, salaAtiva)
    if(magoTitulo.value != '' || magoConteudo.value != '') {
        window.calendarAPI.AdicionarConteudo([selectedDate, salaAtiva, magoTitulo.value, magoConteudo.value]).then(res => {
            console.log(res)
            // mago.style.display = 'none'
        })
    } else {
        alert('Insira um título e um conteúdo')
    }
})
MagoConfirmBtn.addEventListener('submit', event => { event.preventDefault() })

const magoTitulo = document.getElementById('mago-form-titulo')
const magoConteudo = document.getElementById('mago-form-conteudo')
