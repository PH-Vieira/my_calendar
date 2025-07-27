showMago.addEventListener('click', event => {
    mago.style.display = 'flex'
})

magoForm.addEventListener('submit', event => { event.preventDefault() })

MagoCancelBtn.addEventListener('click', event => {
    mago.style.display = 'none'
    magoTitulo.value = ''
    magoConteudo.value = ''
})

MagoConfirmBtn.addEventListener('click', event => {
    event.preventDefault()
    if(magoTitulo.value != '' || magoConteudo.value != '') {
        window.calendarAPI.AdicionarConteudo([selectedDate, salaAtiva, magoTitulo.value, magoConteudo.value]).then(res => {
            // mago.style.display = 'none'
        })
    } else {
        alert('Insira um título e um conteúdo')
    }
})
MagoConfirmBtn.addEventListener('submit', event => { event.preventDefault() })
