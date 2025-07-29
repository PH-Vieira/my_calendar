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

                    salaContainer.innerHTML = ''

                    window.calendarAPI.selectClassFromDateInCalendar(selectedDate).then(classRes => {
                        salas = classRes?.data || []
                        if (salas?.length >= 1) {
                            salas.forEach(sala => {
                                const btn = document.createElement('button')

                                btn.textContent = sala
                                btn.classList.add('sala-btn')

                                btn.addEventListener('click', (event) => {
                                    document.getElementById('show-mago').style.display = 'inline-block'

                                    loadContent()
                                })
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
                },
            }
        },
    })

    calendar.render()
})
