document.addEventListener('DOMContentLoaded', function () {
    calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        timeZone: 'UTC-3',
        initialView: 'multiMonthYear',
        multiMonthMaxColumns: 2,
        height: '100%',
        views: {
            multiMonthYear: {
                dateClick: (info) => {
                    // lógica pra desselecionar a data anterior
                    if (lastClickedDate) {
                        lastClickedDate.style.border = ""
                        lastClickedDate.style.borderRadius = ""
                        lastClickedDate = info.dayEl
                        info.dayEl.style.border = "2px solid purple"
                    } else {
                        lastClickedDate = info.dayEl
                        info.dayEl.style.border = "2px solid purple"
                    }
                    selectedDate = info.dateStr

                    salaContainer.innerHTML = ''

                    loadContent(selectedDate)

                    window.calendarAPI.getClassFromDateInCalendar(selectedDate).then(classRes => {
                        salasDoDia = classRes?.data || []
                        if (salasDoDia?.length >= 1) {
                            salasDoDia.forEach(sala => {
                                const btn = document.createElement('button')

                                btn.textContent = sala
                                btn.classList.add('sala-btn')

                                // btn.addEventListener('click', (event) => {})
                                salaContainer.appendChild(btn)
                            })
                            let salaChildren = Array.from(salaContainer.childNodes)
                            
                            // salaChildren.forEach(el => {
                                // el.addEventListener('click', event => {
                                    // salaChildren.forEach(_el => {
                                    //     _el.classList.remove('btn-ativo')
                                    // })
                                    // el.classList.add('btn-ativo')
                                    salaAtiva = salaChildren[0].innerText
                                    magoSelect.value = salaAtiva
                                // })
                            // })
                        }
                        updateActiveClassroom()
                    })
                },
            }
        },
    })

    calendar.render()


    document.dispatchEvent(new Event('calendarReady'))
})
