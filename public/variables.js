let salas
let calendar
let salaAtiva
let selectedDate
let lastClickedDate
let inputManContent = ''

const mago                  = document.getElementById('mago')
const eremita               = document.getElementById('eremita')
const calendarEl            = document.getElementById('calendar')
const showMago              = document.getElementById('show-mago')
const magoForm              = document.getElementById('mago-form')
const showEremita           = document.getElementById('show-eremita')
const eremitaForm           = document.getElementById('eremita-form')
const magoTitulo            = document.getElementById('mago-form-titulo')
const salaContainer         = document.getElementById('sala-container')
const magoConteudo          = document.getElementById('mago-form-conteudo')
const contentContainer      = document.getElementById('conteudo-container')
const eremitaCancelBtn      = document.getElementById('eremita-cancel-btn')
const checkBoxes            = document.getElementsByClassName('eremita-checkbox')
const eremitaConfirmBtn     = document.getElementById('eremita-confirm-btn')
const inputMan              = document.getElementById('eremita-form-input-class-name')
const MagoCancelBtn         = document.getElementById('mago-container-btns-cancel')
const MagoConfirmBtn        = document.getElementById('mago-container-btns-confirm')