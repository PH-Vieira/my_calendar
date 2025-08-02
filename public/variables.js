let salas
let calendar
let salaAtiva
let selectedDate
let lastClickedDate
let inputManContent = ''

const mago                  = document.getElementById('mago')
const morte                 = document.getElementById('morte')
const eremita               = document.getElementById('eremita')
const calendarEl            = document.getElementById('calendar')
const showMago              = document.getElementById('show-mago')
const magoForm              = document.getElementById('mago-form')
const showEremita           = document.getElementById('show-eremita')
const eremitaForm           = document.getElementById('eremita-form')
const magoContainer         = document.getElementById('mago-container')
const salaContainer         = document.getElementById('sala-container')
const magoTitulo            = document.getElementById('mago-form-titulo')
const magoConteudo          = document.getElementById('mago-form-conteudo')
const contentContainer      = document.getElementById('conteudo-container')
const eremitaCancelBtn      = document.getElementById('eremita-cancel-btn')
const eremitaConfirmBtn     = document.getElementById('eremita-confirm-btn')
const eremitaBtnContainer   = document.getElementById('eremita-btn-container')
const checkBoxes            = document.getElementsByClassName('eremita-checkbox')
const MagoCancelBtn         = document.getElementById('mago-container-btns-cancel')
const MagoConfirmBtn        = document.getElementById('mago-container-btns-confirm')
const eremitaFormInput      = document.getElementById('eremita-form-input-class-name')