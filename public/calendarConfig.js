let lastClickedDate
let selectedDate
let salaAtiva
const salaContainer = document.getElementById('sala-container')

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar')

    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        initialView: 'multiMonthYear',
        height: '100%',
        views: {
            multiMonthYear: {
                dateClick: (info) => {
                    // lógica pra desselecionar a data anterior
                    if (lastClickedDate) {
                        lastClickedDate.style.border = ""
                        lastClickedDate.style.borderRadius = ""
                        lastClickedDate = info.dayEl
                        info.dayEl.style.border = "2px solid red"
                    } else {
                        lastClickedDate = info.dayEl
                        info.dayEl.style.border = "2px solid red"
                    }
                    selectedDate = info.dateStr

                    console.log(selectedDate)

                    salaContainer.innerHTML = ''

                    const contentContainer = document.getElementById('conteudo-container')
                    contentContainer.innerHTML = ''

                    let salas

                    window.calendarAPI.selectClassFromDateInCalendar(selectedDate).then(classRes => {
                        salas = classRes
                        if (salas?.length > 1) {
                            salas.forEach(sala => {
                                const btn = document.createElement('button')

                                btn.textContent = sala
                                btn.classList.add('sala-btn')

                                btn.addEventListener('click', (event) => {

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
                },
            }
        },
    })

    calendar.render()
})
