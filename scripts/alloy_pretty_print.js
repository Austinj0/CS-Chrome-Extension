let beautyState = true;
const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  }
const beautify = () => {
    if(getCookie('prettyPrint') === 'false') {
        beautyState = false;
    } else {beautyState = true 
    }
  if (beautyState) {
    const logs = document.querySelectorAll("pre.monospace-code-block:not(.formatted)")
    try {
      for (let i = 0; i < logs.length; i++) {
        try {
          const logJson = JSON.parse(logs[i].innerText)
          // eslint-disable-next-line no-undef
        logs[i].innerHTML = prettyPrintJson.toHtml(logJson)
        logs[i].classList.add('formatted');
        }
        catch(e){
          console.log(e)
          console.log(logs[i].innerText);
          beautifyState = false;
        }
      }
    } catch(e) {console.log(e) }
  }
  setTimeout(beautify, 500)
}

const toggleBeauty = () => {
  if (beautyState) {
    beautyState = false
  } else {
    beautyState = true
    beautify()
  }
}

window.addEventListener('load', function () {
  beautify()
})