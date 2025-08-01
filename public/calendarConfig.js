document.addEventListener('DOMContentLoaded', function () {
    calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        timeZone: 'UTC-3',
        initialView: 'multiMonthYear',
        multiMonthMaxColumns: 2,
        initialDate: '2025-01-01',
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
                                    // document.getElementById('show-mago').style.display = 'inline-block'

                                    // loadContent()
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
        events: [
            {
                title: 'event 1',
                start: '2024-01-15',
                end: '2025-01-20'
            },
            {
                title: 'event 2',
                start: '2024-01-15',
                end: '2025-01-20'
            },
            {
                title: 'event 3',
                start: '2025-01-15'
            }
        ]
    })

    calendar.render()


    document.dispatchEvent(new Event('calendarReady'))
})
