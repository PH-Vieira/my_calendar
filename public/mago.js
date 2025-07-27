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
            loadContent(salaAtiva)
            mago.style.display = 'none'
        })
    } else {
        console.log('faltou coisa ai')
    }
})
MagoConfirmBtn.addEventListener('submit', event => { event.preventDefault() })
