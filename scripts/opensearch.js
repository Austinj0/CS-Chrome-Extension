console.log('loaded')
const beautyBtn = document.createElement('div')
beautyBtn.classList += 'inject_button'
beautyBtn.innerText = 'Beautify'
document.querySelector('html').appendChild(beautyBtn)
let beautyState = false

const beautify = () => {
  if (beautyState) {
    const logs = document.querySelectorAll("[data-test-subj='tableDocViewRow-log-value']:not(.formatted)")
    try {
      for (let i = 0; i < logs.length; i++) {
        const logJson = JSON.parse(logs[i].innerText)
        // eslint-disable-next-line no-undef
        logs[i].innerHTML = prettyPrintJson.toHtml(logJson)
        logs[i].classList.add('formatted')
      }
    } catch { }
    setTimeout(beautify, 1000)
  }
}

const toggleBeauty = () => {
  if (beautyState) {
    beautyState = false
  } else {
    beautyState = true
    beautify()
  }
}
beautyBtn.addEventListener('click', toggleBeauty)
