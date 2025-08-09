showMago.addEventListener('click', event => {
    mago.style.display = 'flex'
    mago.style.zIndex = '10'
    magoContainer.style.animation = '.3s cubic-bezier(0.42, 0, 0.58, 1) 0s entrance'
    magoContainer.style.transform = 'translateY(0)'

    morte.style.filter = 'blur(1px)'
})

magoForm.addEventListener('submit', event => { event.preventDefault() })

MagoCancelBtn.addEventListener('click', event => {
    magoContainer.style.animation = '.3s cubic-bezier(0.42, 0, 0.58, 1) 0s entrance-out'
    magoContainer.style.transform = 'translateY(100vh)'
    magoTitulo.value = ''
    magoConteudo.value = ''

    setTimeout(() => {
        mago.style.display = 'none'
        morte.style.filter = 'none'
    }, 200)
})

MagoConfirmBtn.addEventListener('click', event => {
    event.preventDefault()

    if (magoTitulo.value != '' && magoConteudo.value != '' && salaAtiva != '') {
        window.calendarAPI.addConteudo([selectedDate, salaAtiva, magoTitulo.value, magoConteudo.value]).then(res => {
            loadContent()
            magoContainer.style.animation = '.3s cubic-bezier(0.42, 0, 0.58, 1) 0s entrance-out'
            magoContainer.style.transform = 'translateY(100vh)'
            magoTitulo.value = ''
            magoConteudo.value = ''

            setTimeout(() => {
                mago.style.display = 'none'
                morte.style.filter = 'none'
            }, 200)
        })
    } else {
        console.log('faltou coisa ai')
    }
})
MagoConfirmBtn.addEventListener('submit', event => { event.preventDefault() })
